import type { ThemeColorKey, DarkSelector } from './types';

export const SIZE_VARIABLE = '--size';

export const RADIUS_VARIABLE = '--radius';

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
} as const satisfies Record<ThemeColorKey, string>;

export const EXTENDED_THEME_VARIABLES = {
  borderAlpha: '--border-alpha',
  inputAlpha: '--input-alpha',
  sidebarBorderAlpha: '--sidebar-border-alpha'
} as const;

export const MENU_VARIABLES = {
  bg: '--menu-bg',
  bgAlpha: '--menu-bg-alpha',
  dropBlur: '--menu-drop-blur',
  backdropSaturate: '--menu-backdrop-saturate',
  itemAccentBackground: '--menu-item-accent-background',
  itemAccentForeground: '--menu-item-accent-foreground'
} as const;

/**
 * dark mode selectors
 */
export const DARK_SELECTOR = {
  class: '.dark',
  media: '@media (prefers-color-scheme: dark)'
} as const satisfies Record<DarkSelector, string>;
