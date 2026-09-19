import { describe, expect, it } from 'vitest';
import { createGenerator } from 'unocss';
import { presetUiUnocss } from '../src/preset';
import { buildThemeColors, buildThemeEntries } from '../src/theme';

/**
 * The token adapter (docs/theme.md §8).
 *
 * The assertions that matter:
 * - semantic + palette colors are `hsl(var(--…-x) / <alpha-value>)` so the
 *   opacity modifier survives (a bare `var()` drops it silently — measured);
 * - the preflight carries the static palette layer and the default alias block,
 *   so the tokens resolve with no runtime JS;
 * - the dimension / motion / layering keys read the token literals.
 */

const generate = async (options: Parameters<typeof presetUiUnocss>[0], classes: string): Promise<string> => {
  const uno = await createGenerator({ presets: presetUiUnocss(options) } as never);
  const { css } = await uno.generate(classes, { preflights: false });

  return css;
};

const preflightOf = (options: Parameters<typeof presetUiUnocss>[0]): string => {
  const preset = presetUiUnocss(options).find(item => item.name === 'vean-uno') as {
    preflights: { getCSS: () => string }[];
  };

  return preset.preflights.map(preflight => preflight.getCSS()).join('\n');
};

describe('theme adapter — colors', () => {
  it('maps semantic tokens to alpha-capable channel references', async () => {
    const css = await generate({}, 'bg-background text-muted-foreground border-border bg-primary/50');

    expect(css).toContain('hsl(var(--vean-background) / var(--un-bg-opacity))');
    expect(css).toContain('hsl(var(--vean-muted-foreground) / var(--un-text-opacity))');
    expect(css).toContain('hsl(var(--vean-primary) / 0.5)');
  });

  it('maps the role ramps to theme-following utilities', async () => {
    const css = await generate({}, 'bg-primary-500/30 text-destructive-600 border-success-100');

    expect(css).toContain('hsl(var(--vean-primary-500) / 0.3)');
    expect(css).toContain('hsl(var(--vean-destructive-600) / var(--un-text-opacity))');
    expect(css).toContain('var(--vean-success-100)');
  });

  it('maps every token family', async () => {
    const css = await generate(
      {},
      'bg-surface bg-elevated bg-secondary text-foreground-subtle bg-destructive-subtle border-destructive-border bg-sidebar-surface text-sidebar-foreground bg-carbon text-foreground'
    );

    expect(css).toContain('var(--vean-surface)');
    expect(css).toContain('var(--vean-elevated)');
    expect(css).toContain('var(--vean-secondary)');
    expect(css).toContain('var(--vean-foreground-subtle)');
    expect(css).toContain('var(--vean-destructive-subtle)');
    expect(css).toContain('var(--vean-destructive-border)');
    expect(css).toContain('var(--vean-sidebar-surface)');
    expect(css).toContain('var(--vean-sidebar-foreground)');
    expect(css).toContain('var(--vean-carbon)');
  });

  it('routes the 26 built-in palettes through the injected palette layer', async () => {
    const css = await generate({}, 'bg-indigo-500/30 text-zinc-950 bg-orange-600 border-sky-400');

    expect(css).toContain('hsl(var(--indigo-500) / 0.3)');
    expect(css).toContain('hsl(var(--zinc-950) / var(--un-text-opacity))');
    expect(css).toContain('var(--orange-600)');
    expect(css).toContain('var(--sky-400)');
  });
});

