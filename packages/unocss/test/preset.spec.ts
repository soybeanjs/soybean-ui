import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { createGenerator } from 'unocss';
import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetVean, presetUiUnocss } from '../src/index';
import type { UiUnocssOptions } from '../src/options';

/**
 * Extract the generated theme CSS out of the self preset's preflight.
 *
 * The self preset (`vean-uno`) carries the theme layer as a preflight
 * whose `getCSS()` returns the (unminified) CSS string produced by
 * `buildThemePreflight` (palette layer + light/dark token blocks). The preset
 * does not minify on purpose — the final bundle is minified at build time.
 */
function getThemeCss(presets: Preset<Theme>[]): string {
  const self = presets.find(p => p.name === 'vean-uno');
  const preflights = (self as unknown as { preflights?: { getCSS: () => string }[] })?.preflights;
  return preflights?.[0]?.getCSS() ?? '';
}

describe('presetUiUnocss', () => {
  it('composes the expected preset stack', () => {
    const presets = presetUiUnocss({ uiCSS: true });
    const names = presets.map(p => p.name);
    // wind3 + animations + self theme
    expect(presets.length).toBeGreaterThanOrEqual(3);
    expect(names).toContain('vean-uno');
  });

  it('applies size/radius base tokens to the generated theme CSS', () => {
    const css = getThemeCss(presetUiUnocss({ uiCSS: true, size: 'lg', radius: 'sm' }));
    expect(css).toContain('--vean-size: 18px');
    expect(css).toContain('--vean-radius: 0.5rem');
  });

  it('falls back to the engine defaults when no base tokens are given', () => {
    const css = getThemeCss(presetUiUnocss({ uiCSS: true }));
    expect(css).toContain('--vean-size: 16px');
    expect(css).toContain('--vean-radius: 0.625rem');
  });

  it('floors the field font size on coarse pointers so iOS does not zoom on focus', () => {
    const css = getThemeCss(presetUiUnocss({ globalCSS: true, uiCSS: true }));

    expect(css).toContain('@media(hover:none) and (pointer:coarse)');
    expect(css).toContain('font-size:max(16px,1em)');

    // Each selector needs its own `:not(…)` list: that specificity is what
    // outranks the preflight's `font-size: inherit`. A bare `textarea`/`select`
    // loses that tie on source order and silently keeps the iOS zoom.
    expect(css).toContain('input:not([type=button]');
    expect(css).toContain('textarea:not([disabled])');
    expect(css).toContain('select:not([disabled])');
  });

  it('keeps the field font floor out of the stylesheet without globalCSS', () => {
    expect(getThemeCss(presetUiUnocss({ uiCSS: true }))).not.toContain('max(16px,1em)');
  });
});

