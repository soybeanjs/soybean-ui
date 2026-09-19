import { describe, expect, it } from 'vitest';
import { tailwindChromaticPaletteKeys } from '@soybeanjs/colord/palette';
import { resolveRadiusValue, resolveSizeValue, isPaletteLevelRef, levelOf, getDarkSelector } from '../src/shared';
import { DEFAULT_OPTIONS, THEME_RADIUS, THEME_SIZE } from '../src/defaults';
import { generatePaletteCss, emitThemeCss, resolveThemeMap, resolveTokenColor } from '../src/index';
import { NEUTRAL_PALETTES, PALETTE_KEYS, isNeutralFamily } from '../src/palette';
import { CHART_SCHEMES, FEEDBACK_SCHEMES, chartScheme, feedbackScheme, splitLevelRef } from '../src/schemes';
import type { PaletteKey, SemanticToken, TokenValue } from '../src/types';

/**
 * v2-only engine features: overrides, schemes, prefix, solidVars, borderOpacity
 * and the base-token tables (docs/theme.md §4.6–§4.9, §9.1).
 */

describe('schemes drive the status and chart tokens', () => {
  it('reads the status palette from the feedback scheme', () => {
    const classic = resolveThemeMap({ base: 'zinc', primary: 'indigo', feedback: 'classic' });
    const vivid = resolveThemeMap({ base: 'zinc', primary: 'indigo', feedback: 'vivid' });

    expect(classic.light.success).toEqual({ kind: 'palette', palette: 'green', level: 500 });
    expect(vivid.light.success).toEqual({ kind: 'palette', palette: 'emerald', level: 500 });
    // 暗色的 solid 级别来自 scheme 自身（classic 暗色取 400）
    expect(classic.dark.success).toEqual({ kind: 'palette', palette: 'green', level: 400 });
  });

  it('reads the chart colors from the chart scheme', () => {
    const vivid = resolveThemeMap({ base: 'zinc', primary: 'indigo', chart: 'vivid' });
    const cool = resolveThemeMap({ base: 'zinc', primary: 'indigo', chart: 'cool' });

    expect(vivid.light['chart-1']).toEqual({ kind: 'palette', palette: 'orange', level: 600 });
    expect(cool.light['chart-1']).toEqual({ kind: 'palette', palette: 'blue', level: 700 });
    expect(cool.dark['chart-1']).toEqual({ kind: 'palette', palette: 'sky', level: 300 });
  });

  it('falls back to the default scheme for unknown keys', () => {
    expect(feedbackScheme('nope')).toBe(FEEDBACK_SCHEMES.classic);
    expect(chartScheme('nope')).toBe(CHART_SCHEMES.vivid);
    expect(feedbackScheme(undefined).light.warning).toBe('amber.500');
  });

  it('exposes the scheme keys and level-ref helpers', () => {
    expect(Object.keys(FEEDBACK_SCHEMES)).toEqual(['classic', 'vivid', 'subtle', 'modern', 'professional']);
    expect(Object.keys(CHART_SCHEMES)).toHaveLength(5);
    expect(isPaletteLevelRef('zinc.200')).toBe(true);
    expect(isPaletteLevelRef('oklch(0.6 0.2 250)')).toBe(false);
    expect(levelOf('zinc.200')).toBe(200);
    expect(splitLevelRef('indigo.600')).toEqual({ palette: 'indigo', level: 600 });
  });
});

