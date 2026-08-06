import { defu } from 'defu';
import { getDarkSelector } from './shared';
import { generateCss } from './css';
import { DEFAULT_PRESET_OPTIONS } from './defaults';
import { generateThemePreset } from './preset';
import type { ThemeOptions } from './types';

/**
 * generate the full theme CSS from base/primary palette keys and an optional
 * custom preset override.
 *
 * The pipeline is: resolve the preset (`generateThemePreset`) → emit CSS
 * (`generateCss`). It is a pure string function with no side effects and no
 * DOM access, so it is safe to invoke on the server during SSR.
 */
export function createTheme(options?: ThemeOptions): string {
  // `defu(source, ...defaults)`: user options override the engine defaults,
  // and `undefined` values fall through to the defaults.
  const merged = defu(options ?? ({} as Required<ThemeOptions>), DEFAULT_PRESET_OPTIONS);

  const { base, primary, styleTarget, format, preset, lightLevel, darkLevel, complete } = merged;

  const darkSelector = getDarkSelector(merged.darkSelector);

  const themePreset = generateThemePreset({ base, primary, preset, lightLevel, darkLevel, complete });

  return generateCss(themePreset, { styleTarget, darkSelector, format });
}
