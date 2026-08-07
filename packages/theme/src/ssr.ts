/**
 * SSR helpers for the theme engine.
 *
 * The engine itself (`createTheme`) is a pure CSS-string function that never
 * touches `window`/`document`, so it can run on the server as-is. This module
 * adds the thin plumbing needed to render a consistent theme on the server and
 * hydrate on the client without flicker:
 *
 * - runtime detection (`isServerRuntime`)
 * - cookie parsing (`getCookieValue` / `getThemeConfigFromCookie`)
 * - an inline init script that applies a resolved theme before first paint
 *   (`createThemeInitScript`)
 *
 * Storage is intentionally out of scope: the config is passed into the init
 * script explicitly rather than read back from `localStorage`.
 */

import { getDarkSelector } from './shared';
import type { DarkSelectorValue } from './types';

/**
 * the minimal theme config that drives SSR rendering and the init script
 */
export interface ThemeConfigState {
  /**
   * the base palette key
   */
  base: string;
  /**
   * the primary palette key
   */
  primary: string;
  /**
   * the active color mode
   */
  mode: 'light' | 'dark';
}

/**
 * options for `createThemeInitScript`
 */
export interface ThemeInitScriptOptions {
  /**
   * the resolved theme config to apply before first paint.
   *
   * When omitted the script is a no-op (no storage to read from).
   */
  config?: ThemeConfigState;
  /**
   * how dark mode is applied in the generated CSS.
   *
   * - `class`: dark tokens live under `.dark`, so the init script toggles the
   *   `.dark` class on `<html>` from `config.mode`.
   * - `media`: dark tokens live under `@media (prefers-color-scheme: dark)`
   *   and follow the OS preference automatically, so the init script skips the
   *   class toggle entirely.
   * - custom: any other class selector (e.g. `.custom-dark`) is used verbatim.
   *
   * @default 'class'
   */
  darkSelector?: DarkSelectorValue;
  /**
   * whether to set `data-theme="<base>-<primary>"` on `<html>`
   *
   * @default true
   */
  setDataTheme?: boolean;
}

/**
 * detect the server runtime at call time.
 *
 * The theme library is pre-built, so `import.meta.env.SSR` is evaluated at
 * build time and bundled as a constant, which cannot reflect the consumer's
 * actual runtime. This checks the global object instead, which is a reliable,
 * environment-agnostic signal: `window`/`document` are absent during SSR.
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
 * parse a serialized theme config string into a `ThemeConfigState`.
 *
 * Accepts a JSON payload (`{"base":"zinc","primary":"indigo","mode":"dark"}`)
 * or the compact `"<base>-<primary>"` form. Returns `null` on malformed input.
 */
export function parseThemeConfig(raw: string): ThemeConfigState | null {
  if (!raw) {
    return null;
  }

  // compact "<base>-<primary>" form
  if (!raw.startsWith('{')) {
    const [base, primary] = raw.split('-');
    if (!base || !primary) {
      return null;
    }
    return { base, primary, mode: 'light' };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ThemeConfigState>;
    if (!parsed.base || !parsed.primary) {
      return null;
    }
    return {
      base: parsed.base,
      primary: parsed.primary,
      mode: parsed.mode === 'dark' ? 'dark' : 'light'
    };
  } catch {
    return null;
  }
}

/**
 * the default cookie key carrying the current theme config
 */
export const THEME_COOKIE_KEY = '__SOYBEAN_THEME';

/**
 * resolve the theme config from a raw cookie header.
 *
 * Suitable for both the server (`useRequestHeaders(['cookie'])` in Nuxt) and
 * the client (`document.cookie`). Returns `null` when the cookie is missing or
 * malformed.
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
 * generate the inline `<head>` script that applies a resolved theme before
 * first paint to avoid theme flash on refresh (FOUC):
 *
 * - sets `data-theme="<base>-<primary>"` on `<html>`
 * - toggles the dark mode class from `config.mode`
 *
 * No storage is involved: the config is passed explicitly so the same script
 * works identically in SSR and client-only setups.
 */
export function createThemeInitScript(options: ThemeInitScriptOptions = {}): string {
  const { config, darkSelector = 'class', setDataTheme = true } = options;

  const statements = ['(function () {', '  try {', '    var doc = document.documentElement;'];

  if (config) {
    if (setDataTheme) {
      statements.push(
        `    var themeKey = [${JSON.stringify(config.base)}, ${JSON.stringify(config.primary)}].filter(Boolean).join('-');`,
        "    if (themeKey) doc.setAttribute('data-theme', themeKey);"
      );
    }

    const resolvedSelector = getDarkSelector(darkSelector);

    // media mode follows the OS preference via `@media (prefers-color-scheme)`.
    // toggling a class would be a no-op at best and could misfire other `.dark`
    // rules at worst, so skip the class toggle whenever that selector is used.
    if (!resolvedSelector.startsWith('@media')) {
      // class and custom selectors are `.foo`; the class name is the selector
      // without the leading dot.
      const darkClass = resolvedSelector.replace(/^\./, '');
      const isDark = config.mode === 'dark';
      statements.push(`    doc.classList.toggle(${JSON.stringify(darkClass)}, ${JSON.stringify(isDark)});`);
    }
  }

  statements.push('  } catch (e) {}', '})();');

  return statements.join('\n');
}
