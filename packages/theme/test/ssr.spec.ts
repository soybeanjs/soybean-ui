import { afterEach, describe, expect, it, vi } from 'vitest';
import { createThemeInitScript, isServerRuntime } from '../src/ssr';
import { THEME_STORAGE_KEY } from '../src/storage';

afterEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.classList.remove('dark');
});

describe('isServerRuntime', () => {
  it('returns false in a browser-like environment (happy-dom)', () => {
    expect(isServerRuntime()).toBe(false);
  });

  it('returns true when window is absent', () => {
    const original = globalThis.window;

    Object.defineProperty(globalThis, 'window', { value: undefined, configurable: true });

    try {
      expect(isServerRuntime()).toBe(true);
    } finally {
      Object.defineProperty(globalThis, 'window', { value: original, configurable: true });
    }
  });
});

describe('createThemeInitScript', () => {
  it('emits a self-contained IIFE guarded by try/catch', () => {
    const script = createThemeInitScript();

    expect(script).toContain('(function () {');
    expect(script).toContain('try {');
    expect(script).toContain('catch (e) {}');
  });

  it('reads the persisted theme from localStorage and falls back when empty', () => {
    const script = createThemeInitScript();

    expect(script).toContain(`localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})`);
    expect(script).toContain('if (!raw) return;');
  });

  it('sets data-theme from the persisted base and primary', () => {
    const script = createThemeInitScript();

    expect(script).toContain("doc.setAttribute('data-theme', themeKey)");
    expect(script).toContain('cfg.base');
    expect(script).toContain('cfg.primary');
  });

  it('toggles the dark class from the persisted mode', () => {
    const script = createThemeInitScript();

    expect(script).toContain('classList.toggle("dark", isDark)');
    expect(script).toContain("cfg.mode === 'dark'");
  });

  it('resolves auto mode against the OS prefers-color-scheme', () => {
    const script = createThemeInitScript();

    expect(script).toContain('(prefers-color-scheme: dark)');
  });

  it('skips the class toggle when the media selector is used', () => {
    const script = createThemeInitScript({ darkSelector: 'media' });

    expect(script).not.toContain('classList');
  });

  it('respects setDataTheme=false to skip the data-theme attribute', () => {
    const script = createThemeInitScript({ setDataTheme: false });

    expect(script).not.toContain('setAttribute');
  });

  it('emits a runnable script that applies the persisted theme', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ base: 'slate', primary: 'violet', mode: 'dark' }));

    const script = createThemeInitScript();
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const run = new Function(script);

    run();

    expect(document.documentElement.getAttribute('data-theme')).toBe('slate-violet');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('applies the dark class when auto mode follows a dark OS preference', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ base: 'slate', primary: 'violet', mode: 'auto' }));

    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;

    try {
      const script = createThemeInitScript();
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const run = new Function(script);

      run();

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it('applies nothing when no theme is persisted', () => {
    const script = createThemeInitScript();
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const run = new Function(script);

    run();

    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
