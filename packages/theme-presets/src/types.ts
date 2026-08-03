import type { BuiltinBasePresetKey, CustomThemeColorPreset } from '@soybeanjs/theme';

export type { BuiltinBasePresetKey, CustomThemeColorPreset };

/**
 * runtime key list of the theme color contract (mirrors the engine's
 * `ThemeColorKey`; kept as data so schema validation can enumerate keys)
 */
export const THEME_COLOR_KEYS = [
  // base colors
  'background',
  'foreground',
  'card',
  'cardForeground',
  'popover',
  'popoverForeground',
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'muted',
  'mutedForeground',
  'accent',
  'accentForeground',
  'destructive',
  'destructiveForeground',
  'border',
  'input',
  'ring',

  // extended colors
  'success',
  'successForeground',
  'warning',
  'warningForeground',
  'info',
  'infoForeground',
  'carbon',
  'carbonForeground',

  // sidebar colors
  'sidebar',
  'sidebarForeground',
  'sidebarPrimary',
  'sidebarPrimaryForeground',
  'sidebarAccent',
  'sidebarAccentForeground',
  'sidebarBorder',
  'sidebarRing',

  // chart colors
  'chart1',
  'chart2',
  'chart3',
  'chart4',
  'chart5'
] as const;

/**
 * preset dimensions — classification only, never constrains token keys
 */
export const DIMENSIONS = ['base', 'feedback', 'chart', 'theme'] as const;

export type Dimension = (typeof DIMENSIONS)[number];
