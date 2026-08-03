import type { RequiredThemeOptions } from './types';

export const DEFAULT_PRESET_OPTIONS = {
  size: 'md',
  radius: 'md',
  base: 'zinc',
  primary: 'indigo',
  menuColor: 'default',
  menuAccent: 'subtle',
  styleTarget: ':root',
  darkSelector: 'class',
  format: 'hsl',
  lightLevel: 0,
  darkLevel: 0
} as const satisfies RequiredThemeOptions;
