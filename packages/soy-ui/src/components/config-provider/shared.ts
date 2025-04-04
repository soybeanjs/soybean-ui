import type { ThemeOptions } from '@soybean-ui/unocss-preset';

export const DEFAULT_THEME: ThemeOptions = { color: 'default', radius: 0.5, darkSelector: '.dark' };

export function isIncludeByDefaultTheme(theme: ThemeOptions) {
  const keys = Object.keys(theme) as (keyof ThemeOptions)[];

  return keys.every(key => theme[key] === DEFAULT_THEME[key]);
}

export function getThemeName(color: ThemeOptions['color']) {
  let themeName = 'default';

  if (typeof color === 'string') {
    themeName = color;
  }

  if (typeof color === 'object') {
    if ('base' in color) {
      themeName = color.base || color.name;
    } else {
      themeName = color.name;
    }
  }

  return themeName;
}
