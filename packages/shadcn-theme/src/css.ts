import { generatePalette } from '@soybeanjs/colord/palette';
import {
  COLOR_VARIABLES,
  DARK_SELECTOR,
  EXTENDED_THEME_VARIABLES,
  THEME_SIZE,
  SIZE_VARIABLE,
  RADIUS_VARIABLE,
  THEME_RADIUS,
  UI_DATA_ATTRIBUTE,
  menuColorCss,
  menuAccentCss,
  sidebarCssVars,
  darkSidebarCss,
  builtinBasePreset,
  builtinPrimaryPreset,
  builtinFeedbackPreset
} from './constants';
import { getColorValue, keysOf, removeHslBrackets, isUnTransformedColor } from './shared';
import type {
  ColorFormat,
  ColorValue,
  DarkSelector,
  StyleTarget,
  ThemeColorKey,
  ThemeColorPreset,
  ThemeColorWithAlphaKey,
  ThemeColors,
  ThemeOptions,
  ThemeSize
} from './types';

export function generateAllCss(options: Required<Pick<ThemeOptions, 'styleTarget' | 'darkSelector' | 'format'>>) {
  const { styleTarget, darkSelector, format } = options;

  const sizeCss = generateSizeCss(styleTarget);
  const radiusCss = generateRadiusCss();
  const menuCss = generateMenuCss();
  const baseCss = generateBaseCss({ darkSelector, format });
  const primaryCss = generatePrimaryCss({ darkSelector, format });
  const feedbackCss = generateFeedbackCss({ darkSelector, format });
  const sidebarCss = generateSidebarCss({ styleTarget, darkSelector });

  const css = `${sizeCss}\n\n${radiusCss}\n\n${menuCss}\n\n${baseCss}\n\n${primaryCss}\n\n${feedbackCss}\n\n${sidebarCss}`;

  return css;
}

export function generateCss(
  preset: ThemeColorPreset,
  options: Required<
    Pick<ThemeOptions, 'styleTarget' | 'darkSelector' | 'format' | 'size' | 'radius' | 'menuColor' | 'menuAccent'>
  >
) {
  const sizeCss = generateSizeCss(options.styleTarget, options.size);
  const radiusCss = generateRadiusCss(options);
  const menuCss = generateMenuCss(options);
  const colorCss = generateColorCss(preset, options);

  const css = `${sizeCss}\n\n${radiusCss}\n\n${menuCss}\n\n${colorCss}`;

  return css;
}

export function generateSizeCss(styleTarget: StyleTarget, size?: ThemeSize) {
  let css = `${styleTarget} {\n  font-size: var(${SIZE_VARIABLE});\n}\n\n`;

  if (size) {
    css = `${styleTarget} {\n  ${SIZE_VARIABLE}: ${THEME_SIZE[size]}px;\n}`;
  }

  keysOf(THEME_SIZE).forEach(key => {
    const fontSize = THEME_SIZE[key];
    css += `\n\n[${UI_DATA_ATTRIBUTE.size}="${key}"] {\n  ${SIZE_VARIABLE}: ${fontSize}px;\n}`;
  });

  return css;
}

export function generateRadiusCss(options?: Pick<ThemeOptions, 'styleTarget' | 'radius'>) {
  const { styleTarget, radius } = options ?? {};

  let css = ``;
  if (styleTarget && radius) {
    css = `${styleTarget} {\n  ${RADIUS_VARIABLE}: ${THEME_RADIUS[radius]};\n}`;
  }

  keysOf(THEME_RADIUS).forEach(key => {
    const radiusValue = THEME_RADIUS[key];
    css += `\n\n[${UI_DATA_ATTRIBUTE.radius}="${key}"] {\n  ${RADIUS_VARIABLE}: ${radiusValue};\n}`;
  });

  return css;
}

