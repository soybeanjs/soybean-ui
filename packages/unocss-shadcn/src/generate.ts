import { mergeDeep } from '@unocss/core';
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

const themeCSSVarKeys: (ThemeCSSVarKey | FeedbackColorOfThemeCssVarKey)[] = [
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

function getColorCSSVars(color: ThemeCSSVars & FeedbackColorOfThemeCssVars) {
  const cssVars = Object.entries(color)
    .map(([key, value]) => {
      if (!themeCSSVarKeys.includes(key as ThemeCSSVarKey)) {
        return '';
      }

      return `  --${key}: ${value};`;
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

function getColorTheme(color: ColorOptions) {
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
      success: '146 85% 56%',
      'success-foreground': '146 85% 16%',
      warning: '42 85% 56%',
      'warning-foreground': '42 85% 16%',
      info: '214 85% 56%',
      'info-foreground': '0 0% 100%'
    },
    dark: {
      success: '156 85% 19%',
      'success-foreground': '156 85% 79%',
      warning: '20 85% 19%',
      'warning-foreground': '20 85% 79%',
      info: '236 85% 19%',
      'info-foreground': '236 85% 79%'
    }
  };

  return feedbackColor;
}

export function generateCSSVars(theme: PresetShadcnOptions, onlyOne = true): string {
  if (Array.isArray(theme)) {
    return theme.map(t => generateCSSVars(t, false)).join('\n');
  }

  const {
    color = 'zinc',
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
