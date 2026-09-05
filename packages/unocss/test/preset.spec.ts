import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { createGenerator } from 'unocss';
import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetSbean, presetUiUnocss } from '../src/index';
import type { UiUnocssOptions } from '../src/options';

/**
 * Extract the generated theme CSS out of the self preset's preflight.
 *
 * The self preset (`soybean-ui-uno`) carries the theme layer as a preflight
 * whose `getCSS()` returns the minified CSS string produced by `createTheme`
 * (base tokens + light/dark color tokens).
 */
function getThemeCss(presets: Preset<Theme>[]): string {
  const self = presets.find(p => p.name === 'soybean-ui-uno');
  const preflights = (self as unknown as { preflights?: { getCSS: () => string }[] })?.preflights;
  return preflights?.[0]?.getCSS() ?? '';
}

describe('presetUiUnocss', () => {
  it('composes the expected preset stack', () => {
    const presets = presetUiUnocss({ uiCSS: true });
    const names = presets.map(p => p.name);
    // wind3 + animations + self theme
    expect(presets.length).toBeGreaterThanOrEqual(3);
    expect(names).toContain('soybean-ui-uno');
  });

  it('applies size/radius base tokens to the generated theme CSS', () => {
    const css = getThemeCss(presetUiUnocss({ uiCSS: true, size: 'lg', radius: 'sm' }));
    expect(css).toContain('--size:18px');
    expect(css).toContain('--radius:.5rem');
  });

  it('falls back to the engine defaults when no base tokens are given', () => {
    const css = getThemeCss(presetUiUnocss({ uiCSS: true }));
    expect(css).toContain('--size:16px');
    expect(css).toContain('--radius:.625rem');
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
    expect(names).toContain('soybean-ui-uno-scrollbar');
  });

  it('`scrollbar` shortcut declares css variables and styles webkit pseudo elements', async () => {
    const css = await generateCss(['scrollbar']);
    expect(css).toContain('--soybean-scrollbar-track:#f5f5f5');
    expect(css).toContain('--soybean-scrollbar-thumb:#ddd');
    expect(css).toContain('--soybean-scrollbar-width:8px');
    expect(css).toContain('.scrollbar{');
    expect(css).toContain('overflow:auto;');
    expect(css).toContain('.scrollbar::-webkit-scrollbar{width:var(--soybean-scrollbar-width);');
    expect(css).toContain('.scrollbar::-webkit-scrollbar-track{background-color:var(--soybean-scrollbar-track);');
    expect(css).toContain('.scrollbar::-webkit-scrollbar-thumb{background-color:var(--soybean-scrollbar-thumb);');
  });

  it('`scrollbar-none` hides the scrollbar', async () => {
    const css = await generateCss(['scrollbar-none']);
    expect(css).toContain('.scrollbar-none{scrollbar-width:none;');
    expect(css).toContain('.scrollbar-none::-webkit-scrollbar{display:none;');
  });

  it('`scrollbar-rounded` applies radius variables to track and thumb', async () => {
    const css = await generateCss(['scrollbar-rounded']);
    expect(css).toContain(
      '.scrollbar-rounded::-webkit-scrollbar-track{border-radius:var(--soybean-scrollbar-track-radius);'
    );
    expect(css).toContain(
      '.scrollbar-rounded::-webkit-scrollbar-thumb{border-radius:var(--soybean-scrollbar-thumb-radius);'
    );
  });

  it('resolves thumb/track colors from the theme with the variant pseudo elements', async () => {
    const css = await generateCss(['scrollbar-thumb-color-primary', 'scrollbar-track-op-50']);
    expect(css).toContain('--soybean-scrollbar-thumb:hsl(var(--primary)');
    expect(css).toContain('--soybean-scrollbar-track-opacity:0.5');
  });

  it('maps size aliases to scrollbar css variables', async () => {
    const css = await generateCss(['scrollbar-w-12px', 'scrollbar-radius-6px']);
    expect(css).toContain('--soybean-scrollbar-width:12px');
    expect(css).toContain('--soybean-scrollbar-track-radius:6px');
    expect(css).toContain('--soybean-scrollbar-thumb-radius:6px');
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

describe('presetSbean', () => {
  function withConfig(json: Record<string, unknown>): string {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sbean-'));
    fs.writeFileSync(path.join(dir, 'sbean.json'), JSON.stringify(json), 'utf-8');
    return dir;
  }

  it('reads the full uno block and applies every SbeanUnoConfig item', () => {
    const dir = withConfig({
      uno: { base: 'zinc', primary: 'indigo', size: 'lg', radius: 'sm' }
    });

    const css = getThemeCss(presetSbean({ cwd: dir }));
    expect(css).toContain('--size:18px');
    expect(css).toContain('--radius:.5rem');

    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('falls back to the default theme when sbean.json is missing', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sbean-empty-'));
    const css = getThemeCss(presetSbean({ cwd: dir }));
    expect(css).toContain('--size:16px');
    expect(css).toContain('--radius:.625rem');
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('lets user overrides take precedence over sbean.json values', () => {
    const dir = withConfig({ uno: { base: 'zinc', primary: 'indigo', size: 'sm', radius: 'md' } });

    const css = getThemeCss(presetSbean({ cwd: dir, overrides: { size: 'xl' } }));
    expect(css).toContain('--size:20px');
    expect(css).toContain('--radius:.625rem');

    fs.rmSync(dir, { recursive: true, force: true });
  });
});
