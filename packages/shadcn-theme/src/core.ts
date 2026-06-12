import { DEFAULT_PRESET_OPTIONS } from './constants';
import { mergeObjects, getColorPresetCacheKey } from './shared';
import { generateCSSVariables, generateSizeCSSVariable, generateRadiusCSSVariable } from './css';
import { generateThemePreset } from './preset';
import type {
  PresetConfig,
  PresetKeyConfig,
  ThemeOptions,
  BaseThemeOptions,
  RequiredThemeOptions,
  ThemeSize,
  ThemeRadius
} from './types';

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
  const { size, radius, base, primary, feedback, styleTarget, darkSelector, format, preset } = opts;

  const colorCssCache = new Map<string, string>();

  const getColorCss = (config?: PresetConfig) => {
    const mergedConfig: Required<PresetKeyConfig> = {
      base: config?.base ?? base,
      primary: config?.primary ?? primary,
      feedback: config?.feedback ?? feedback
    };

    const hasCustomPreset = Boolean(config?.preset ?? preset);

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

  const getSizeCss = (sizeValue?: ThemeSize) => generateSizeCSSVariable(sizeValue ?? size, styleTarget);

  const getRadiusCss = (update?: ThemeRadius) => generateRadiusCSSVariable(update ?? radius, styleTarget);

  const getCss = (config?: BaseThemeOptions) => {
    const { size: sizeValue = size, radius: radiusValue = radius } = config ?? {};

    const sizeCss = getSizeCss(sizeValue);
    const radiusCss = getRadiusCss(radiusValue);
    const css = getColorCss(config);

    return `${sizeCss}\n\n${radiusCss}\n\n${css}`;
  };

  return {
    /**
     * get the complete css variables string
     *
     * the result is the combination of size css variables, radius css variables, and color css variables
     */
    getCss,
    /**
     * get the size css variables string
     */
    getSizeCss,
    /**
     * get the radius css variable string
     */
    getRadiusCss,
    /**
     * get the color css variables string
     */
    getColorCss
  };
}
