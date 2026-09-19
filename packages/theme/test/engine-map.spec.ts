import { describe, expect, it } from 'vitest';
import { hslChannelToRgb, relativeLuminance } from '../src/contrast';
import { emitThemeCss, generatePaletteCss } from '../src/emit';
import { channelHsl } from '../src/guard';
import { PALETTE_KEYS, PALETTE_LEVELS, paletteChannel, paletteColor, simpleColor } from '../src/palette';
import { resolveTokenColor, resolveThemeColors } from '../src/resolve';
import { ALPHA_TOKENS, SEMANTIC_TOKENS } from '../src/semantic';
import { resolveThemeMap } from '../src/theme-map';
import type { ThemeMode, TokenValue } from '../src/types';

/**
 * P0/P1 —— map resolution, emission, the level knob and JS resolution
 * (docs/theme.md §3, §4, §5, §6).
 */

/** the relative luminance of a token value, measured from its hsl channel. */
const luminanceOf = (value: TokenValue): number => {
  const rgb = hslChannelToRgb(channelHsl(value) as string);

  return rgb ? relativeLuminance(rgb) : 0;
};

const DEFAULTS = { base: 'zinc', primary: 'indigo' } as const;

describe('theme map — structure and invariants', () => {
  it('resolves every semantic token in both modes', () => {
    const map = resolveThemeMap(DEFAULTS);

    expect(SEMANTIC_TOKENS.length).toBe(57);
    SEMANTIC_TOKENS.forEach(token => {
      expect(map.light[token], `light:${token}`).toBeDefined();
      expect(map.dark[token], `dark:${token}`).toBeDefined();
    });
  });

  it('resolves the region tokens as mirrors of the global roles', () => {
    const map = resolveThemeMap(DEFAULTS);

    expect(map.light['sidebar-surface']).toEqual(map.light.background);
    expect(map.dark['sidebar-surface']).toEqual(map.dark.surface);
    expect(map.light['sidebar-foreground']).toEqual(map.light.foreground);
    expect(map.light['sidebar-accent']).toEqual(map.light.accent);
    expect(map.light['sidebar-accent-foreground']).toEqual(map.light['accent-foreground']);
    expect(map.light['sidebar-primary']).toEqual(map.light.primary);
    expect(map.light['sidebar-border']).toEqual(map.light.border);
  });

  it('keeps the elevation ladder ordered at every level knob position', () => {
    const failures: string[] = [];

    ([0, 1, 2] as const).forEach(lightLevel => {
      ([0, 1, 2, 3] as const).forEach(darkLevel => {
        const map = resolveThemeMap({ ...DEFAULTS, lightLevel, darkLevel });

        (['light', 'dark'] as ThemeMode[]).forEach(mode => {
          const background = luminanceOf(map[mode].background);
          const surface = luminanceOf(map[mode].surface);
          const elevated = luminanceOf(map[mode].elevated);

          if (!(background < surface && surface <= elevated)) {
            failures.push(`${mode} light=${lightLevel} dark=${darkLevel}: ${background} / ${surface} / ${elevated}`);
          }

          // 审计 P0-4 的回归护栏：档位不得把页面与容器抹平
          if (mode === 'light' && background === surface) {
            failures.push(`light=${lightLevel}: background === surface`);
          }

          // 弱化面必须与所在表面可辨（fill 与 line 同档是允许的：二者都是"离页面一档"，
          // 旧实现的缺陷是三面同值，而不是 fill 与 line 同值）
          if (mode === 'light' && channelHsl(map[mode].muted) === channelHsl(map[mode].background)) {
            failures.push(`light=${lightLevel}: muted === background`);
          }
        });
      });
    });

    expect(failures).toEqual([]);
  });

  it('drops the page tint when surfaceStyle is flat (pre-refactor look)', () => {
    const map = resolveThemeMap({ ...DEFAULTS, surfaceStyle: 'flat' });

    expect(map.light.background).toEqual({ kind: 'simple', name: 'white' });
    expect(map.light.surface).toEqual({ kind: 'simple', name: 'white' });
    expect(map.light.elevated).toEqual({ kind: 'simple', name: 'white' });
    expect(map.dark.background).toEqual({ kind: 'palette', palette: 'zinc', level: 950 });
    expect(map.dark.surface).toEqual({ kind: 'palette', palette: 'zinc', level: 900 });
    expect(map.dark.elevated).toEqual({ kind: 'palette', palette: 'zinc', level: 900 });
  });

  it('moves the page one palette step per level knob position', () => {
    const levels = ([0, 1, 2] as const).map(
      lightLevel => resolveThemeMap({ ...DEFAULTS, lightLevel }).light.background
    );

    expect(levels).toEqual([
      { kind: 'palette', palette: 'zinc', level: 100 },
      { kind: 'palette', palette: 'zinc', level: 200 },
      { kind: 'palette', palette: 'zinc', level: 300 }
    ]);
  });

  it('snapshots the default theme map', () => {
    expect(resolveThemeMap(DEFAULTS)).toMatchSnapshot();
  });
});

