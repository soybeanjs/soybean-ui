import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetSbean, presetUiUnocss } from '../src/index';

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
