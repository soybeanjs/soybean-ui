/**
 * SSR helpers for the theme engine.
 *
 * The engine itself (`createTheme`) is a pure CSS-string function that never
 * touches `window`/`document`, so it can run on the server as-is. This module
 * adds the thin plumbing needed to render a consistent theme on the server and
 * hydrate on the client without flicker:
 *
 * - runtime detection (`isServerRuntime`)
 * - an inline init script that applies the persisted theme (from localStorage)
 *   before first paint (`createThemeInitScript`)
 *
 * The theme is persisted in localStorage only (no cookie). On the server the
 * first paint uses the default theme; the inline init script reads the
 * persisted preference from localStorage and applies data-theme / the dark
 * mode class before the browser paints, so there is no theme flash.
 */

import { getDarkSelector } from './shared';
import { THEME_STORAGE_KEY } from './storage';
import type { DarkSelectorValue } from './types';

/**
 * options for `createThemeInitScript`
 */
export interface ThemeInitScriptOptions {
  /**
   * the localStorage key the persisted theme config is read from.
   *
   * Must match the key used by `setStoredThemeConfig` (default
   * `THEME_STORAGE_KEY`).
   *
   * @defaultValue THEME_STORAGE_KEY
   */
  storageKey?: string;
  /**
   * how dark mode is applied in the generated CSS.
   *
   * - `class`: dark tokens live under `.dark`, so the init script toggles the
   *   `.dark` class on `<html>` from the persisted `mode`.
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
 * generate the inline `<head>` script that applies the persisted theme before
 * first paint to avoid theme flash on refresh (FOUC):
 *
 * - reads the theme config previously persisted to localStorage
 * - sets `data-theme="<base>-<primary>"` on `<html>`
 * - toggles the dark mode class from the persisted `mode`
 *
 * The script runs in the browser before first paint and reads localStorage
 * directly, so it works identically in SSR and client-only setups.
 */
export function createThemeInitScript(options: ThemeInitScriptOptions = {}): string {
  const { storageKey = THEME_STORAGE_KEY, darkSelector = 'class', setDataTheme = true } = options;

  const resolvedSelector = getDarkSelector(darkSelector);

  const statements = ['(function () {', '  try {', '    var doc = document.documentElement;'];

  statements.push(
    `    var raw = localStorage.getItem(${JSON.stringify(storageKey)});`,
    '    if (!raw) return;',
    '    var cfg = JSON.parse(raw);'
  );

  if (setDataTheme) {
    statements.push(
      "    var themeKey = [cfg.base, cfg.primary].filter(Boolean).join('-');",
      "    if (themeKey) doc.setAttribute('data-theme', themeKey);"
    );
  }

  // media mode follows the OS preference via `@media (prefers-color-scheme)`.
  // toggling a class would be a no-op at best and could misfire other `.dark`
  // rules at worst, so skip the class toggle whenever that selector is used.
  if (!resolvedSelector.startsWith('@media')) {
    // class and custom selectors are `.foo`; the class name is the selector
    // without the leading dot.
    const darkClass = resolvedSelector.replace(/^\./, '');
    // `auto` resolves against the OS preference; explicit `dark` always wins.
    statements.push(
      `    var isDark = cfg.mode === 'dark' || (cfg.mode === 'auto' && !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);`,
      `    doc.classList.toggle(${JSON.stringify(darkClass)}, isDark);`
    );
  }

  statements.push('  } catch (e) {}', '})();');

  return statements.join('\n');
}
