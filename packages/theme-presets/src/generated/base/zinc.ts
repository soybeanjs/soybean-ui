import type { CustomThemeColorPreset } from '@soybeanjs/theme';

export const baseZinc = {
  light: {
    background: 'white',
    foreground: 'zinc.950',
    card: 'white',
    cardForeground: 'zinc.950',
    popover: 'white',
    popoverForeground: 'zinc.950',
    muted: 'zinc.100',
    mutedForeground: 'zinc.500',
    accent: 'zinc.100',
    accentForeground: 'zinc.900'
  },
  dark: {
    background: 'zinc.950',
    foreground: 'zinc.50',
    card: 'zinc.900',
    cardForeground: 'zinc.50',
    popover: 'zinc.900',
    popoverForeground: 'zinc.50',
    muted: 'zinc.800',
    mutedForeground: 'zinc.400',
    accent: 'zinc.800',
    accentForeground: 'zinc.50'
  }
} as const satisfies CustomThemeColorPreset;
