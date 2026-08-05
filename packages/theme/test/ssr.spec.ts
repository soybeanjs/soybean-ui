import { afterEach, describe, expect, it } from 'vitest';
import {
  createThemeInitScript,
  getCookieValue,
  getThemeConfigFromCookie,
  isServerRuntime,
  parseThemeConfig
} from '../src/ssr';

const cookieHeader = (key: string, value: string): string => `other=1; ${key}=${value}; next=2`;

afterEach(() => {
  // happy-dom 不会用 `Max-Age=0` 从 document.cookie 中移除 cookie，而是留下
  // `name=` 空值；改用 `expires` 属性才能可靠删除，避免测试间状态泄漏。
  document.cookie.split(';').forEach(cookie => {
    const [name] = cookie.trim().split('=');
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`;
    }
  });
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

describe('getCookieValue', () => {
  it('extracts a plain cookie value', () => {
    expect(getCookieValue('a=1; preset=brand-demo; b=2', 'preset')).toBe('brand-demo');
  });

  it('returns null for a missing key or empty input', () => {
    expect(getCookieValue('a=1', 'preset')).toBeNull();
    expect(getCookieValue(null, 'preset')).toBeNull();
    expect(getCookieValue(undefined, 'preset')).toBeNull();
  });
});

describe('parseThemeConfig', () => {
  it('parses a JSON config payload', () => {
    expect(parseThemeConfig(JSON.stringify({ base: 'zinc', primary: 'indigo', mode: 'dark' }))).toEqual({
      base: 'zinc',
      primary: 'indigo',
      mode: 'dark'
    });
  });

  it('parses the compact "<base>-<primary>" form as light mode', () => {
    expect(parseThemeConfig('zinc-indigo')).toEqual({ base: 'zinc', primary: 'indigo', mode: 'light' });
  });

  it('returns null for missing or malformed payloads', () => {
    expect(parseThemeConfig('')).toBeNull();
    expect(parseThemeConfig('nodash')).toBeNull();
    expect(parseThemeConfig('{bad json')).toBeNull();
    expect(parseThemeConfig(JSON.stringify({ primary: 'indigo' }))).toBeNull();
  });
});

describe('getThemeConfigFromCookie', () => {
  it('parses only base/primary/mode from a raw cookie header', () => {
    const header = cookieHeader(
      'soybean-theme',
      encodeURIComponent(JSON.stringify({ base: 'slate', primary: 'violet', mode: 'dark', radius: 'lg' }))
    );

    expect(getThemeConfigFromCookie(header)).toEqual({ base: 'slate', primary: 'violet', mode: 'dark' });
  });

  it('returns null for a missing header, missing key, or malformed value', () => {
    expect(getThemeConfigFromCookie(null)).toBeNull();
    expect(getThemeConfigFromCookie('other=1')).toBeNull();
    expect(getThemeConfigFromCookie(`${'soybean-theme'}=%E0%A4%A`)).toBeNull();
  });
});

describe('createThemeInitScript', () => {
  it('emits a self-contained IIFE guarded by try/catch', () => {
    const script = createThemeInitScript();

    expect(script).toContain('(function () {');
    expect(script).toContain('try {');
    expect(script).toContain('catch (e) {}');
  });

  it('is a no-op when no config is provided', () => {
    const script = createThemeInitScript();

    expect(script).not.toContain('setAttribute');
    expect(script).not.toContain('classList');
  });

  it('sets data-theme from base and primary when a config is provided', () => {
    const script = createThemeInitScript({ config: { base: 'slate', primary: 'violet', mode: 'light' } });

    expect(script).toContain("doc.setAttribute('data-theme', themeKey)");
    expect(script).toContain('"slate"');
    expect(script).toContain('"violet"');
  });

  it('toggles the dark class from config.mode', () => {
    const script = createThemeInitScript({ config: { base: 'slate', primary: 'violet', mode: 'dark' } });

    expect(script).toContain('classList.toggle("dark", true)');
  });

  it('skips the class toggle when the media selector is used', () => {
    const script = createThemeInitScript({
      config: { base: 'slate', primary: 'violet', mode: 'dark' },
      darkSelector: 'media'
    });

    expect(script).not.toContain('classList');
  });

  it('respects setDataTheme=false to skip the data-theme attribute', () => {
    const script = createThemeInitScript({
      config: { base: 'slate', primary: 'violet', mode: 'light' },
      setDataTheme: false
    });

    expect(script).not.toContain('setAttribute');
  });

  it('emits a runnable script that applies the resolved theme', () => {
    const script = createThemeInitScript({ config: { base: 'slate', primary: 'violet', mode: 'dark' } });
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const run = new Function(script);

    run();

    expect(document.documentElement.getAttribute('data-theme')).toBe('slate-violet');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
