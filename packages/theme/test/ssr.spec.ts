import { afterEach, describe, expect, it } from 'vitest';
import {
  createThemeInitScript,
  createThemeStore,
  getCookieValue,
  getThemeConfigFromCookie,
  isServerRuntime
} from '../src/ssr';
import {
  THEME_COOKIE_KEY,
  THEME_PRESETS_STORAGE_KEY,
  THEME_STORAGE_KEY,
  setStoredThemeConfig,
  setStoredThemePreset,
  stringifyThemeConfig
} from '../src/storage';
import type { StoredThemePreset, ThemeConfigState } from '../src/types';

const sampleConfig: ThemeConfigState = {
  base: 'slate',
  primary: 'violet',
  mode: 'dark',
  radius: 'lg',
  size: 'md'
};

const samplePreset: StoredThemePreset = {
  name: 'brand',
  version: '1.0.0',
  light: { primary: 'blue.600', ring: 'blue.500' },
  dark: { primary: 'blue.300', ring: 'blue.700' }
};

const cookieHeader = (key: string, value: string): string => `other=1; ${key}=${value}; next=2`;

afterEach(() => {
  window.localStorage.clear();
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

    // @ts-expect-error simulate a server runtime without window
    delete globalThis.window;

    try {
      expect(isServerRuntime()).toBe(true);
    } finally {
      globalThis.window = original;
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

describe('getThemeConfigFromCookie', () => {
  it('resolves the config from a raw cookie header', () => {
    const header = cookieHeader(THEME_COOKIE_KEY, encodeURIComponent(stringifyThemeConfig(sampleConfig)));

    expect(getThemeConfigFromCookie(header)).toEqual(sampleConfig);
  });

  it('returns null for a missing header, missing key, or malformed value', () => {
    expect(getThemeConfigFromCookie(null)).toBeNull();
    expect(getThemeConfigFromCookie('other=1')).toBeNull();
    expect(getThemeConfigFromCookie(`${THEME_COOKIE_KEY}=%E0%A4%A`)).toBeNull();
  });
});

describe('createThemeInitScript', () => {
  it('emits a self-contained IIFE guarded by try/catch', () => {
    const script = createThemeInitScript();

    expect(script).toContain('(function () {');
    expect(script).toContain('try {');
    expect(script).toContain('catch (e) {}');
    expect(script).toContain(`localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})`);
  });

  it('sets data-theme from base and primary by default', () => {
    const script = createThemeInitScript();

    expect(script).toContain("doc.setAttribute('data-theme', themeKey)");
  });

  it('toggles the dark class from config.mode', () => {
    const script = createThemeInitScript();

    expect(script).toContain("config.mode === 'dark'");
  });

  it('mirrors the config into the cookie by default', () => {
    const script = createThemeInitScript();

    expect(script).toContain(`"${THEME_COOKIE_KEY}" + '=' + encodeURIComponent(raw)`);
  });

  it('respects options to disable data-theme and cookie sync', () => {
    const script = createThemeInitScript({ setDataTheme: false, syncCookie: false });

    expect(script).not.toContain('setAttribute');
    expect(script).not.toContain('document.cookie');
  });

  it('emits a runnable script that applies the stored theme', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, stringifyThemeConfig(sampleConfig));

    const script = createThemeInitScript({ syncCookie: false });
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const run = new Function(script);

    run();

    expect(document.documentElement.getAttribute('data-theme')).toBe('slate-violet');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

describe('createThemeStore (client / CSR)', () => {
  it('routes to a client store (isServer=false)', () => {
    const store = createThemeStore({ isServer: false });

    expect(store.isServer).toBe(false);
  });

  it('reads the config from localStorage', () => {
    setStoredThemeConfig(sampleConfig);

    const store = createThemeStore({ isServer: false });

    expect(store.readConfig()).toEqual(sampleConfig);
  });

  it('commitConfig writes localStorage and mirrors the cookie', () => {
    const store = createThemeStore({ isServer: false });

    store.commitConfig(sampleConfig);

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(stringifyThemeConfig(sampleConfig));
    expect(document.cookie).toContain(THEME_COOKIE_KEY);
    expect(store.readConfig()).toEqual(sampleConfig);
  });

  it('resolves a preset from the localStorage presets table', () => {
    setStoredThemePreset(samplePreset);

    const store = createThemeStore({ isServer: false });

    expect(store.resolvePreset('brand')).toEqual({ light: samplePreset.light, dark: samplePreset.dark });
    expect(store.resolvePreset('missing')).toBeUndefined();
  });

  it('saves and removes presets through the client store', () => {
    const store = createThemeStore({ isServer: false });

    expect(store.savePreset(samplePreset)).toBe(true);
    expect(store.resolvePreset('brand')).toBeDefined();
    expect(store.removePreset('brand')).toBe(true);
    expect(store.resolvePreset('brand')).toBeUndefined();
  });

  it('applies and resets a preset reference through the cookie', () => {
    const store = createThemeStore({ isServer: false });

    expect(store.readAppliedPreset()).toBeNull();

    store.applyPreset('brand-demo');
    expect(store.readAppliedPreset()).toBe('brand-demo');

    store.resetPreset();
    expect(store.readAppliedPreset()).toBeNull();
  });
});

describe('createThemeStore (server / SSR)', () => {
  it('routes to a server store (isServer=true)', () => {
    const store = createThemeStore({ isServer: true });

    expect(store.isServer).toBe(true);
  });

  it('reads the config from the injected cookie header', () => {
    const store = createThemeStore({
      isServer: true,
      cookieHeader: cookieHeader(THEME_COOKIE_KEY, encodeURIComponent(stringifyThemeConfig(sampleConfig)))
    });

    expect(store.readConfig()).toEqual(sampleConfig);
  });

  it('returns null when the cookie header is empty or malformed', () => {
    const store = createThemeStore({ isServer: true, cookieHeader: null });

    expect(store.readConfig()).toBeNull();
  });

  it('commitConfig is a no-op on the server', () => {
    const store = createThemeStore({ isServer: true });

    store.commitConfig(sampleConfig);

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('resolves a preset through the injected presetProvider', () => {
    const store = createThemeStore({
      isServer: true,
      presetProvider: name => (name === samplePreset.name ? { light: samplePreset.light } : undefined)
    });

    expect(store.resolvePreset('brand')).toEqual({ light: samplePreset.light });
    expect(store.resolvePreset('missing')).toBeUndefined();
  });

  it('savePreset / removePreset are no-ops on the server', () => {
    const store = createThemeStore({ isServer: true });

    expect(store.savePreset(samplePreset)).toBe(false);
    expect(store.removePreset('brand')).toBe(false);
    expect(window.localStorage.getItem(THEME_PRESETS_STORAGE_KEY)).toBeNull();
  });

  it('reads the applied preset name from the cookie header', () => {
    const store = createThemeStore({
      isServer: true,
      cookieHeader: cookieHeader('soybean-ui-applied-preset', 'brand-demo')
    });

    expect(store.readAppliedPreset()).toBe('brand-demo');
  });

  it('applyPreset / resetPreset are no-ops on the server', () => {
    const store = createThemeStore({ isServer: true });

    store.applyPreset('brand-demo');
    store.resetPreset();

    expect(document.cookie).not.toContain('soybean-ui-applied-preset');
  });
});

describe('createThemeStore (cross-environment consistency)', () => {
  it('keeps the applied preset name resolvable across server and client', () => {
    // 客户端应用 preset 并持久化到 cookie
    const clientStore = createThemeStore({ isServer: false });
    clientStore.applyPreset('brand-demo');

    // 服务端从同一 cookie 读到一致的应用引用
    const serverStore = createThemeStore({
      isServer: true,
      cookieHeader: cookieHeader('soybean-ui-applied-preset', 'brand-demo')
    });

    expect(serverStore.readAppliedPreset()).toBe(clientStore.readAppliedPreset());
  });
});