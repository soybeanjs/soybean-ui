import { describe, expect, it } from 'vitest';
import { buildThemeCss } from '../../../src/theme/adapter';

/**
 * The runtime bridge onto the token engine.
 *
 * The runtime context produces engine `ThemeOptions` directly; the bridge only
 * centralizes how the alias block is emitted (prefix / selectors / format all
 * follow the options, so runtime CSS, preset preflight and first-paint
 * snapshot agree).
 */

const state = { base: 'zinc', primary: 'indigo' } as const;

describe('buildThemeCss', () => {
  it('emits the alias block for the current theme state', () => {
    const css = buildThemeCss(state);

    expect(css).toContain('--vean-background: var(--zinc-100);');
    expect(css).toContain('--vean-primary: var(--indigo-500);');
    expect(css).toContain('--vean-border-alpha: 1;');
    expect(css).toContain('--vean-radius: 0.625rem;');
    expect(css).toContain('.dark {');
  });

  it('follows the theme state (base / primary / level)', () => {
    const css = buildThemeCss({ ...state, base: 'slate', primary: 'emerald', lightLevel: 1 });

    expect(css).toContain('--vean-background: var(--slate-200);');
    expect(css).toContain('--vean-primary: var(--emerald-500);');
  });

  it('applies overrides to the emitted aliases', () => {
    const css = buildThemeCss({ ...state, overrides: { light: { surface: 'zinc.200' } } });

    expect(css).toContain('--vean-surface: var(--zinc-200);');
  });

  it('does not repeat the static palette layer', () => {
    const css = buildThemeCss(state);

    // 别名块只有 `var(--indigo-*)` 引用（含角色 ramp）；带冒号的调色板声明只可能出现在静态调色板层
    expect(css).not.toContain('--slate-50:');
    expect(css).not.toContain('--indigo-600:');
  });
});
