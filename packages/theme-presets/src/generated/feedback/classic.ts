import type { CustomThemeColorPreset } from '@soybeanjs/theme';

export const feedbackClassic = {
  light: {
    destructive: 'red.500',
    success: 'green.500',
    warning: 'amber.500',
    info: 'blue.500'
  },
  dark: {
    destructive: 'red.400',
    success: 'green.400',
    warning: 'amber.400',
    info: 'blue.400'
  }
} as const satisfies CustomThemeColorPreset;
