import { mergeObjects, getDarkSelector } from './shared';
import { generateCss } from './css';
import { DEFAULT_PRESET_OPTIONS } from './defaults';
import { generateThemePreset } from './preset';
import type { ThemeOptions, RequiredThemeOptions } from './types';

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

  const themePreset = generateThemePreset({ base, primary }, { lightLevel, darkLevel }, preset);

  return generateCss(themePreset, { styleTarget, darkSelector, format, size, radius, menuColor, menuAccent });
}