export function generateMenuCss(options?: Pick<ThemeOptions, 'styleTarget' | 'menuColor' | 'menuAccent'>) {
  const { styleTarget, menuColor, menuAccent } = options ?? {};

  let css = '';
  if (styleTarget) {
    css += `${styleTarget} {\n`;
    if (menuColor) {
      const vars = menuColorCss[menuColor];
      keysOf(vars).forEach(varKey => {
        css += `  ${varKey}: ${vars[varKey]};\n`;
      });
    }
    if (menuAccent) {
      const vars = menuAccentCss[menuAccent];
      keysOf(vars).forEach(varKey => {
        css += `  ${varKey}: ${vars[varKey]};\n`;
      });
    }
    css += `}`;
  }

  keysOf(menuColorCss).forEach(key => {
    const vars = menuColorCss[key];
    css += `\n\n[${UI_DATA_ATTRIBUTE.menuColor}="${key}"] {\n`;
    keysOf(vars).forEach(varKey => {
      css += `  ${varKey}: ${vars[varKey]};\n`;
    });
    css += `}`;
  });

  keysOf(menuAccentCss).forEach(key => {
    const vars = menuAccentCss[key];
    css += `\n\n[${UI_DATA_ATTRIBUTE.menuAccent}="${key}"] {\n`;
    keysOf(vars).forEach(varKey => {
      css += `  ${varKey}: ${vars[varKey]};\n`;
    });
    css += `}`;
  });

  return css;
}

export function generateBaseCss(options: Required<Pick<ThemeOptions, 'darkSelector' | 'format'>>) {
  const { format, darkSelector } = options;

  let css = '';

  keysOf(builtinBasePreset).forEach(key => {
    const { light, dark } = builtinBasePreset[key];

    let lightCss = '';
    let darkCss = '';

    keysOf(light).forEach(colorKey => {
      lightCss += getItemColorCss(colorKey, format, light);
      darkCss += getItemColorCss(colorKey, format, dark);
    });

    const lightPaletteCss = generatePaletteItemCss(light.carbon, 'carbon', format);
    const darkPaletteCss = generatePaletteItemCss(dark.carbon, 'carbon', format);

    lightCss += lightPaletteCss;
    darkCss += darkPaletteCss;

    lightCss = `[${UI_DATA_ATTRIBUTE.base}="${key}"] {\n${lightCss}\n}`;
    darkCss = `${darkSelector}[${UI_DATA_ATTRIBUTE.base}="${key}"] {\n${darkCss}\n}`;

    css += `${lightCss}\n\n${darkCss}`;
  });

  return css;
}

export function generatePrimaryCss(options: Required<Pick<ThemeOptions, 'darkSelector' | 'format'>>) {
  const { format, darkSelector } = options;

  let css = '';

  keysOf(builtinPrimaryPreset).forEach(key => {
    const { light, dark } = builtinPrimaryPreset[key];

    let lightCss = '';
    let darkCss = '';

    keysOf(light).forEach(colorKey => {
      lightCss += getItemColorCss(colorKey, format, light);
      darkCss += getItemColorCss(colorKey, format, dark);
    });

    const lightPaletteCss = generatePaletteItemCss(light.primary, 'primary', format);
    const darkPaletteCss = generatePaletteItemCss(dark.primary, 'primary', format);

    lightCss += lightPaletteCss;
    darkCss += darkPaletteCss;

    lightCss = `[${UI_DATA_ATTRIBUTE.primary}="${key}"] {\n${lightCss}\n}`;
    darkCss = `${darkSelector}[${UI_DATA_ATTRIBUTE.primary}="${key}"] {\n${darkCss}\n}`;

    css += `${lightCss}\n\n${darkCss}`;
  });

  return css;
}

export function generateFeedbackCss(options: Required<Pick<ThemeOptions, 'darkSelector' | 'format'>>) {
  const { format, darkSelector } = options;

  let css = '';

  keysOf(builtinFeedbackPreset).forEach(key => {
    const { light, dark } = builtinFeedbackPreset[key];

    let lightCss = '';
    let darkCss = '';

    keysOf(light).forEach(colorKey => {
      lightCss += getItemColorCss(colorKey, format, light);
      darkCss += getItemColorCss(colorKey, format, dark);
    });

    const lightPaletteCss = generatePaletteCss(light, format);
    const darkPaletteCss = generatePaletteCss(dark, format);

    lightCss += lightPaletteCss;
    darkCss += darkPaletteCss;

    lightCss = `[${UI_DATA_ATTRIBUTE.feedback}="${key}"] {\n${lightCss}\n}`;
    darkCss = `${darkSelector}[${UI_DATA_ATTRIBUTE.feedback}="${key}"] {\n${darkCss}\n}`;

    css += `${lightCss}\n\n${darkCss}`;
  });

  return css;
}

export function generateSidebarCss(options: Required<Pick<ThemeOptions, 'styleTarget' | 'darkSelector'>>) {
  const { styleTarget, darkSelector } = options;

  let lightCss = '';
  let darkCss = '';

  keysOf(sidebarCssVars).forEach(key => {
    lightCss += `${COLOR_VARIABLES[key]}: ${sidebarCssVars[key]};\n`;
    darkCss += `${COLOR_VARIABLES[key]}: ${darkSidebarCss[key]};\n`;
  });

  const css = `${styleTarget} {\n${lightCss}\n}\n\n${darkSelector} {\n${darkCss}\n}`;

  return css;
}

