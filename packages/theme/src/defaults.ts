/**
 * engine-wide defaults.
 *
 * `base`/`primary`/`styleTarget`/`darkSelector`/`format` drive the outermost
 * `createTheme` options; `size`/`radius`/`menuColor`/`menuAccent` are the
 * resolved base tokens of a `FullThemePreset` when no preset overrides them.
 */
export const DEFAULT_PRESET_OPTIONS = {
  size: 'md',
  radius: 'md',
  menuColor: 'default',
  menuAccent: 'subtle',
  base: 'zinc',
  primary: 'indigo',
  styleTarget: ':root',
  darkSelector: 'class',
  format: 'hsl',
  lightLevel: 0,
  darkLevel: 0,
  sidebarDerive: true
} as const;
