import type { ChartSchemeKey, FeedbackSchemeKey, PaletteKey, ThemeRadius, ThemeSize, ThemeOptions } from './types';

/**
 * Engine defaults and the base-token tables (docs/theme.md §4.9).
 */

/** Size preset → root font-size in pixels. */
export const THEME_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24
} as const satisfies Record<ThemeSize, number>;

/** Radius preset → CSS length seed. */
export const THEME_RADIUS = {
  '2xs': '0.25rem',
  xs: '0.375rem',
  sm: '0.5rem',
  md: '0.625rem',
  lg: '0.75rem',
  xl: '0.875rem',
  '2xl': '1rem'
} as const satisfies Record<ThemeRadius, string>;

/** the built-in feedback (status) schemes. */
export const DEFAULT_FEEDBACK_SCHEME: FeedbackSchemeKey = 'classic';

/** the built-in chart (data visualisation) schemes. */
export const DEFAULT_CHART_SCHEME: ChartSchemeKey = 'vivid';

/** the built-in dark selector shorthands. */
export const DARK_SELECTOR = {
  class: '.dark',
  media: '@media (prefers-color-scheme: dark)'
} as const;

/** the size preset keys, in slider order. */
export const themeSizeKeys = Object.keys(THEME_SIZE) as ThemeSize[];

/** the radius preset keys, in slider order. */
export const themeRadiusKeys = Object.keys(THEME_RADIUS) as ThemeRadius[];

/** every engine default in one place. */
export const DEFAULT_OPTIONS = {
  base: 'zinc' as PaletteKey,
  primary: 'indigo' as PaletteKey,
  feedback: DEFAULT_FEEDBACK_SCHEME,
  chart: DEFAULT_CHART_SCHEME,
  lightLevel: 0,
  darkLevel: 0,
  surfaceStyle: 'layered',
  contrast: 'aa',
  solidVars: 'none',
  prefix: 'vean',
  size: 'md',
  radius: 'md',
  borderOpacity: 1,
  format: 'hsl',
  styleTarget: ':root',
  darkSelector: 'class'
} as const satisfies ThemeOptions;
