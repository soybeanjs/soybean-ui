import { generatePalette } from '@soybeanjs/colord/palette';
import { keysOf } from '@soybeanjs/utils';
import { getColorValue, isUnTransformedColor, removeHslBrackets, resolveRadiusValue, resolveSizeValue } from './shared';
import { menuAccentCss, menuColorCss } from './recipes';
import type {
  BaseGenerateCSSOptions,
  ColorFormat,
  ColorKey,
  ColorTokens,
  ColorValue,
  DarkSelector,
  FullThemePreset,
  StyleTarget,
  ThemeColor,
  ThemeCssVariables
} from './types';
import { COLOR_VARIABLES, DARK_SELECTOR, EXTENDED_THEME_VARIABLES, RADIUS_VARIABLE, SIZE_VARIABLE } from './variables';

/**
 * the alpha-bearing tokens whose alpha channel is exposed as a separate
 * variable for runtime opacity tuning
 */
const ALPHA_KEYS: ReadonlyArray<'border' | 'input' | 'sidebarBorder'> = ['border', 'input', 'sidebarBorder'];

/**
 * generate the full theme CSS (base tokens + light/dark color tokens) from a
 * resolved `FullThemePreset`.
 */
export function generateCss(preset: FullThemePreset, options: Required<BaseGenerateCSSOptions>) {
  const baseCss = generateBaseCss(preset, options.styleTarget);
  const colorCss = generateColorCss(preset, options);

  return `${baseCss}\n\n${colorCss}`;
}

/**
 * generate the raw CSS from user-provided variables, bypassing the token
 * derivation pipeline entirely.
 *
 * `base` + `light` are emitted together on the style target, and `dark` is
 * emitted under the resolved dark selector. The `format` option is accepted for
 * signature parity but has no effect on raw CSS.
 */
export function generateRawCss(css: ThemeCssVariables, options: Required<BaseGenerateCSSOptions>) {
  const { styleTarget, darkSelector } = options;

  // trim each segment so multi-line strings ending with `\n` don't produce a
  // stray blank line before the closing brace; leading indentation is kept.
  const baseCss = css.base?.trimEnd() ?? '';
  const lightCss = css.light?.trimEnd() ?? '';
  const darkCss = css.dark?.trimEnd() ?? '';

  let output = '';

  const rootContent = [baseCss, lightCss].filter(Boolean).join('\n');
  if (rootContent) {
    output += `${styleTarget} {\n${rootContent}\n}`;
  }

  if (darkCss) {
    output += `${output ? '\n\n' : ''}${darkSelector} {\n${darkCss}\n}`;
  }

  return output;
}

function generateBaseCss(preset: FullThemePreset, styleTarget: StyleTarget) {
  let css = '';
  css += `${styleTarget} {\n`;
  css += `  ${SIZE_VARIABLE}: ${resolveSizeValue(preset.size)};\n`;
  css += `  ${RADIUS_VARIABLE}: ${resolveRadiusValue(preset.radius)};\n`;

  const mCVars = menuColorCss[preset.menuColor];
  keysOf(mCVars).forEach(varKey => {
    css += `  ${varKey}: ${mCVars[varKey]};\n`;
  });

  const aCVars = menuAccentCss[preset.menuAccent];
  keysOf(aCVars).forEach(varKey => {
    css += `  ${varKey}: ${aCVars[varKey]};\n`;
  });

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
export function generateColorCss(preset: FullThemePreset, options: Required<BaseGenerateCSSOptions>) {
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

function getItemColorCss(key: ColorKey, format: ColorFormat, preset: Partial<ColorTokens>) {
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
 * extract the alpha channel of an hsl color and expose it as a dedicated
 * variable for `border`/`input`/`sidebarBorder` so runtime overlays can tune
 * opacity independently of the color channels.
 */
function getAlphaCss(colorValue: string, format: ColorFormat, key: string) {
  const untransformed = isUnTransformedColor(colorValue as ColorValue);

  if (untransformed || format === 'oklch' || !ALPHA_KEYS.includes(key as (typeof ALPHA_KEYS)[number])) {
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

function generatePaletteItemCss(color: ColorValue | undefined, paletteKey: ThemeColor, format: ColorFormat) {
  if (!color) {
    return '';
  }

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
