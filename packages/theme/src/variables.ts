import type { ColorKey, DarkSelector, ThemeColor } from './types';

export const SIZE_VARIABLE = '--size';

export const RADIUS_VARIABLE = '--radius';

/**
 * CSS custom property name for every color token
 */
export const COLOR_VARIABLES = {
  // base colors
  background: '--background',
  foreground: '--foreground',
  card: '--card',
  cardForeground: '--card-foreground',
  popover: '--popover',
  popoverForeground: '--popover-foreground',
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  accent: '--accent',
  accentForeground: '--accent-foreground',
  destructive: '--destructive',
  destructiveForeground: '--destructive-foreground',
  border: '--border',
  input: '--input',
  ring: '--ring',

  // extended colors
  success: '--success',
  successForeground: '--success-foreground',
  warning: '--warning',
  warningForeground: '--warning-foreground',
  info: '--info',
  infoForeground: '--info-foreground',
  carbon: '--carbon',
  carbonForeground: '--carbon-foreground',

  // sidebar colors
  sidebar: '--sidebar',
  sidebarForeground: '--sidebar-foreground',
  sidebarPrimary: '--sidebar-primary',
  sidebarPrimaryForeground: '--sidebar-primary-foreground',
  sidebarAccent: '--sidebar-accent',
  sidebarAccentForeground: '--sidebar-accent-foreground',
  sidebarBorder: '--sidebar-border',
  sidebarRing: '--sidebar-ring',

  // chart colors
  chart1: '--chart-1',
  chart2: '--chart-2',
  chart3: '--chart-3',
  chart4: '--chart-4',
  chart5: '--chart-5'
} as const satisfies Record<ColorKey, string>;

/**
 * the theme colors whose 10-level ramp is emitted as `--{key}-{level}`.
 *
 * Every other color token carries a single value and has no ramp.
 */
export const PALETTE_COLOR_KEYS = [
  'primary',
  'destructive',
  'success',
  'warning',
  'info',
  'carbon'
] as const satisfies readonly ThemeColor[];

/**
 * derived alpha variables for tokens that carry a translucent alpha channel
 */
export const EXTENDED_THEME_VARIABLES = {
  borderAlpha: '--border-alpha',
  inputAlpha: '--input-alpha',
  sidebarBorderAlpha: '--sidebar-border-alpha'
} as const;

/**
 * the alpha-bearing color tokens, mapped to the derived variable exposing their
 * alpha channel (see {@link EXTENDED_THEME_VARIABLES}). Tokens absent from this
 * map have no alpha variable.
 */
export const ALPHA_COLOR_VARIABLES: Partial<Record<ColorKey, string>> = {
  border: EXTENDED_THEME_VARIABLES.borderAlpha,
  input: EXTENDED_THEME_VARIABLES.inputAlpha,
  sidebarBorder: EXTENDED_THEME_VARIABLES.sidebarBorderAlpha
};

/**
 * dark mode selectors
 */
export const DARK_SELECTOR = {
  class: '.dark',
  media: '@media (prefers-color-scheme: dark)'
} as const satisfies Record<DarkSelector, string>;
