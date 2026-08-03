import type { CustomThemeColorPreset } from '@soybeanjs/theme';

export const baseOlive = {
  light: {
    background: 'white',
    foreground: 'olive.950',
    card: 'white',
    cardForeground: 'olive.950',
    popover: 'white',
    popoverForeground: 'olive.950',
    muted: 'olive.100',
    mutedForeground: 'olive.500',
    accent: 'olive.100',
    accentForeground: 'olive.900'
  },
  dark: {
    background: 'olive.950',
    foreground: 'olive.50',
    card: 'olive.900',
    cardForeground: 'olive.50',
    popover: 'olive.900',
    popoverForeground: 'olive.50',
    muted: 'olive.800',
    mutedForeground: 'olive.400',
    accent: 'olive.800',
    accentForeground: 'olive.50'
  }
} as const satisfies CustomThemeColorPreset;
