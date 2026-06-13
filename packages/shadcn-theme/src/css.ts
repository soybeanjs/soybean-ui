import { generatePalette } from '@soybeanjs/colord/palette';
import {
  COLOR_VARIABLES,
  DARK_SELECTOR,
  EXTENDED_THEME_VARIABLES,
  THEME_SIZE,
  RADIUS_VARIABLE,
  THEME_RADIUS,
  builtinBasePreset,
  builtinPrimaryPreset,
  builtinFeedbackPreset
} from './constants';
import { getColorValue, keysOf, removeHslBrackets, isUnTransformedColor } from './shared';
import type {
  ColorFormat,
  ColorValue,
  DarkSelector,
  MenuColor,
  MenuAccent,
  StyleTarget,
  ThemeColorKey,
  ThemeColorPreset,
  ThemeColorWithAlphaKey,
  ThemeColors,
  ThemeOptions,
  ThemeSize,
  ThemeRadius
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

/** Generate root font-size CSS from the size option. */
export function generateSizeCSSVariable(size: ThemeSize, styleTarget: string = ':root'): string {
  const fontSize = THEME_SIZE[size];

  // Always set the base font-size, and add [data-size] variants
  // for runtime switching (used by ConfigProvider).
  let css = `${styleTarget} {\n  font-size: ${fontSize}px;\n}`;

  for (const [key, value] of Object.entries(THEME_SIZE)) {
    css += `\n\n${styleTarget}[data-size="${key}"] {\n  font-size: ${value}px;\n}`;
  }

  return css;
}

export function generateRadiusCSSVariable(radius: ThemeRadius, styleTarget: StyleTarget = ':root') {
  const radiusValue = THEME_RADIUS[radius] ?? (Number.parseFloat(radius) ? radius : THEME_RADIUS['md']);

  const css = `${styleTarget} {\n${RADIUS_VARIABLE}: ${radiusValue};\n}`;

  return css;
}

export function generateMenuCSSVariable(
  menuColor: MenuColor = 'default',
  menuAccent: MenuAccent = 'subtle',
  styleTarget: string = ':root'
): string {
  const T = styleTarget;

  // Base defaults
  let css =
    `${T} {\n` +
    `  --menu-bg: var(--popover);\n` +
    `  --menu-bg-alpha: 1;\n` +
    `  --menu-backdrop-blur: 0px;\n` +
    `  --menu-backdrop-saturate: 1;\n` +
    `  --menu-item-accent-bg: hsl(var(--foreground) / 0.05);\n` +
    `  --menu-item-accent-fg: var(--foreground);\n` +
    `}`;

  // menuColor variants
  if (menuColor !== 'default') {
    const inverted = menuColor === 'inverted' || menuColor === 'inverted-translucent';
    const translucent = menuColor === 'default-translucent' || menuColor === 'inverted-translucent';

    css += `\n\n${T}[data-menu-color="${menuColor}"] {\n`;
    if (inverted) css += `  --menu-bg: var(--card);\n`;
    if (translucent) {
      css += `  --menu-bg-alpha: 0.7;\n`;
      css += `  --menu-backdrop-blur: 40px;\n`;
      css += `  --menu-backdrop-saturate: 1.5;\n`;
    }
    css += `}`;
  }

  // Also add all [data-menu-color] variants for runtime switching
  for (const mc of ['default', 'inverted', 'default-translucent', 'inverted-translucent'] as MenuColor[]) {
    if (mc === menuColor) continue; // Already set above or as default
    const inverted = mc === 'inverted' || mc === 'inverted-translucent';
    const translucent = mc === 'default-translucent' || mc === 'inverted-translucent';

    css += `\n\n${T}[data-menu-color="${mc}"] {\n`;
    if (inverted) {
      css += `  --menu-bg: var(--card);\n`;
    } else {
      css += `  --menu-bg: var(--popover);\n`;
    }
    if (translucent) {
      css += `  --menu-bg-alpha: 0.7;\n`;
      css += `  --menu-backdrop-blur: 40px;\n`;
      css += `  --menu-backdrop-saturate: 1.5;\n`;
    } else {
      css += `  --menu-bg-alpha: 1;\n`;
      css += `  --menu-backdrop-blur: 0px;\n`;
      css += `  --menu-backdrop-saturate: 1;\n`;
    }
    css += `}`;
  }

  // menuAccent variant
  css +=
    `\n\n${T}[data-menu-accent="bold"] {\n` +
    `  --menu-item-accent-bg: hsl(var(--primary) / 0.1);\n` +
    `  --menu-item-accent-fg: var(--primary);\n` +
    `}`;

  return css;
}

// ---------------------------------------------------------------------------
// All-variant CSS generation (data-attribute approach)
// ---------------------------------------------------------------------------

/**
 * Generate CSS variables for ALL built-in base/primary/feedback presets
 * using [data-base], [data-primary], [data-feedback] selectors.
 *
 * Also generates sidebar combinations ([data-base][data-primary]).
 */
export function generateAllColorCSSVariables(options: {
  styleTarget: string;
  darkSelector: string;
  format: ColorFormat;
}): string {
  const { styleTarget: T, darkSelector, format } = options;

  const darkSel =
    darkSelector === 'class' || darkSelector === 'media' ? DARK_SELECTOR[darkSelector as DarkSelector] : darkSelector;

  let css = '';

  // ── base colors ──────────────────────────────────────────────────
  const basePresets = builtinBasePreset as Record<
    string,
    { light: Record<string, string>; dark: Record<string, string> }
  >;
  const baseKeys = Object.keys(basePresets);
  const defaultBase = baseKeys[0];

  // Default (no data attribute)
  css += colorPresetToCSS(basePresets[defaultBase], T, darkSel, format);

  for (const key of baseKeys) {
    if (key === defaultBase) continue;
    const preset = basePresets[key];
    const lightCss = colorKeysToCSS(preset.light, format);
    const darkCss = colorKeysToCSS(preset.dark, format);
    css += `\n\n${T}[data-base="${key}"] {\n${lightCss}\n}`;
    css += `\n\n${darkSel} ${T}[data-base="${key}"] {\n${darkCss}\n}`;
  }

  // ── primary colors ───────────────────────────────────────────────
  const primaryPresets = builtinPrimaryPreset as Record<
    string,
    { light: Record<string, string>; dark: Record<string, string> }
  >;
  const primaryKeys = Object.keys(primaryPresets);
  const defaultPrimary = primaryKeys[0];

  // Default primary palette + chart
  css += `\n\n${T} {\n${colorKeysToCSS(primaryPresets[defaultPrimary].light, format)}\n}`;
  css += `\n\n${darkSel} {\n${colorKeysToCSS(primaryPresets[defaultPrimary].dark, format)}\n}`;
  css += `\n\n${T} {\n${colorPaletteToCSS(primaryPresets[defaultPrimary].light, 'primary', format)}\n}`;
  css += `\n\n${darkSel} {\n${colorPaletteToCSS(primaryPresets[defaultPrimary].dark, 'primary', format)}\n}`;

  for (const key of primaryKeys) {
    if (key === defaultPrimary) continue;
    const preset = primaryPresets[key];
    css += `\n\n${T}[data-primary="${key}"] {\n${colorKeysToCSS(preset.light, format)}\n}`;
    css += `\n\n${darkSel} ${T}[data-primary="${key}"] {\n${colorKeysToCSS(preset.dark, format)}\n}`;
    css += `\n\n${T}[data-primary="${key}"] {\n${colorPaletteToCSS(preset.light, 'primary', format)}\n}`;
    css += `\n\n${darkSel} ${T}[data-primary="${key}"] {\n${colorPaletteToCSS(preset.dark, 'primary', format)}\n}`;
  }

  // ── feedback colors ──────────────────────────────────────────────
  const feedbackPresets = builtinFeedbackPreset as Record<
    string,
    { light: Record<string, string>; dark: Record<string, string> }
  >;
  const feedbackKeys = Object.keys(feedbackPresets);
  const defaultFeedback = feedbackKeys[0];

  css += `\n\n${T} {\n${colorKeysToCSS(feedbackPresets[defaultFeedback].light, format)}\n}`;
  css += `\n\n${darkSel} {\n${colorKeysToCSS(feedbackPresets[defaultFeedback].dark, format)}\n}`;

  for (const key of feedbackKeys) {
    if (key === defaultFeedback) continue;
    const preset = feedbackPresets[key];
    css += `\n\n${T}[data-feedback="${key}"] {\n${colorKeysToCSS(preset.light, format)}\n}`;
    css += `\n\n${darkSel} ${T}[data-feedback="${key}"] {\n${colorKeysToCSS(preset.dark, format)}\n}`;
  }

  // ── sidebar colors (base × primary combinations) ────────────────
  for (const baseKey of baseKeys) {
    for (const primaryKey of primaryKeys) {
      const baseLight = basePresets[baseKey].light;
      const baseDark = basePresets[baseKey].dark;
      const primaryLight = primaryPresets[primaryKey].light;
      const primaryDark = primaryPresets[primaryKey].dark;

      const selLight = `${T}[data-base="${baseKey}"][data-primary="${primaryKey}"]`;
      const selDark = `${darkSel} ${T}[data-base="${baseKey}"][data-primary="${primaryKey}"]`;

      const sidebarLight = buildSidebarColors(baseLight, primaryLight);
      const sidebarDark = buildSidebarColors(baseDark, primaryDark);

      if (baseKey === defaultBase && primaryKey === defaultPrimary) {
        css += `\n\n${T} {\n${colorKeysToCSS(sidebarLight, format)}\n}`;
        css += `\n\n${darkSel} {\n${colorKeysToCSS(sidebarDark, format)}\n}`;
      } else {
        css += `\n\n${selLight} {\n${colorKeysToCSS(sidebarLight, format)}\n}`;
        css += `\n\n${selDark} {\n${colorKeysToCSS(sidebarDark, format)}\n}`;
      }
    }
  }

  return css;
}

/**
 * Generate radius CSS for ALL built-in radius values using [data-radius] selectors.
 */
export function generateAllRadiusCSSVariable(styleTarget: string = ':root'): string {
  const entries = Object.entries(THEME_RADIUS) as [string, string][];
  const defaultRadius = entries[0][0];

  let css = '';

  for (const [key, value] of entries) {
    const sel = key === defaultRadius ? styleTarget : `${styleTarget}[data-radius="${key}"]`;
    css += `\n${sel} {\n${RADIUS_VARIABLE}: ${value};\n}`;
  }

  return css;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function colorPresetToCSS(
  preset: { light: Record<string, string>; dark: Record<string, string> },
  T: string,
  darkSel: string,
  format: ColorFormat
): string {
  const lightCss = colorKeysToCSS(preset.light, format);
  const darkCss = colorKeysToCSS(preset.dark, format);
  // Base presets include palette colors for destructive/success/warning/info/carbon
  const lightPalette = colorPalettesToCSS(preset.light, format);
  const darkPalette = colorPalettesToCSS(preset.dark, format);
  return `\n${T} {\n${lightCss}\n${lightPalette}\n\n\n${darkSel} {\n${darkCss}\n${darkPalette}\n}`;
}

function colorKeysToCSS(colors: Record<string, string>, format: ColorFormat): string {
  let css = '';
  for (const [key, varName] of Object.entries(COLOR_VARIABLES)) {
    const value = colors[key];
    if (!value) continue;
    css += getItemColorCSS(key, varName, value, format);
  }
  return css;
}

function getItemColorCSS(key: string, varName: string, value: string, format: ColorFormat): string {
  let color = getColorValue(value as ColorValue, format);
  if (format === 'hsl') {
    color = removeHslBrackets(color);
  }
  const { color: c, alphaCss } = getAlphaCSSVariables(color, format, key);
  return `${varName}: ${c};\n${alphaCss}`;
}

function colorPaletteToCSS(colors: Record<string, string>, paletteKey: string, format: ColorFormat): string {
  let css = '';
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  for (const level of levels) {
    const key = `${paletteKey}${level}`;
    const value = colors[key];
    if (!value) continue;
    let color = getColorValue(value as ColorValue, format);
    if (format === 'hsl') color = removeHslBrackets(color);
    css += `--${paletteKey}-${level}: ${color};\n`;
  }
  return css;
}

function colorPalettesToCSS(colors: Record<string, string>, format: ColorFormat): string {
  let css = '';
  for (const paletteKey of ['destructive', 'success', 'warning', 'info', 'carbon']) {
    css += colorPaletteToCSS(colors, paletteKey, format);
  }
  return css;
}

function buildSidebarColors(base: Record<string, string>, primary: Record<string, string>) {
  return {
    sidebar: base.background ?? '',
    sidebarForeground: base.foreground ?? '',
    sidebarPrimary: primary.primary ?? '',
    sidebarPrimaryForeground: primary.primaryForeground ?? '',
    sidebarAccent: base.accent ?? '',
    sidebarAccentForeground: base.accentForeground ?? '',
    sidebarBorder: base.border ?? '',
    sidebarRing: primary.ring ?? ''
  };
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
