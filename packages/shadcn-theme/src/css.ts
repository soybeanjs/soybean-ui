import { generatePalette } from '@soybeanjs/colord/palette';
import {
  COLOR_VARIABLES,
  DARK_SELECTOR,
  EXTENDED_THEME_VARIABLES,
  SIZE_VARIABLE,
  RADIUS_VARIABLE,
  UI_DATA_ATTRIBUTE,
  menuColorCss,
  menuAccentCss
} from './constants';
import {
  getColorValue,
  keysOf,
  removeHslBrackets,
  isUnTransformedColor,
  resolveSizeValue,
  resolveRadiusValue
} from './shared';
import type {
  ColorFormat,
  ColorValue,
  DarkSelector,
  ThemeColor,
  ThemeColorKey,
  ThemeColorPreset,
  ThemeColorWithAlphaKey,
  ThemeOptions
} from './types';

export function generateCss(
  preset: ThemeColorPreset,
  options: Required<
    Pick<ThemeOptions, 'styleTarget' | 'darkSelector' | 'format' | 'size' | 'radius' | 'menuColor' | 'menuAccent'>
  >
) {
  const baseCss = generateBaseCss(options);
  const colorCss = generateColorCss(preset, options);

  const css = `${baseCss}\n\n${colorCss}`;

  return css;
}

function generateBaseCss(
  options: Required<Pick<ThemeOptions, 'styleTarget' | 'size' | 'radius' | 'menuColor' | 'menuAccent'>>
) {
  const { styleTarget, size, radius, menuColor, menuAccent } = options;

  let css = '';
  css += `${styleTarget} {\n`;
  css += `  ${SIZE_VARIABLE}: ${resolveSizeValue(size)};\n`;
  css += `  ${RADIUS_VARIABLE}: ${resolveRadiusValue(radius)};\n`;

  const mCVars = menuColorCss[menuColor];
  keysOf(mCVars).forEach(varKey => {
    css += `  ${varKey}: ${mCVars[varKey]};\n`;
  });

  const aCVars = menuAccentCss[menuAccent];
  keysOf(aCVars).forEach(varKey => {
    css += `  ${varKey}: ${aCVars[varKey]};\n`;
  });

  css += `}\n\n`;

  keysOf(menuColorCss).forEach(key => {
    if (key === 'default') return;

    const vars = menuColorCss[key];
    css += `\n\n[${UI_DATA_ATTRIBUTE.menuColor}="${key}"] {\n`;
    keysOf(vars).forEach(varKey => {
      css += `  ${varKey}: ${vars[varKey]};\n`;
    });
    css += `}`;
  });

  keysOf(menuAccentCss).forEach(key => {
    if (key === 'default') return;

    const vars = menuAccentCss[key];
    css += `\n\n[${UI_DATA_ATTRIBUTE.menuAccent}="${key}"] {\n`;
    keysOf(vars).forEach(varKey => {
      css += `  ${varKey}: ${vars[varKey]};\n`;
    });
    css += `}`;
  });

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
    const lightValue = getItemColorCss(key, format, light);
    const darkValue = getItemColorCss(key, format, dark);

    lightCss += lightValue;
    if (darkValue !== lightValue) {
      darkCss += darkValue;
    }
  });

  let lightPaletteCss = '';
  let darkPaletteCss = '';

  const keys: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon'];
  keys.forEach(key => {
    const lightValue = generatePaletteItemCss(light[key], key, format);
    const darkValue = generatePaletteItemCss(dark[key], key, format);

    lightPaletteCss += lightValue;
    if (darkValue !== lightValue) {
      darkPaletteCss += darkValue;
    }
  });

  let css = `${styleTarget} {\n${lightCss}\n${lightPaletteCss}\n}`;

  let darkSelector = options.darkSelector;
  if (darkSelector === 'class' || darkSelector === 'media') {
    darkSelector = DARK_SELECTOR[darkSelector as DarkSelector];
  }

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

function generatePaletteItemCss(color: ColorValue, paletteKey: ThemeColor, format: ColorFormat) {
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
