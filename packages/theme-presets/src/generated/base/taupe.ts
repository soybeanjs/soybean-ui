import type { CustomThemeColorPreset } from '@soybeanjs/theme';

export const baseTaupe = {
  light: {
    background: 'white',
    foreground: 'taupe.950',
    card: 'white',
    cardForeground: 'taupe.950',
    popover: 'white',
    popoverForeground: 'taupe.950',
    muted: 'taupe.100',
    mutedForeground: 'taupe.500',
    accent: 'taupe.100',
    accentForeground: 'taupe.900'
  },
  dark: {
    background: 'taupe.950',
    foreground: 'taupe.50',
    card: 'taupe.900',
    cardForeground: 'taupe.50',
    popover: 'taupe.900',
    popoverForeground: 'taupe.50',
    muted: 'taupe.800',
    mutedForeground: 'taupe.400',
    accent: 'taupe.800',
    accentForeground: 'taupe.50'
  }
} as const satisfies CustomThemeColorPreset;
