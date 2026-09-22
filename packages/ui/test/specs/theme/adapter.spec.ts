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

    expect(css).toContain('--background: var(--zinc-50);');
    expect(css).toContain('--primary: var(--indigo-500);');
    expect(css).toContain('--border-alpha: 1;');
    expect(css).toContain('--radius: 0.5rem;');
    expect(css).toContain('.dark {');
  });

  it('follows the theme state (base / primary / surfaceStyle)', () => {
    const css = buildThemeCss({ ...state, base: 'slate', primary: 'emerald', surfaceStyle: 'flat' });

    expect(css).toContain('--background: var(--white);');
    expect(css).toContain('--primary: var(--emerald-500);');
  });

  it('applies overrides to the emitted aliases', () => {
    const css = buildThemeCss({ ...state, overrides: { light: { card: 'zinc.200' } } });

    expect(css).toContain('--card: var(--zinc-200);');
  });

  it('does not repeat the static palette layer', () => {
    const css = buildThemeCss(state);

    // 别名块只有 `var(--indigo-*)` 引用（含角色 ramp）；带冒号的调色板声明只可能出现在静态调色板层
    expect(css).not.toContain('--slate-50:');
    expect(css).not.toContain('--indigo-600:');
  });
});
