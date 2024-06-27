import type { Preflight, Preset } from '@unocss/core';
import type { Theme } from '@unocss/preset-uno';
import { colord } from 'colord';
import { type ColorPaletteNumber, getColorPalette } from './shared';

const colorPaletteNumbers: ColorPaletteNumber[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function getCssVarByColorKey(colorKey: string) {
  return `--${colorKey.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
}

function getThemeColors(colorKey: string) {
  const cssVarKey = getCssVarByColorKey(colorKey);

  const colors = {
    [colorKey]: {
      DEFAULT: `hsl(var(${cssVarKey}))`
    } as NonNullable<Theme['colors']>
  } satisfies Theme['colors'];

  colorPaletteNumbers.forEach(num => {
    colors[colorKey][num] = `hsl(var(${cssVarKey}-${num}))`;
  });

  return colors;
}

function getCssVarsByColor(color: string, colorKey: string) {
  const c = colord(color);

  if (!c.isValid()) {
    return {};
  }

  const cssVarKey = getCssVarByColorKey(colorKey);

  const colorPalette = getColorPalette(color);

  const mainHsl = colord(colorPalette[500]).toHsl();

  const css: Record<string, string> = {
    [cssVarKey]: `${mainHsl.h} ${mainHsl.s}% ${mainHsl.l}%`
  };

  Object.entries(colorPalette).forEach(([num, v]) => {
    const hsl = colord(v).toHsl();

    css[`${cssVarKey}-${num}`] = `${hsl.h} ${hsl.s}% ${hsl.l}%`;
  });

  return css;
}

function getCssVarsStringByColor(color: string, colorKey: string) {
  const css = getCssVarsByColor(color, colorKey);

  return transformCssVarsToString(css);
}

function transformCssVarsToString(cssVars: Record<string, string>) {
  return Object.entries(cssVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
}

function createThemeColorCssVars(themeColorKey: string, activeColorKey: string) {
  const themeColorCssVarKey = getCssVarByColorKey(themeColorKey);
  const activeColorCssVarKey = getCssVarByColorKey(activeColorKey);

  const css: Record<string, string> = {
    [themeColorCssVarKey]: `var(${activeColorCssVarKey})`
  };

  colorPaletteNumbers.forEach(num => {
    css[`${themeColorCssVarKey}-${num}`] = `var(${activeColorCssVarKey}-${num})`;
  });

  return css;
}

function createThemeColorPreflights<T extends Record<string, string>>(
  colors: T,
  themeColorKey: string,
  activeColorKey: keyof T
) {
  const cssVars = createThemeColorCssVars(themeColorKey, activeColorKey as string);

  let css = transformCssVarsToString(cssVars);

  const preflights: Preflight[] = [
    {
      getCSS: () => `
      :root {
        ${css}
      }
      `
    }
  ];

  Object.keys(colors).forEach(colorKey => {
    css += getCssVarsStringByColor(colors[colorKey], colorKey);
  });

  return preflights;
}

export function presetSoybeanUnify(): Preset<Theme> {
  const colors = {} satisfies Theme['colors'];

  const themeColors = {
    primary: '#646cff',
    info: '#4096ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  };

  const THEME_COLOR_KEY = 'themeColor';

  const themeColorKeys = Object.keys(themeColors);

  const colorKeys = [THEME_COLOR_KEY, ...themeColorKeys];

  colorKeys.forEach(colorKey => {
    Object.assign(colors, getThemeColors(colorKey));
  });

  return {
    name: 'unocss-preset-soybean-unify',
    theme: {
      colors
    },
    preflights: createThemeColorPreflights(themeColors, THEME_COLOR_KEY, 'primary'),
    rules: [
      [
        new RegExp(`^theme-(${themeColorKeys.join('|')})$`),
        ([_, color]) => createThemeColorCssVars(THEME_COLOR_KEY, color)
      ]
    ]
  };
}