describe('presetScrollbar', () => {
  async function generateCss(tokens: string[], uiOptions?: UiUnocssOptions) {
    const uno = await createGenerator({ presets: presetUiUnocss(uiOptions) });
    const { css } = await uno.generate(tokens, { preflights: false });
    return css;
  }

  it('is included in the presetUiUnocss stack', () => {
    const names = presetUiUnocss().map(p => p.name);
    expect(names).toContain('vean-uno-scrollbar');
  });

  it('`scrollbar` shortcut declares css variables and styles webkit pseudo elements', async () => {
    const css = await generateCss(['scrollbar']);
    expect(css).toContain('--vean-scrollbar-track:#f5f5f5');
    expect(css).toContain('--vean-scrollbar-thumb:#ddd');
    expect(css).toContain('--vean-scrollbar-width:8px');
    expect(css).toContain('.scrollbar{');
    expect(css).toContain('overflow:auto;');
    expect(css).toContain('.scrollbar::-webkit-scrollbar{width:var(--vean-scrollbar-width);');
    expect(css).toContain('.scrollbar::-webkit-scrollbar-track{background-color:var(--vean-scrollbar-track);');
    expect(css).toContain('.scrollbar::-webkit-scrollbar-thumb{background-color:var(--vean-scrollbar-thumb);');
  });

  it('`scrollbar-none` hides the scrollbar', async () => {
    const css = await generateCss(['scrollbar-none']);
    expect(css).toContain('.scrollbar-none{scrollbar-width:none;');
    expect(css).toContain('.scrollbar-none::-webkit-scrollbar{display:none;');
  });

  it('`scrollbar-rounded` applies radius variables to track and thumb', async () => {
    const css = await generateCss(['scrollbar-rounded']);
    expect(css).toContain(
      '.scrollbar-rounded::-webkit-scrollbar-track{border-radius:var(--vean-scrollbar-track-radius);'
    );
    expect(css).toContain(
      '.scrollbar-rounded::-webkit-scrollbar-thumb{border-radius:var(--vean-scrollbar-thumb-radius);'
    );
  });

  it('resolves thumb/track colors from the theme with the variant pseudo elements', async () => {
    const css = await generateCss(['scrollbar-thumb-color-primary', 'scrollbar-track-op-50']);
    // 迁移期：共享名（primary 等）已指向 v2 通道变量，故此处读 `--vean-primary`（P3）
    expect(css).toContain('--vean-scrollbar-thumb:hsl(var(--vean-primary)');
    expect(css).toContain('--vean-scrollbar-track-opacity:0.5');
  });

  it('maps size aliases to scrollbar css variables', async () => {
    const css = await generateCss(['scrollbar-w-12px', 'scrollbar-radius-6px']);
    expect(css).toContain('--vean-scrollbar-width:12px');
    expect(css).toContain('--vean-scrollbar-track-radius:6px');
    expect(css).toContain('--vean-scrollbar-thumb-radius:6px');
  });

  it('supports arbitrary utilities on the webkit pseudo element variants', async () => {
    const css = await generateCss(['scrollbar-thumb:bg-red-500']);
    expect(css).toContain('.scrollbar-thumb\\:bg-red-500::-webkit-scrollbar-thumb');
  });

  it('injects scrollbar options via the `scrollbar` option', async () => {
    const compatibleCss = await generateCss(['scrollbar-color-[red]', 'scrollbar-width-thin'], {
      scrollbar: { compatible: true }
    });
    expect(compatibleCss).toContain('scrollbar-color:red');
    expect(compatibleCss).toContain('scrollbar-width:thin');

    const customCss = await generateCss(['scrollbar'], { scrollbar: { scrollbarWidth: '10px', varPrefix: '' } });
    expect(customCss).toContain('--scrollbar-width:10px');
  });
});

describe('presetUiUnocss preset injection', () => {
  async function generate(tokens: string[], options: UiUnocssOptions) {
    const uno = await createGenerator({ presets: presetUiUnocss(options) });
    const { css } = await uno.generate(tokens, { preflights: false });
    return css;
  }

  it('injects wind3 options; `wind3.dark` overrides `darkSelector`', async () => {
    const css = await generate(['dark:bg-black'], { darkSelector: 'class', wind3: { dark: 'media' } });
    expect(css).toContain('prefers-color-scheme');
  });

  it('injects animation options via the `animations` option', async () => {
    const css = await generate(['animate-in'], { animations: { duration: 500 } });
    expect(css).toContain('animation-duration:500ms');
  });

  it('injects full web fonts config via the `webFonts` option (wins over `fonts`)', async () => {
    const presets = presetUiUnocss({ fonts: { sans: 'Inter' }, webFonts: { fonts: { mono: 'Fira Code' } } });
    expect(presets.map(p => p.name)).toContain('@unocss/preset-web-fonts');

    const uno = await createGenerator({ presets });
    expect(uno.config.theme.fontFamily?.mono).toContain('Fira Code');
  });
});

describe('presetVean', () => {
  function withConfig(json: Record<string, unknown>): string {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vean-'));
    fs.writeFileSync(path.join(dir, 'vean.json'), JSON.stringify(json), 'utf-8');
    return dir;
  }

  it('reads the full uno block and applies every VeanUnoConfig item', () => {
    const dir = withConfig({
      uno: { base: 'zinc', primary: 'indigo', size: 'lg', radius: 'sm' }
    });

    const css = getThemeCss(presetVean({ cwd: dir }));
    expect(css).toContain('--vean-size: 18px');
    expect(css).toContain('--vean-radius: 0.5rem');

    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('falls back to the default theme when vean.json is missing', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vean-empty-'));
    const css = getThemeCss(presetVean({ cwd: dir }));
    expect(css).toContain('--vean-size: 16px');
    expect(css).toContain('--vean-radius: 0.625rem');
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('lets user overrides take precedence over vean.json values', () => {
    const dir = withConfig({ uno: { base: 'zinc', primary: 'indigo', size: 'sm', radius: 'md' } });

    const css = getThemeCss(presetVean({ cwd: dir, overrides: { size: 'xl' } }));
    expect(css).toContain('--vean-size: 20px');
    expect(css).toContain('--vean-radius: 0.625rem');

    fs.rmSync(dir, { recursive: true, force: true });
  });
});
