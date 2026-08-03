import type { CustomThemeColorPreset } from '@soybeanjs/theme';

export const chartDefault = {
  light: {
    chart1: 'orange.600',
    chart2: 'teal.600',
    chart3: 'cyan.900',
    chart4: 'amber.400',
    chart5: 'amber.500'
  },
  dark: {
    chart1: 'blue.700',
    chart2: 'emerald.500',
    chart3: 'amber.500',
    chart4: 'purple.500',
    chart5: 'rose.500'
  }
} as const satisfies CustomThemeColorPreset;
