import { generatePalette } from '@soybeanjs/colord/palette';
import {
  getDarkSelector,
  isUnTransformedColor,
  removeHslBrackets,
  resolveColorValue,
  resolveRadiusValue,
  resolveSizeValue
} from './shared';
import { keysOf } from './utils';
import type {
  BaseGenerateCSSOptions,
  ColorFormat,
  ColorKey,
  ColorTokens,
  ColorValue,
  FullThemePreset,
  StyleTarget,
  ThemeColor
} from './types';
import {
  ALPHA_COLOR_VARIABLES,
  COLOR_VARIABLES,
  PALETTE_COLOR_KEYS,
  RADIUS_VARIABLE,
  SIZE_VARIABLE
} from './variables';

/**
 * generate the full theme CSS (base tokens + light/dark color tokens) from a
 * resolved `FullThemePreset`.
 */
export function generateCss(
  preset: FullThemePreset,
  options: Required<BaseGenerateCSSOptions>,
  borderOpacity?: number
) {
  const baseCss = generateBaseCss(preset, options.styleTarget);
  const colorCss = generateColorCss(preset, options, borderOpacity);

  return `${baseCss}\n\n${colorCss}`;
}

function generateBaseCss(preset: FullThemePreset, styleTarget: StyleTarget) {
  let css = '';
  css += `${styleTarget} {\n`;
  css += `  ${SIZE_VARIABLE}: ${resolveSizeValue(preset.size)};\n`;
  css += `  ${RADIUS_VARIABLE}: ${resolveRadiusValue(preset.radius)};\n`;
  css += `}\n\n`;

  return css;
}

/**
 * generate the color token CSS (light layer + dark layer).
 *
 * The dark layer only emits a token when its value differs from the light
 * value, so a derived dark that equals light produces no override and the
 * dark mode naturally inherits the light token.
 */
export function generateColorCss(
  preset: FullThemePreset,
  options: Required<BaseGenerateCSSOptions>,
  borderOpacity?: number
) {
  const { light, dark } = preset;
  const { format, styleTarget } = options;

  let lightCss = '';
  let darkCss = '';

  keysOf(COLOR_VARIABLES).forEach(key => {
    const lightValue = getItemColorCss(key, format, light, borderOpacity);
    const darkValue = getItemColorCss(key, format, dark, borderOpacity);

    lightCss += lightValue;
    if (darkValue !== lightValue) {
      darkCss += darkValue;
    }
  });

  let lightPaletteCss = '';
  let darkPaletteCss = '';

  PALETTE_COLOR_KEYS.forEach(key => {
    const lightValue = generatePaletteItemCss(light[key], key, format);
    const darkValue = generatePaletteItemCss(dark[key], key, format);

    lightPaletteCss += lightValue;
    if (darkValue !== lightValue) {
      darkPaletteCss += darkValue;
    }
  });

  let css = `${styleTarget} {\n${lightCss}\n${lightPaletteCss}\n}`;

  css += `\n\n${getDarkSelector(options.darkSelector)} {\n${darkCss}\n${darkPaletteCss}\n}`;

  return css;
}

function getItemColorCss(key: ColorKey, format: ColorFormat, preset: Partial<ColorTokens>, borderOpacity?: number) {
  const value = preset[key];
  if (!value) return '';

  let color = resolveColorValue(value, format);
  if (format === 'hsl') {
    color = removeHslBrackets(color);
  }
  const { color: c, alphaCss } = getAlphaCss(color, format, key, borderOpacity);

  color = c;

  let css = `${COLOR_VARIABLES[key]}: ${color};\n`;
  css += alphaCss;

  return css;
}

/**
 * extract the alpha channel of an hsl color and expose it as a dedicated
 * variable for `border`/`input`/`sidebarBorder` so runtime overlays can tune
 * opacity independently of the color channels.
 */
function getAlphaCss(colorValue: string, format: ColorFormat, key: ColorKey, borderOpacity?: number) {
  const alphaVariable = ALPHA_COLOR_VARIABLES[key];

  if (!alphaVariable || format === 'oklch' || isUnTransformedColor(colorValue as ColorValue)) {
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

  // `borderOpacity` scales the alpha derived from the token color for the
  // border family (border / input / sidebar-border). Defaults to 1 (unchanged).
  const effectiveAlpha = (borderOpacity ?? 1) * alpha;

  return {
    color,
    alphaCss: `${alphaVariable}: ${effectiveAlpha};\n`
  };
}

function generatePaletteItemCss(color: ColorValue | undefined, paletteKey: ThemeColor, format: ColorFormat) {
  if (!color) {
    return '';
  }

  let css = '';
  const colorValue = resolveColorValue(color, format);
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
