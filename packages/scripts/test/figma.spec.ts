import { mkdir, mkdtemp, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { JsonObject } from '../src/shared/json';
import { FIGMA_OUTPUT_DIR, generateFigmaAssets } from '../src/commands/figma';
import { FIGMA_API_DIR, collectComponentProps } from '../src/commands/figma-components';
import { buildFigmaTokenCss, buildFigmaTokenDocument, buildFigmaTokenDocuments } from '../src/commands/figma-tokens';
import type { FigmaColorValue, FigmaDimensionValue, FigmaToken, FigmaTokenGroup } from '../src/commands/figma-tokens';

async function createTemporaryDirectory(prefix: string): Promise<string> {
  return mkdtemp(path.join(tmpdir(), prefix));
}

const isToken = (node: FigmaToken | FigmaTokenGroup): node is FigmaToken => '$type' in node && '$value' in node;

function group(node: FigmaTokenGroup, key: string): FigmaTokenGroup {
  const child = node[key];

  if (!child || isToken(child)) {
    throw new Error(`expected "${key}" to be a token group`);
  }

  return child;
}

function token(node: FigmaTokenGroup, key: string): FigmaToken {
  const child = node[key];

  if (!child || !isToken(child)) {
    throw new Error(`expected "${key}" to be a token`);
  }

  return child;
}

function colorValue(node: FigmaToken): FigmaColorValue {
  const value = node.$value;

  if (node.$type !== 'color' || typeof value !== 'object' || !('colorSpace' in value)) {
    throw new Error('expected a color token');
  }

  return value;
}

function dimensionValue(node: FigmaToken): FigmaDimensionValue {
  const value = node.$value;

  if (node.$type !== 'dimension' || typeof value !== 'object' || !('unit' in value)) {
    throw new Error('expected a dimension token');
  }

  return value;
}

const dimension = (node: FigmaTokenGroup, key: string): number => dimensionValue(token(node, key)).value;

describe('buildFigmaTokenDocument', () => {
  it('emits a spec-conformant sRGB color: 6-digit hex, alpha carried separately', () => {
    const border = colorValue(token(group(buildFigmaTokenDocument('dark'), 'color'), 'border'));

    expect(border.colorSpace).toBe('srgb');
    expect(border.components).toHaveLength(3);
    // the dark border is `hsl(0 0% 100% / 0.1)`; the fallback hex must stay
    // opaque because the format module forbids alpha inside `hex`
    expect(border.hex).toBe('#ffffff');
    expect(border.alpha).toBeCloseTo(0.1, 6);
  });

  it('flattens the radius ladder into px instead of leaving calc() expressions', () => {
    const radius = group(buildFigmaTokenDocument('light'), 'radius');

    // 0.5rem seed at the 16px root size
    expect(dimension(radius, 'md')).toBe(8);
    expect(dimension(radius, '2xs')).toBe(2);
    expect(dimension(radius, '4xl')).toBe(18);
    expect(dimension(radius, 'none')).toBe(0);
    expect(dimension(radius, 'full')).toBe(9999);
  });

  it('flattens the spacing rungs against the spacing unit', () => {
    const spacing = group(buildFigmaTokenDocument('light'), 'spacing');

    expect(dimension(spacing, 'unit')).toBe(4);
    expect(dimension(spacing, 'md')).toBe(16);
    expect(dimension(spacing, '9xl')).toBe(128);
  });

  it('holds both modes to the same token names, since Figma builds one mode per file', () => {
    const { light, dark } = buildFigmaTokenDocuments();
    const namesOf = (document: FigmaTokenGroup, prefix: string): string[] =>
      Object.entries(document).flatMap(([key, node]) =>
        isToken(node) ? [`${prefix}${key}:${node.$type}`] : namesOf(node, `${prefix}${key}/`)
      );

    expect(namesOf(light, '')).toEqual(namesOf(dark, ''));
    // the palette and the literal layer are mode-invariant, the semantic layer is not
    expect(light.palette).toEqual(dark.palette);
    expect(token(group(light, 'color'), 'background')).not.toEqual(token(group(dark, 'color'), 'background'));
  });
});

describe('buildFigmaTokenCss', () => {
  it('resolves values and only restates the tokens dark actually changes', () => {
    const css = buildFigmaTokenCss();
    const dark = css.slice(css.indexOf('.dark {'));

    expect(css).toContain(':root {');
    // the banner must be closed, or every declaration after it is commented out
    const bannerEnd = css.indexOf('*/');
    expect(bannerEnd).toBeGreaterThan(-1);
    expect(bannerEnd).toBeLessThan(css.indexOf(':root {'));
    expect(css).toContain('--radius: 0.5rem;');
    // resolved, not aliased to the palette layer the stylesheet ships
    expect(css).not.toContain('var(--zinc-50)');
    expect(dark).toContain('--background:');
    expect(dark).not.toContain('--radius:');
  });
});

const BUTTON_FIXTURE: JsonObject = {
  component: 'button',
  symbols: {
    Button: {
      props: {
        members: [
          { name: 'color', type: 'ThemeColor', referencedTypes: [{ resolvedType: "'primary' | 'secondary'" }] },
          { name: 'size', type: 'ThemeSize', referencedTypes: [{ resolvedType: "'sm' | 'md'" }] },
          { name: 'disabled', type: 'boolean' },
          { name: 'as', type: 'AsTag | Component', referencedTypes: [{ resolvedType: null }] }
        ]
      }
    },
    ButtonIcon: {
      props: {
        members: [
          {
            name: 'color',
            type: 'ThemeColor',
            referencedTypes: [{ resolvedType: "'primary' | 'secondary' | 'accent'" }]
          },
          // a union that is not closed by literals is not a value set
          { name: 'icon', type: 'string | Component' }
        ]
      }
    },
    ButtonLoading: {}
  }
};

describe('collectComponentProps', () => {
  it('unions the closed value sets across a family and drops single-valued props', () => {
    expect(collectComponentProps([{ name: 'button', value: BUTTON_FIXTURE }])).toEqual({
      button: { color: ['primary', 'secondary', 'accent'], size: ['sm', 'md'] }
    });
  });

  it('ignores documents without a symbol table', () => {
    expect(collectComponentProps([{ name: 'empty', value: {} }])).toEqual({});
  });
});

describe('generateFigmaAssets', () => {
  it('writes the export once and leaves the files untouched on a second pass', async () => {
    const rootDir = await createTemporaryDirectory('sui-figma-write-');

    try {
      const apiDir = path.join(rootDir, FIGMA_API_DIR);

      await mkdir(apiDir, { recursive: true });
      await writeFile(path.join(apiDir, 'button.json'), JSON.stringify(BUTTON_FIXTURE), 'utf8');

      const written = await generateFigmaAssets(rootDir);
      const lightPath = path.join(rootDir, FIGMA_OUTPUT_DIR, 'light.json');

      expect(written.map(filePath => path.basename(filePath)).sort()).toEqual([
        'components.json',
        'dark.json',
        'light.json',
        'tokens.css'
      ]);

      const before = await stat(lightPath);

      // Filesystem mtime granularity can be coarse; a later timestamp must not
      // be what makes the assertion pass.
      await new Promise(resolve => setTimeout(resolve, 20));

      expect(await generateFigmaAssets(rootDir)).toEqual([]);
      expect((await stat(lightPath)).mtimeMs).toBe(before.mtimeMs);
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });

  it('names the missing target when the API data has not been generated', async () => {
    const rootDir = await createTemporaryDirectory('sui-figma-missing-');

    try {
      await expect(generateFigmaAssets(rootDir)).rejects.toThrow('sui gen api');
    } finally {
      await rm(rootDir, { recursive: true, force: true });
    }
  });
});
