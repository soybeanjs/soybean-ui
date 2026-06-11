import { DEFAULT_PRESET_OPTIONS } from './constants';
import { mergeObjects, getColorPresetCacheKey } from './shared';
import { generateCSSVariables, generateRadiusCSSVariable } from './css';
import { generateThemePreset } from './preset';
import type { PresetConfig, PresetKeyConfig, ThemeOptions, RequiredThemeOptions, Radii } from './types';

export function createShadcnTheme(options?: ThemeOptions) {
  const opts = mergeObjects<RequiredThemeOptions>(
    {
      ...DEFAULT_PRESET_OPTIONS,
      styleTarget: ':root',
      darkSelector: 'class',
      format: 'hsl'
    },
    options ?? {}
  );
  const { base, primary, feedback, sidebar, radius, styleTarget, darkSelector, format, preset } = opts;

  const colorCssCache = new Map<string, string>();

  const getColorCss = (config?: PresetConfig) => {
    const mergedConfig: Required<PresetKeyConfig> = {
      base: config?.base ?? base,
      primary: config?.primary ?? primary,
      feedback: config?.feedback ?? feedback,
      sidebar: config?.sidebar ?? sidebar
    };

    const hasCustomPreset = !!(config?.preset ?? preset);

    const shouldUseColorCssCache = !hasCustomPreset;

    const cacheKey = getColorPresetCacheKey(mergedConfig);

    if (shouldUseColorCssCache && colorCssCache.has(cacheKey)) {
      return colorCssCache.get(cacheKey)!;
    }

    const themePreset = generateThemePreset(mergedConfig, config?.preset ?? preset);

    const css = generateCSSVariables(themePreset, { styleTarget, darkSelector, format });

    if (shouldUseColorCssCache) {
      colorCssCache.set(cacheKey, css);
    }

    return css;
  };

  const getRadiusCss = (update?: Radii | (string & {})) => generateRadiusCSSVariable(update ?? radius, styleTarget);

  const getCss = (config?: PresetConfig, radiusValue?: Radii | (string & {})) => {
    const radiusCss = getRadiusCss(radiusValue ?? radius);
    const css = getColorCss(config);

    return `${radiusCss}\n\n${css}`;
  };

  return {
    /**
     * get the complete css variables string
     *
     * the result is the combination of color css variables and radius css variable
     */
    getCss,
    /**
     * get the color css variables string
     */
    getColorCss,
    /**
     * get the radius css variable string
     */
    getRadiusCss
  };
}
