import { defu } from 'defu';
import { getDarkSelector } from './shared';
import { generateCss } from './css';
import { DEFAULT_PRESET_OPTIONS } from './defaults';
import { resolveTheme } from './preset';
import type { ThemeOptions } from './types';

/**
 * resolve a full theme preset (with auto-generated name) from the theme
 * options, without generating any CSS. Exposed for SSR / theme-store reuse.
 */
export { resolveTheme } from './preset';

/**
 * generate the full theme CSS from base/primary palette keys, the selected
 * feedback / chart / sidebar schemes, and an optional inline override.
 *
 * The pipeline is: resolve the preset (`resolveTheme`) → emit CSS (`generateCss`).
 * It is a pure string function with no side effects and no DOM access, so it is
 * safe to invoke on the server during SSR.
 */
export function createTheme(options?: ThemeOptions): string {
  // `defu(source, ...defaults)`: user options override the engine defaults,
  // and `undefined` values fall through to the defaults.
  const merged = defu(options ?? ({} as Required<ThemeOptions>), DEFAULT_PRESET_OPTIONS);

  const { base, primary, styleTarget, format, lightLevel, darkLevel } = merged;

  const darkSelector = getDarkSelector(merged.darkSelector);

  const themePreset = resolveTheme({
    base,
    primary,
    feedback: merged.feedback,
    chart: merged.chart,
    sidebar: merged.sidebar,
    sidebarDerive: merged.sidebarDerive,
    overrides: merged.overrides,
    size: merged.size,
    radius: merged.radius,
    menuColor: merged.menuColor,
    menuAccent: merged.menuAccent,
    lightLevel,
    darkLevel
  });

  return generateCss(themePreset, { styleTarget, darkSelector, format }, merged.borderOpacity);
}
