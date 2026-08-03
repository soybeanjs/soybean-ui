import type { CustomThemeColorPreset } from '@soybeanjs/theme';

export const themeSoybean = {
  light: {
    primary: 'green.600',
    ring: 'green.400',
    chart1: 'green.600',
    chart2: 'teal.500',
    chart3: 'amber.500',
    chart4: 'sky.500',
    chart5: 'violet.500'
  },
  dark: {
    primary: 'green.400',
    ring: 'green.600',
    chart1: 'green.400',
    chart2: 'teal.300',
    chart3: 'amber.300',
    chart4: 'sky.300',
    chart5: 'violet.300'
  }
} as const satisfies CustomThemeColorPreset;
