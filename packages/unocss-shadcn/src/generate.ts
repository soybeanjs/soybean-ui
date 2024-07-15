import { mergeDeep } from '@unocss/core';
import { colord, generateColorPalette } from '@soybean-unify/color';
import themes from './theme.json';
import type {
  ColorOptions,
  FeedbackColorOfThemeCssVarKey,
  FeedbackColorOfThemeCssVars,
  FeedbackColorOfThemeCssVarsVariant,
  PresetShadcnOptions,
  ThemeCSSVarKey,
  ThemeCSSVars,
  ThemeCSSVarsVariant,
  ThemeConfig
} from './types';

type CSSVarKey = ThemeCSSVarKey | FeedbackColorOfThemeCssVarKey;

const themeCSSVarKeys: CSSVarKey[] = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'info',
  'info-foreground',
  'border',
  'input',
  'ring'
];

const themeColorKeys: CSSVarKey[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info'];

function getColorCSSVars(color: ThemeCSSVars & FeedbackColorOfThemeCssVars) {
  const cssVars = Object.entries(color)
    .map(([item, value]) => {
      const key = item as CSSVarKey;

      if (!themeCSSVarKeys.includes(key)) {
        return '';
      }

      let css = `  --${key}: ${value};`;

      if (themeColorKeys.includes(key)) {
        const hsl = `hsl(${value.split(' ').join(', ')})`;

        const colorPalette = generateColorPalette(hsl);

        for (const [num, hex] of Object.entries(colorPalette)) {
          const { h, s, l } = colord(hex).toHsl();

          css += `\n  --${key}-${num}: ${h} ${s}% ${l}%;`;
        }
      }

      return css;
    })
    .filter(Boolean)
    .join('\n');

  return cssVars;
}

interface ColorCSSVarsStylesOptions {
  darkSelector: string;
  radius?: number | false;
  themeName?: string | false;
}

function getColorCSSVarsStyles(lightVars: string, darkVars: string, options: ColorCSSVarsStylesOptions) {
  const { darkSelector, radius, themeName } = options;

  const themeSelector = themeName ? `.theme-${themeName}` : ':root';
  const radiusCSS = radius ? getRadiusCSSVars(radius) : '';
  const darkThemeSelector = themeName ? `${darkSelector} .theme-${themeName}` : darkSelector;

  return `
${themeSelector} {
${lightVars}
${radiusCSS}
}
${darkThemeSelector} {
${darkVars}
}`;
}

function getRadiusCSSVars(radius: number) {
  return `  --radius: ${radius}rem;`;
}

function getRadiusCSSVarsStyles(radius: number) {
  const radiusCSS = getRadiusCSSVars(radius);

  return `
:root {
${radiusCSS}
}
`;
}

export function generateGlobalStyles() {
  return `
* {
  border-color: hsl(var(--border));
}

body {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
}
`;
}

function getBuiltInTheme(name: string): ThemeCSSVarsVariant {
  const theme = (themes as ThemeConfig[]).find(t => t.name === name);

  if (!theme) {
    throw new Error(`Unknown color: ${name}`);
  }

  return {
    name,
    ...theme.cssVars
  };
}

function getColorTheme(color: ColorOptions): ThemeCSSVarsVariant {
  let light: ThemeCSSVars;
  let dark: ThemeCSSVars;
  let name: string;

  if (typeof color === 'string') {
    name = color;
    ({ light, dark } = getBuiltInTheme(color));
  } else if ('base' in color) {
    name = color.base;
    ({ light, dark } = mergeDeep(getBuiltInTheme(color.base), color));
  } else {
    name = color.name;
    ({ light, dark } = color);
  }
  return { light, dark, name };
}

function createBuiltinFeedbackColorTheme() {
  const feedbackColor: FeedbackColorOfThemeCssVarsVariant = {
    light: {
      success: '140 79% 45%',
      'success-foreground': '0 0% 100%',
      warning: '37 91% 55%',
      'warning-foreground': '0 0% 100%',
      info: '207 90% 61%',
      'info-foreground': '0 0% 100%'
    },
    dark: {
      success: '157 79% 17%',
      'success-foreground': '0 0% 100%',
      warning: '25 91% 35%',
      'warning-foreground': '0 0% 100%',
      info: '212 75% 18%',
      'info-foreground': '0 0% 100%'
    }
  };

  return feedbackColor;
}

export function generateCSSVars(theme: PresetShadcnOptions, onlyOne = true): string {
  if (Array.isArray(theme)) {
    return theme.map(t => generateCSSVars(t, false)).join('\n');
  }

  const {
    color = 'default',
    radius = 0.5,
    darkSelector = '.dark',
    feedbackColor = createBuiltinFeedbackColorTheme()
  } = theme;

  let cssStyle = '';

  if (!color) {
    if (radius) {
      cssStyle += getRadiusCSSVarsStyles(radius);
    }
  } else {
    const { light, dark, name } = getColorTheme(color);
    const lightVars = getColorCSSVars({ ...light, ...feedbackColor.light });
    const darkVars = getColorCSSVars({ ...dark, ...feedbackColor.dark });

    cssStyle += getColorCSSVarsStyles(lightVars, darkVars, { radius, themeName: !onlyOne && name, darkSelector });
  }

  return cssStyle;
}
