import { mergeObjects, getDarkSelector } from './shared';
import { generateCss } from './css';
import { DEFAULT_PRESET_OPTIONS } from './defaults';
import { generateThemePreset } from './preset';
import type { CustomThemeColorPreset, ThemeOptions, ThemePresetInput, RequiredThemeOptions } from './types';

/**
 * the engine only consumes inline `CustomThemeColorPreset` values; a
 * `{ presetName }` reference is resolved by the ConfigProvider before calling
 * `createTheme`, so any reference reaching the engine directly falls back to
 * the built-in colors.
 */
const isInlinePreset = (preset: ThemePresetInput): preset is CustomThemeColorPreset => !('presetName' in preset);

export function createTheme(options?: ThemeOptions) {
  const {
    size,
    radius,
    base,
    primary,
    menuColor,
    menuAccent,
    styleTarget,
    darkSelector: rawDarkSelector,
    format,
    lightLevel,
    darkLevel,
    preset
  } = mergeObjects<RequiredThemeOptions>(DEFAULT_PRESET_OPTIONS, options ?? {});

  const darkSelector = getDarkSelector(rawDarkSelector);

  const themePreset = generateThemePreset(
    { base, primary },
    { lightLevel, darkLevel },
    preset && isInlinePreset(preset) ? preset : undefined
  );

  return generateCss(themePreset, { styleTarget, darkSelector, format, size, radius, menuColor, menuAccent });
}