export function generateColorCss(
  preset: ThemeColorPreset,
  options: Required<Pick<ThemeOptions, 'styleTarget' | 'darkSelector' | 'format'>>
) {
  const { light, dark } = preset;
  const { format, styleTarget } = options;

  let lightCss = '';
  let darkCss = '';

  keysOf(COLOR_VARIABLES).forEach(key => {
    lightCss += getItemColorCss(key, format, light);
    darkCss += getItemColorCss(key, format, dark);
  });

  const lightPaletteCss = generatePaletteCss(light, format);

  let css = `${styleTarget} {\n${lightCss}\n${lightPaletteCss}\n}`;

  let darkSelector = options.darkSelector;
  if (darkSelector === 'class' || darkSelector === 'media') {
    darkSelector = DARK_SELECTOR[darkSelector as DarkSelector];
  }

  const darkPaletteCss = generatePaletteCss(dark, format);

  css += `\n\n${darkSelector} {\n${darkCss}\n${darkPaletteCss}\n}`;

  return css;
}

function getItemColorCss(key: ThemeColorKey, format: ColorFormat, preset: Partial<Record<ThemeColorKey, ColorValue>>) {
  const value = preset[key];
  if (!value) return '';

  let color = getColorValue(value, format);
  if (format === 'hsl') {
    color = removeHslBrackets(color);
  }
  const { color: c, alphaCss } = getAlphaCss(color, format, key);

  color = c;

  let css = `${COLOR_VARIABLES[key]}: ${color};\n`;
  css += alphaCss;

  return css;
}

/**
 *
 * @param colorValue format is hsl without brackets: "hue, saturation, lightness / alpha"
 * @param format
 */
function getAlphaCss(colorValue: string, format: ColorFormat, key: string) {
  const alphaKeys: ThemeColorWithAlphaKey[] = ['border', 'input', 'sidebarBorder'];

  const untransformed = isUnTransformedColor(colorValue as ColorValue);

  if (untransformed || format === 'oklch' || !alphaKeys.includes(key as ThemeColorWithAlphaKey)) {
    return {
      color: colorValue,
      alphaCss: ''
    };
  }

  let [color, alphaString = '1'] = colorValue.split('/');

  color = color.trim();
  alphaString = alphaString.trim();

  let alpha = Number.parseFloat(alphaString);
  if (alphaString.endsWith('%')) {
    alpha /= 100;
  }

  let alphaCss = '';

  if (key === 'border') {
    alphaCss = `${EXTENDED_THEME_VARIABLES.borderAlpha}: ${alpha};\n`;
  }

  if (key === 'input') {
    alphaCss += `${EXTENDED_THEME_VARIABLES.inputAlpha}: ${alpha};\n`;
  }

  if (key === 'sidebarBorder') {
    alphaCss += `${EXTENDED_THEME_VARIABLES.sidebarBorderAlpha}: ${alpha};\n`;
  }

  return {
    color,
    alphaCss
  };
}

type CSSVariablesColor = Pick<
  Required<ThemeColors>,
  'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon'
>;

function generatePaletteCss(themeColors: Partial<CSSVariablesColor>, format: ColorFormat) {
  const keys: (keyof CSSVariablesColor)[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon'];

  let css = '';

  keys.forEach(key => {
    const val = themeColors[key];
    if (!val) return;

    const color = getColorValue(val, format);
    const palette = generatePalette(color, format === 'hsl' ? 'hslString' : 'oklchString');

    keysOf(palette).forEach(level => {
      let value = palette[level];
      if (format === 'hsl') {
        value = removeHslBrackets(value);
      }

      css += `--${key}-${level}: ${value};\n`;
    });
  });

  return css;
}

function generatePaletteItemCss(color: ColorValue, paletteKey: keyof CSSVariablesColor, format: ColorFormat) {
  let css = '';
  const colorValue = getColorValue(color, format);
  const palette = generatePalette(colorValue, format === 'hsl' ? 'hslString' : 'oklchString');

  keysOf(palette).forEach(level => {
    let value = palette[level];
    if (format === 'hsl') {
      value = removeHslBrackets(value);
    }

    css += `--${paletteKey}-${level}: ${value};\n`;
  });

  return css;
}
