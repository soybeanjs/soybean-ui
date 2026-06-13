import { DEFAULT_PRESET_OPTIONS } from './constants';
import { mergeObjects } from './shared';
import {
  generateCSSVariables,
  generateAllColorCSSVariables,
  generateSizeCSSVariable,
  generateAllRadiusCSSVariable,
  generateMenuCSSVariable
} from './css';
import { generateThemePreset } from './preset';
import type {
  PresetConfig,
  PresetKeyConfig,
  ThemeOptions,
  BaseThemeOptions,
  RequiredThemeOptions,
  ThemeSize
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
  const { size, base, primary, feedback, menuColor, menuAccent, styleTarget, darkSelector, format, preset } = opts;

  // The all-variant color CSS includes ALL built-in base/primary/feedback/sidebar combos.
  // Default values are in :root, variants use [data-*] selectors.
  const allColorCss = generateAllColorCSSVariables({ styleTarget, darkSelector, format });

  const getSizeCss = (sizeValue?: ThemeSize) => generateSizeCSSVariable(sizeValue ?? size, styleTarget);
  const getMenuCss = () => generateMenuCSSVariable(menuColor, menuAccent, styleTarget);

  const getCss = (config?: BaseThemeOptions) => {
    const { size: sizeValue = size } = config ?? {};

    const menuCss = getMenuCss();
    const sizeCss = getSizeCss(sizeValue);
    const radiusCss = generateAllRadiusCSSVariable(styleTarget);

    return `${menuCss}\n\n${sizeCss}\n\n${radiusCss}\n\n${allColorCss}`;
  };

  // Legacy: per-config color CSS (for dynamic updates via ConfigProvider)
  const getColorCss = (config?: PresetConfig) => {
    const mergedConfig: Required<PresetKeyConfig> = {
      base: config?.base ?? base,
      primary: config?.primary ?? primary,
      feedback: config?.feedback ?? feedback
    };
    const themePreset = generateThemePreset(mergedConfig, config?.preset ?? preset);
    return generateCSSVariables(themePreset, { styleTarget, darkSelector, format });
  };

  return { getCss, getSizeCss, getColorCss };
}