describe('theme adapter — preflight', () => {
  it('ships the static palette layer plus the default alias block', () => {
    const css = preflightOf({ uiCSS: true });

    // Layer 1（静态调色板层）
    expect(css).toContain('--slate-50:');
    expect(css).toContain('--indigo-600:');
    expect(css).toContain('--white: 0 0% 100%;');
    expect(css).toContain('--black: 0 0% 0%;');
    // Layer 2（默认主题别名块）
    expect(css).toContain('--vean-background: var(--zinc-100);');
    expect(css).toContain('--vean-primary: var(--indigo-500);');
    // 角色 ramp（50–950）：指向角色背后的调色板，主题切换随别名块整体重发
    expect(css).toContain('--vean-primary-500: var(--indigo-500);');
    expect(css).toContain('--vean-destructive-100: var(--red-100);');
    expect(css).toContain('--vean-warning-950: var(--amber-950);');
    expect(css).toContain('--vean-border-alpha: 1;');
    expect(css).toContain('--vean-radius: 0.625rem;');
    // 静态默认层降权到零特异性：运行时/首帧快照用普通选择器即可胜出，
    // 不依赖源码顺序（head 内联脚本无法排在样式表之后），也不用 `!important`
    expect(css).toContain(':where(:root) {');
    expect(css).toContain(':where(.dark) {');
    expect(css).not.toContain('!important');
  });

  it('follows the preset options (base / primary / level / size / radius)', () => {
    const css = preflightOf({
      uiCSS: true,
      base: 'slate',
      primary: 'emerald',
      lightLevel: 1,
      size: 'lg',
      radius: 'lg'
    });

    expect(css).toContain('--vean-background: var(--slate-200);');
    expect(css).toContain('--vean-primary: var(--emerald-500);');
    expect(css).toContain('--vean-primary-500: var(--emerald-500);');
    expect(css).toContain('--vean-size: 18px;');
    expect(css).toContain('--vean-radius: 0.75rem;');
  });

  it('is omitted unless uiCSS is requested', () => {
    expect(preflightOf({})).not.toContain('--vean-background');
    expect(preflightOf({})).not.toContain('--indigo-600');
  });
});

describe('theme adapter — helpers', () => {
  it('exposes the semantic and palette color maps', () => {
    const colors = buildThemeColors('hsl');

    expect(colors.background).toBe('hsl(var(--vean-background) / <alpha-value>)');
    expect((colors.indigo as Record<string, string>)['600']).toBe('hsl(var(--indigo-600) / <alpha-value>)');
  });

  it('respects a custom token prefix', () => {
    const colors = buildThemeColors('hsl', 'acme');

    expect(colors.background).toBe('hsl(var(--acme-background) / <alpha-value>)');

    const entries = buildThemeEntries('acme');

    expect(entries.borderRadius.md).toBe('var(--acme-radius-md)');
  });
});

describe('theme adapter — global base styles', () => {
  it('reads the theme variables so the page and the utilities share one source', () => {
    const css = preflightOf({ globalCSS: true, uiCSS: true });

    expect(css).toContain('body{color:hsl(var(--vean-foreground));background-color:hsl(var(--vean-background))}');
    expect(css).toContain('border-color:hsl(var(--vean-border) / var(--vean-border-alpha, 1))');
    expect(css).toContain('html{font-size:var(--vean-size)}');
  });
});

describe('theme adapter — dimension / motion / layering keys', () => {
  it('maps the neutral subset onto token literals', async () => {
    const css = await generate({}, 'rounded-md text-sm font-sans z-base duration-fast ease-out border ring');

    expect(css).toContain('border-radius:var(--vean-radius-md)');
    expect(css).toContain('font-size:var(--vean-text-sm);line-height:var(--vean-leading-sm)');
    expect(css).toContain('font-family:var(--vean-font-sans)');
    expect(css).toContain('z-index:var(--vean-z-base)');
    expect(css).toContain('transition-duration:var(--vean-duration-fast)');
    expect(css).toContain('transition-timing-function:var(--vean-ease-out)');
    expect(css).toContain('border-width:var(--vean-border-width)');
    expect(css).toContain('--un-ring-width:var(--vean-ring-width)');
  });

  it('leaves the shadow family alone until the migration step', async () => {
    const css = await generate({}, 'shadow-sm');

    expect(css).not.toContain('--vean-shadow-sm');
    expect(css).toContain('--un-shadow');
  });

  it('keeps numeric spacing UnoCSS-native', async () => {
    const css = await generate({}, 'p-4');

    expect(css).toContain('padding:1rem');
  });
});
