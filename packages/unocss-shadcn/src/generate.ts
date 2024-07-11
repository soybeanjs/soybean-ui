import { mergeDeep } from '@unocss/core';
import themes from './theme.json';
import type {
  ColorOptions,
  PresetShadcnOptions,
  ThemeCSSVarKey,
  ThemeCSSVars,
  ThemeCSSVarsVariant,
  ThemeConfig
} from './types';

const themeCSSVarKeys: ThemeCSSVarKey[] = [
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
  'border',
  'input',
  'ring'
];

function getColorCSSVars(color: ThemeCSSVars) {
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

export function generateCSSVars(theme: PresetShadcnOptions, onlyOne = true): string {
  if (Array.isArray(theme)) return theme.map(t => generateCSSVars(t, false)).join('\n');

  const { color = 'zinc', radius = 0.5, darkSelector = '.dark' } = theme;

  let cssStyle = '';

  if (!color) {
    if (radius) {
      cssStyle += getRadiusCSSVarsStyles(radius);
    }
  } else {
    const { light, dark, name } = getColorTheme(color);
    const lightVars = getColorCSSVars(light);
    const darkVars = getColorCSSVars(dark);

    cssStyle += getColorCSSVarsStyles(lightVars, darkVars, { radius, themeName: !onlyOne && name, darkSelector });
  }

  return cssStyle;
}
