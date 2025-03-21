import type { ThemeOptions } from '@soybean-ui/unocss-preset';

export const DEFAULT_THEME: ThemeOptions = { color: 'default', radius: 0.5, darkSelector: '.dark' };

export function getThemeOptionStr(theme: ThemeOptions) {
  const sortedKeys: (keyof ThemeOptions)[] = ['color', 'radius', 'darkSelector', 'feedbackColor'];

  const keys = Object.keys(theme).sort(
    (a, b) => sortedKeys.indexOf(a as keyof ThemeOptions) - sortedKeys.indexOf(b as keyof ThemeOptions)
  );

  return keys.reduce((acc, _key) => {
    const key = _key as keyof ThemeOptions;

    if (theme[key] !== null && theme[key] !== undefined) {
      return `${acc}-${theme[key]}`;
    }

    return acc;
  }, '');
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