describe('overrides win, but never silently break contrast', () => {
  it('applies a palette-level override to both the map and the CSS', () => {
    const map = resolveThemeMap({ base: 'zinc', primary: 'indigo', overrides: { light: { primary: 'zinc.800' } } });
    const css = emitThemeCss(map, { prefix: 'vean' });

    expect(map.light.primary).toEqual({ kind: 'palette', palette: 'zinc', level: 800 });
    expect(css).toContain('--vean-primary: var(--zinc-800);');
  });

  it('accepts a complete color as an override', () => {
    const map = resolveThemeMap({
      base: 'zinc',
      primary: 'indigo',
      overrides: { light: { primary: 'oklch(0.6 0.2 250)' } }
    });
    const css = emitThemeCss(map, { prefix: 'vean' });

    expect(map.light.primary).toEqual({ kind: 'color', value: 'oklch(0.6 0.2 250)' });
    expect(css).toContain('--vean-primary: oklch(0.6 0.2 250);');
    // JS 解析会把完整色转成请求的格式（与 CSS 用同一套色彩管线）
    expect(
      resolveTokenColor(
        { base: 'zinc', primary: 'indigo', overrides: { light: { primary: 'oklch(0.6 0.2 250)' } } },
        'primary',
        'light',
        'hsl'
      )
    ).toMatch(/^hsl\(/);
  });

  it('reports an override that breaks a pair instead of correcting it', () => {
    const { report } = resolveThemeMap({
      base: 'zinc',
      primary: 'indigo',
      overrides: { light: { foreground: 'zinc.500' } }
    });
    const overridden = report.corrections.filter(correction => correction.overridden);

    expect(overridden.length).toBeGreaterThan(0);
    expect(overridden.every(correction => correction.passed === false && correction.steps === 0)).toBe(true);
    expect(overridden.some(correction => correction.pair.startsWith('foreground-on-'))).toBe(true);
  });

  it('leaves the theme untouched when no override is given', () => {
    const { report } = resolveThemeMap({ base: 'zinc', primary: 'indigo' });

    expect(report.corrections.every(correction => correction.overridden === undefined)).toBe(true);
  });
});

describe('emission options', () => {
  const map = resolveThemeMap({ base: 'zinc', primary: 'indigo' });

  it('emits complete-color twins only when solidVars asks for them', () => {
    const none = emitThemeCss(map, { prefix: 'vean', solidVars: 'none' });
    const chart = emitThemeCss(map, { prefix: 'vean', solidVars: 'chart', format: 'hsl' });
    const all = emitThemeCss(map, { prefix: 'vean', solidVars: 'all', format: 'hsl' });

    expect(none).not.toContain('-solid:');
    expect(chart).toContain('--vean-chart-1-solid: hsl(');
    expect(chart).not.toContain('--vean-primary-solid');
    expect(all).toContain('--vean-primary-solid: hsl(');
  });

  it('honors a custom prefix', () => {
    expect(emitThemeCss(map, { prefix: 'sui' })).toContain('--sui-background: var(--zinc-100);');
  });

  it('supports the media dark selector', () => {
    expect(emitThemeCss(map, { prefix: 'vean', darkSelector: 'media' })).toContain(
      '@media (prefers-color-scheme: dark)'
    );
    expect(getDarkSelector('media')).toBe('@media (prefers-color-scheme: dark)');
    expect(getDarkSelector('[data-theme="dark"]')).toBe('[data-theme="dark"]');
  });

  it('scales the border alpha with borderOpacity', () => {
    const full = resolveThemeMap({ base: 'zinc', primary: 'indigo' });
    const half = resolveThemeMap({ base: 'zinc', primary: 'indigo', borderOpacity: 0.5 });

    expect(full.alpha.border).toEqual({ light: 1, dark: 0.1 });
    expect(half.alpha.border).toEqual({ light: 0.5, dark: 0.05 });
    expect(emitThemeCss(half, { prefix: 'vean' })).toContain('--vean-border-alpha: 0.5;');
  });
});

describe('palette data source', () => {
  it('partitions the built-in palettes into the neutral and chromatic families', () => {
    // 家族清单来自 colord（tailwindNeutralPaletteKeys / tailwindChromaticPaletteKeys）：
    // 二者必须恰好划分 PALETTE_KEYS，否则 isNeutralFamily 的判定就会与色板表脱节
    expect([...NEUTRAL_PALETTES, ...tailwindChromaticPaletteKeys]).toEqual([...PALETTE_KEYS]);
    expect(new Set(PALETTE_KEYS).size).toBe(PALETTE_KEYS.length);

    const neutral = new Set<string>(NEUTRAL_PALETTES);

    tailwindChromaticPaletteKeys.forEach(key => expect(neutral.has(key)).toBe(false));
    PALETTE_KEYS.forEach(key => expect(isNeutralFamily(key)).toBe(neutral.has(key)));
  });
});

describe('palette layer formats and base tokens', () => {
  it('emits oklch channels that are wrapper-free', () => {
    const css = generatePaletteCss({ format: 'oklch' });

    expect(css).toContain('--white: 100% 0 0;');
    expect(css).not.toContain('oklch(');
    expect(css).toContain('--zinc-100:');
  });

  it('resolves the size and radius presets', () => {
    expect(resolveSizeValue('md')).toBe('16px');
    expect(resolveSizeValue('20px')).toBe('20px');
    expect(resolveSizeValue(undefined)).toBe('16px');
    expect(resolveRadiusValue('md')).toBe('0.625rem');
    expect(resolveRadiusValue('1rem')).toBe('1rem');
    expect(THEME_SIZE.md).toBe(16);
    expect(THEME_RADIUS.md).toBe('0.625rem');
  });

  it('keeps the documented defaults together', () => {
    expect(DEFAULT_OPTIONS).toMatchObject({
      base: 'zinc',
      primary: 'indigo',
      feedback: 'classic',
      chart: 'vivid',
      surfaceStyle: 'layered',
      contrast: 'aa',
      prefix: 'vean',
      solidVars: 'none'
    });
  });

  it('carries the literal layer into the emitted CSS with the given prefix', () => {
    const css = emitThemeCss(resolveThemeMap({ base: 'zinc', primary: 'indigo', radius: 'lg' }), { prefix: 'vean' });

    expect(css).toContain('--vean-radius: 0.75rem;');
    expect(css).toContain('--vean-radius-2xl: calc(var(--vean-radius) + 8px);');
  });

  it('exposes the resolved literal layer on the map', () => {
    const map = resolveThemeMap({ base: 'zinc', primary: 'indigo', size: 'lg' });
    const smoke: SemanticToken[] = ['background', 'primary', 'sidebar-surface'];
    const values: TokenValue[] = smoke.map(token => map.light[token] as TokenValue);

    expect(map.literal.size).toBe('18px');
    expect(values.every(value => value !== undefined)).toBe(true);
    expect(DEFAULT_OPTIONS.base satisfies PaletteKey).toBe('zinc');
  });
});
