import { generatePalette } from '@soybeanjs/colord/palette';
import { COLOR_VARIABLES, DARK_SELECTOR, EXTENDED_THEME_VARIABLES, RADIUS_VARIABLE, RADII } from './constants';
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
  Radii
} from './types';

export function generateCSSVariables(
  preset: ThemeColorPreset,
  options: Required<Pick<ThemeOptions, 'styleTarget' | 'darkSelector' | 'format'>>
) {
  const { light, dark } = preset;
  const { format, styleTarget } = options;

  let lightCss = '';
  let darkCss = '';

  keysOf(COLOR_VARIABLES).forEach(key => {
    lightCss += getItemColorCSSVariables(key, format, light);
    darkCss += getItemColorCSSVariables(key, format, dark);
  });

  const lightPaletteCss = generateCSSVariablesPalette(light, format);

  let css = `${styleTarget} {\n${lightCss}\n${lightPaletteCss}\n}`;

  let darkSelector = options.darkSelector;
  if (darkSelector === 'class' || darkSelector === 'media') {
    darkSelector = DARK_SELECTOR[darkSelector as DarkSelector];
  }

  const darkPaletteCss = generateCSSVariablesPalette(dark, format);

  css += `\n\n${darkSelector} {\n${darkCss}\n${darkPaletteCss}\n}`;

  return css;
}

export function generateRadiusCSSVariable(radius: Radii | (string & {}), styleTarget: StyleTarget = ':root') {
  const radiusValue = RADII[radius as Radii] ?? radius;

  const css = `${styleTarget} {\n${RADIUS_VARIABLE}: ${radiusValue};\n}`;

  return css;
}

function getItemColorCSSVariables(key: ThemeColorKey, format: ColorFormat, preset: Record<ThemeColorKey, ColorValue>) {
  let color = getColorValue(preset[key], format);
  if (format === 'hsl') {
    color = removeHslBrackets(color);
  }
  const { color: c, alphaCss } = getAlphaCSSVariables(color, format, key);

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
function getAlphaCSSVariables(colorValue: string, format: ColorFormat, key: string) {
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

function generateCSSVariablesPalette(themeColors: CSSVariablesColor, format: ColorFormat) {
  const keys: (keyof CSSVariablesColor)[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon'];

  let css = '';

  keys.forEach(key => {
    const color = getColorValue(themeColors[key], format);
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