describe('palette layer (Layer 1)', () => {
  it('emits every built-in palette level plus white and black', () => {
    const css = generatePaletteCss({ format: 'hsl' });
    const declarations = css.match(/^\s*--[\w-]+:/gm) ?? [];

    expect(PALETTE_KEYS.length).toBe(26);
    expect(PALETTE_LEVELS.length).toBe(11);
    expect(declarations.length).toBe(26 * 11 + 2);
    expect(css).toContain('--white: 0 0% 100%;');
    expect(css).toContain('--black: 0 0% 0%;');
  });

  it('stores naked channels that are parseable as hsl', () => {
    const failures = PALETTE_KEYS.flatMap(palette =>
      PALETTE_LEVELS.map(level => {
        const channel = paletteChannel(palette, level, 'hsl');

        return channel && hslChannelToRgb(channel) ? '' : `${palette}.${level}`;
      })
    ).filter(Boolean);

    expect(failures).toEqual([]);
  });

  it('keeps the static palette layer inside its size budget (§10: ≤ 10 KB raw)', () => {
    expect(generatePaletteCss({ format: 'hsl' }).length).toBeLessThan(10_000);
  });
});

describe('semantic layer (Layer 2) emission', () => {
  const map = resolveThemeMap(DEFAULTS);
  const css = emitThemeCss(map, { prefix: 'vean' });

  it('declares every token exactly once in the light block', () => {
    const light = css.slice(css.indexOf(':root'), css.indexOf('.dark'));
    const duplicated = SEMANTIC_TOKENS.filter(
      token => (light.match(new RegExp(`--vean-${token}:`, 'g')) ?? []).length !== 1
    );

    expect(duplicated).toEqual([]);
  });

  it('emits aliases, never literals, for colors', () => {
    expect(css).toContain('--vean-background: var(--zinc-100);');
    expect(css).toContain('--vean-primary: var(--indigo-500);');
    expect(css).toContain('--vean-scrim: var(--black);');
    expect(css).not.toMatch(/--vean-(background|primary): (oklch|hsl)\(/);
  });

  it('emits the dark block as a diff only', () => {
    const dark = css.slice(css.indexOf('.dark'));
    const declarations = dark.match(/^\s*--[\w-]+:/gm) ?? [];

    expect(declarations.length).toBeGreaterThan(10);
    expect(declarations.length).toBeLessThan(SEMANTIC_TOKENS.length);
    expect(dark).toContain('--vean-background: var(--zinc-950);');
  });

  it('emits the alpha companion and the literal layer', () => {
    expect(css).toContain('--vean-border-alpha: 1;');
    expect(css).toContain('--vean-radius: 0.625rem;');
    expect(css).toContain('--vean-radius-md: calc(var(--vean-radius) - 2px);');
    expect(css).toContain('--vean-z-base: 50;');
    expect(css).toContain('--vean-control-height: 2.25rem;');
    expect(css).toContain('--vean-text-sm: 0.875rem;');
    expect(css).toContain('--vean-leading-sm: 1.25rem;');
    ALPHA_TOKENS.forEach(token => expect(css).toContain(`--vean-${token}-alpha`));
  });

  it('honors the prefix option', () => {
    const bare = emitThemeCss(resolveThemeMap(DEFAULTS), { prefix: false });

    expect(bare).toContain('--background: var(--zinc-100);');
    expect(bare).not.toContain('--vean-background');
  });

  it('keeps the semantic layer inside its size budget (§10: ≤ 9.5 KB raw)', () => {
    expect(css.length).toBeLessThan(9500);
  });
});

describe('JS resolution (§3.1 — no complete-color variables needed)', () => {
  it('resolves the same color as the CSS reference it points at', () => {
    const map = resolveThemeMap(DEFAULTS);
    const css = emitThemeCss(map, { prefix: 'vean' });
    const failures: string[] = [];
    const lightBlock = css.slice(css.indexOf(':root'), css.indexOf('.dark'));
    const darkBlock = css.slice(css.indexOf('.dark'));

    (['light', 'dark'] as ThemeMode[]).forEach(mode => {
      const block = mode === 'light' ? lightBlock : darkBlock;

      SEMANTIC_TOKENS.forEach(token => {
        // 暗色块是差异块：缺声明即沿用亮色值
        const declaration =
          block.match(new RegExp(`--vean-${token}: var\\(--([\\w-]+)\\);`))?.[1] ??
          (mode === 'dark' ? lightBlock.match(new RegExp(`--vean-${token}: var\\(--([\\w-]+)\\);`))?.[1] : undefined);

        if (!declaration) {
          return;
        }

        // CSS 侧：变量指向调色板级别（`zinc-100`）或简单色（`white` / `black`）
        const fromCss =
          declaration === 'white' || declaration === 'black'
            ? simpleColor(declaration, 'hsl')
            : (() => {
                const segments = declaration.split('-');
                const level = Number(segments.pop());

                return paletteColor(segments.join('-') as never, level as never, 'hsl');
              })();
        const fromJs = resolveTokenColor(DEFAULTS, token, mode, 'hsl');

        if (fromCss !== fromJs) {
          failures.push(`${mode} ${token}: css=${fromCss} js=${fromJs}`);
        }
      });
    });

    expect(failures).toEqual([]);
  });

  it('returns complete colors in both formats', () => {
    expect(resolveTokenColor(DEFAULTS, 'background', 'light', 'hsl')).toMatch(/^hsl\(/);
    expect(resolveTokenColor(DEFAULTS, 'background', 'light', 'oklch')).toMatch(/^oklch\(/);
    expect(resolveTokenColor(DEFAULTS, 'scrim', 'light')).toBe('hsl(0 0% 0%)');
  });

  it('resolves every token of a mode as a complete color', () => {
    const colors = resolveThemeColors(DEFAULTS, 'dark');

    expect(Object.keys(colors).length).toBe(SEMANTIC_TOKENS.length);
    expect(Object.values(colors).every(value => /^(hsl|oklch)\(/.test(value))).toBe(true);
  });
});

describe('color-scheme (§4.4 of the audit: UA-drawn surfaces follow the theme)', () => {
  const map = resolveThemeMap(DEFAULTS);

  it('advertises the scheme per mode in class mode', () => {
    const css = emitThemeCss(map, { prefix: 'vean', darkSelector: 'class' });
    const light = css.slice(css.indexOf(':root'), css.indexOf('.dark'));
    const dark = css.slice(css.indexOf('.dark'));

    expect(light).toContain('color-scheme: light;');
    expect(dark).toContain('color-scheme: dark;');
  });

  it('lets the UA pick in media mode', () => {
    const css = emitThemeCss(map, { prefix: 'vean', darkSelector: 'media' });
    const dark = css.slice(css.indexOf('@media'));

    expect(css).toContain('color-scheme: light dark;');
    // 注意：`@media (prefers-color-scheme: dark)` 本身包含子串，必须按声明匹配
    expect(dark).not.toMatch(/^\s*color-scheme:/m);
  });

  it('follows a custom selector and a custom style target', () => {
    const css = emitThemeCss(map, {
      prefix: 'vean',
      darkSelector: '[data-theme="dark"]',
      styleTarget: 'html'
    });

    expect(css.startsWith('html {')).toBe(true);
    expect(css).toContain('[data-theme="dark"] {');
    expect(css).toContain('color-scheme: dark;');
  });
});
