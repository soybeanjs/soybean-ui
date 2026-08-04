import {
  THEME_COOKIE_KEY,
  THEME_PRESETS_STORAGE_KEY,
  THEME_STORAGE_KEY,
  getStoredThemeConfig,
  getStoredThemePresets,
  parseThemeConfig,
  removeStoredThemePreset,
  setStoredThemeConfig,
  setStoredThemePreset,
  setThemeCookie
} from './storage';
import type {
  CustomThemeColorPreset,
  StoredThemePreset,
  ThemeConfigState,
  ThemeInitScriptOptions,
  ThemeStore,
  ThemeStoreOptions
} from './types';

/**
 * the default cookie key carrying the currently applied custom preset name
 */
export const APPLIED_PRESET_COOKIE_KEY = 'soybean-theme-applied-preset';

/**
 * detect the server runtime at call time.
 *
 * The theme library is pre-built, so `import.meta.env.SSR` is evaluated at
 * build time and bundled as a constant, which cannot reflect the consumer's
 * actual runtime. This function checks the global object instead, which is a
 * reliable, environment-agnostic signal: `window`/`document` are absent during
 * server-side rendering.
 */
export function isServerRuntime(): boolean {
  return typeof window === 'undefined' || typeof document === 'undefined';
}

/**
 * read a plain cookie value from a raw cookie string (e.g. a server request
 * header or `document.cookie`). Returns `null` when the key is absent.
 */
export function getCookieValue(rawCookie: string | null | undefined, key: string): string | null {
  if (!rawCookie) {
    return null;
  }

  const entry = rawCookie
    .split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${key}=`));

  if (!entry) {
    return null;
  }

  const value = entry.slice(key.length + 1);

  // 空值（例如 cookie 被清除后残留的 `key=`）视为未设置
  return value || null;
}

/**
 * resolve the theme config from a raw cookie header.
 *
 * Suitable for both the server (`useRequestHeaders(['cookie'])` in Nuxt) and
 * the client (`document.cookie`). Returns `null` when the cookie is missing,
 * malformed, or carries an unsupported preset key.
 */
export function getThemeConfigFromCookie(
  rawCookie: string | null | undefined,
  key: string = THEME_COOKIE_KEY
): ThemeConfigState | null {
  if (!rawCookie) {
    return null;
  }

  const entry = rawCookie
    .split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${key}=`));

  if (!entry) {
    return null;
  }

  let value: string;
  try {
    value = decodeURIComponent(entry.slice(key.length + 1));
  } catch {
    return null;
  }

  return parseThemeConfig(value);
}

/**
 * generate the inline `<head>` script that applies the persisted theme before
 * first paint to avoid theme flash on refresh:
 *
 * - sets `data-theme="<base>-<primary>"` on `<html>`
 * - toggles the dark mode class from `config.mode`
 * - mirrors the config into a cookie so the next SSR request renders the same theme
 */
export function createThemeInitScript(options: ThemeInitScriptOptions = {}): string {
  const {
    storageKey = THEME_STORAGE_KEY,
    cookieKey = THEME_COOKIE_KEY,
    darkClass = 'dark',
    setDataTheme = true,
    syncCookie = true
  } = options;

  const statements = [
    '(function () {',
    '  try {',
    `    var raw = localStorage.getItem(${JSON.stringify(storageKey)});`,
    '    if (!raw) return;',
    '    var config = JSON.parse(raw);',
    "    if (!config || typeof config !== 'object') return;",
    '    var doc = document.documentElement;'
  ];

  if (setDataTheme) {
    statements.push(
      "    var themeKey = [config.base, config.primary].filter(Boolean).join('-');",
      "    if (themeKey) doc.setAttribute('data-theme', themeKey);"
    );
  }

  statements.push(`    if (config.mode) doc.classList.toggle(${JSON.stringify(darkClass)}, config.mode === 'dark');`);

  if (syncCookie) {
    statements.push(
      `    var parts = [${JSON.stringify(cookieKey)} + '=' + encodeURIComponent(raw),`,
      "      'Max-Age=' + (60 * 60 * 24 * 365),",
      "      'Path=/',",
      "      'SameSite=Lax'",
      '    ];',
      "    document.cookie = parts.join('; ');"
    );
  }

  statements.push('  } catch (e) {}', '})();');

  return statements.join('\n');
}

const cookieMaxAge = 365 * 24 * 60 * 60;

const setCookieValue = (key: string, value: string, maxAge = cookieMaxAge): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${key}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
};

const toPresetColors = (preset: StoredThemePreset): CustomThemeColorPreset => ({
  light: preset.light,
  ...(preset.dark ? { dark: preset.dark } : {})
});

/**
 * create a cohesive, environment-aware theme storage facade.
 *
 * Bundles the persisted theme config, the custom presets table, and the
 * currently applied custom preset into one object. Pass `isServer` explicitly
 * (e.g. Nuxt's `import.meta.server`) so the SSR-specific paths are used even
 * though the library is pre-built.
 */
export function createThemeStore(options: ThemeStoreOptions = {}): ThemeStore {
  const {
    storageKey = THEME_STORAGE_KEY,
    cookieKey = THEME_COOKIE_KEY,
    presetsKey = THEME_PRESETS_STORAGE_KEY,
    appliedPresetCookieKey = APPLIED_PRESET_COOKIE_KEY,
    isServer = isServerRuntime(),
    cookieHeader = null,
    presetProvider
  } = options;

  const readAppliedPresetFromCookie = (): string | null => {
    const source = isServer ? cookieHeader : typeof document !== 'undefined' ? document.cookie : null;

    return getCookieValue(source, appliedPresetCookieKey);
  };

  return {
    get isServer() {
      return isServer;
    },

    readConfig(): ThemeConfigState | null {
      if (isServer) {
        return getThemeConfigFromCookie(cookieHeader, cookieKey);
      }

      return getStoredThemeConfig(storageKey);
    },

    commitConfig(config: ThemeConfigState): void {
      if (isServer) {
        return;
      }

      setStoredThemeConfig(config, storageKey);
      setThemeCookie(config, { key: cookieKey });
    },

    resolvePreset(name: string): CustomThemeColorPreset | undefined {
      if (isServer) {
        return presetProvider?.(name);
      }

      const preset = getStoredThemePresets(presetsKey)?.presets[name];

      return preset ? toPresetColors(preset) : undefined;
    },

    savePreset(preset: StoredThemePreset): boolean {
      if (isServer) {
        return false;
      }

      return setStoredThemePreset(preset, presetsKey);
    },

    removePreset(name: string): boolean {
      if (isServer) {
        return false;
      }

      return removeStoredThemePreset(name, presetsKey);
    },

    readAppliedPreset(): string | null {
      return readAppliedPresetFromCookie();
    },

    applyPreset(name: string): void {
      if (isServer) {
        return;
      }

      setCookieValue(appliedPresetCookieKey, name);
    },

    resetPreset(): void {
      if (isServer) {
        return;
      }

      setCookieValue(appliedPresetCookieKey, '', 0);
    }
  };
}

export type {
  ThemeConfigState,
  ThemeCookieOptions,
  ThemeInitScriptOptions,
  ThemeStore,
  ThemeStoreOptions
} from './types';
