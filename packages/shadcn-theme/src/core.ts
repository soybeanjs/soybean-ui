import { DEFAULT_PRESET_OPTIONS } from './constants';
import { mergeObjects, getColorPresetCacheKey } from './shared';
import { generateCSSVariables, generateRadiusCSSVariable } from './css';
import { generateThemePreset } from './preset';
import type { PresetConfig, PresetKeyConfig, ThemeOptions, RequiredThemeOptions, Radii, ThemeSize } from './types';

/** Size → root font-size mapping (in pixels). */
const SIZE_FONT_SIZE_MAP: Record<ThemeSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24
};

/** Generate root font-size CSS from the size option. */
export function generateSizeCSS(size?: ThemeSize, styleTarget: string = ':root'): string {
  const fontSize = SIZE_FONT_SIZE_MAP[size ?? 'md'];

  // Always set the base font-size, and add [data-size] variants
  // for runtime switching (used by ConfigProvider).
  let css = `${styleTarget} {\n  font-size: ${fontSize}px;\n}`;

  for (const [key, value] of Object.entries(SIZE_FONT_SIZE_MAP)) {
    css += `\n\n${styleTarget}[data-size="${key}"] {\n  font-size: ${value}px;\n}`;
  }

  return css;
}

export function createShadcnTheme(options?: ThemeOptions) {
  const opts = mergeObjects<RequiredThemeOptions>(
    {
      ...DEFAULT_PRESET_OPTIONS,
      styleTarget: ':root',
      darkSelector: 'class',
      format: 'hsl',
      size: 'md'
    },
    options ?? {}
  );
  const { base, primary, feedback, sidebar, radius, styleTarget, darkSelector, format, preset, size } = opts;

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
    const sizeCss = generateSizeCSS(size, styleTarget);
    const radiusCss = getRadiusCss(radiusValue ?? radius);
    const css = getColorCss(config);

    return `${sizeCss}\n\n${radiusCss}\n\n${css}`;
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
