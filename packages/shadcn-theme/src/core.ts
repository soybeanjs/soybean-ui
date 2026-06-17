import { DEFAULT_PRESET_OPTIONS } from './constants';
import { mergeObjects, getDarkSelector } from './shared';
import { generateCss } from './css';
import { generateThemePreset } from './preset';
import type { PresetConfig, PresetKeyConfig, ThemeOptions, RequiredThemeOptions } from './types';

export function createShadcnTheme(options?: ThemeOptions) {
  const {
    size,
    radius,
    base,
    primary,
    feedback,
    menuColor,
    menuAccent,
    styleTarget,
    darkSelector: rawDarkSelector,
    format,
    preset
  } = mergeObjects<RequiredThemeOptions>(DEFAULT_PRESET_OPTIONS, options ?? {});

  const darkSelector = getDarkSelector(rawDarkSelector);

  /**
   * get the CSS string for the theme based on the provided config.
   * @param config the preset config, only when scope is 'current', the config will be used to generate CSS.
   */
  const getCss = (config?: PresetConfig) => {
    const mergedConfig: Required<PresetKeyConfig> = {
      base: config?.base ?? base,
      primary: config?.primary ?? primary,
      feedback: config?.feedback ?? feedback
    };

    const themePreset = generateThemePreset(mergedConfig, config?.preset ?? preset);

    return generateCss(themePreset, { styleTarget, darkSelector, format, size, radius, menuColor, menuAccent });
  };

  return { getCss };
}
