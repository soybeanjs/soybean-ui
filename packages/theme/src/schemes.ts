import type { ChartToken, FeedbackSchemeKey, PaletteKey, PaletteLevel, StatusName } from './types';

/**
 * Scheme data (docs/theme.md §4.6, §4.7).
 *
 * A scheme is plain data: `palette.level` references for the light and dark
 * mode. Keeping schemes as data (not code) is what lets the region/status/chart
 * dimensions stay swappable without touching the engine.
 */

/** a status scheme: the solid color of each status, per mode. */
export interface FeedbackScheme {
  light: Record<StatusName, string>;
  dark: Record<StatusName, string>;
}

/** a chart scheme: five series colors, per mode. */
export interface ChartScheme {
  light: Record<ChartToken, string>;
  dark: Record<ChartToken, string>;
}

/** the built-in status schemes. */
export const FEEDBACK_SCHEMES = {
  classic: {
    light: { destructive: 'red.500', success: 'green.500', warning: 'amber.500', info: 'blue.500' },
    dark: { destructive: 'red.400', success: 'green.400', warning: 'amber.400', info: 'blue.400' }
  },
  vivid: {
    light: { destructive: 'red.500', success: 'emerald.500', warning: 'amber.500', info: 'sky.500' },
    dark: { destructive: 'red.400', success: 'emerald.400', warning: 'amber.400', info: 'sky.400' }
  },
  subtle: {
    light: { destructive: 'rose.500', success: 'emerald.500', warning: 'amber.500', info: 'indigo.500' },
    dark: { destructive: 'rose.300', success: 'emerald.300', warning: 'amber.300', info: 'indigo.300' }
  },
  modern: {
    light: { destructive: 'red.500', success: 'emerald.500', warning: 'orange.500', info: 'sky.500' },
    dark: { destructive: 'red.400', success: 'emerald.400', warning: 'orange.400', info: 'sky.400' }
  },
  professional: {
    light: { destructive: 'red.500', success: 'green.600', warning: 'amber.600', info: 'blue.600' },
    dark: { destructive: 'red.300', success: 'green.300', warning: 'amber.300', info: 'blue.300' }
  }
} as const satisfies Record<string, FeedbackScheme>;

/** the built-in chart schemes. */
export const CHART_SCHEMES = {
  vivid: {
    light: {
      'chart-1': 'orange.600',
      'chart-2': 'teal.600',
      'chart-3': 'cyan.900',
      'chart-4': 'amber.400',
      'chart-5': 'amber.500'
    },
    dark: {
      'chart-1': 'blue.700',
      'chart-2': 'emerald.500',
      'chart-3': 'amber.500',
      'chart-4': 'purple.500',
      'chart-5': 'rose.500'
    }
  },
  cool: {
    light: {
      'chart-1': 'blue.700',
      'chart-2': 'cyan.600',
      'chart-3': 'sky.500',
      'chart-4': 'indigo.500',
      'chart-5': 'violet.500'
    },
    dark: {
      'chart-1': 'sky.300',
      'chart-2': 'cyan.300',
      'chart-3': 'blue.300',
      'chart-4': 'indigo.300',
      'chart-5': 'violet.300'
    }
  },
  warm: {
    light: {
      'chart-1': 'orange.600',
      'chart-2': 'amber.500',
      'chart-3': 'rose.500',
      'chart-4': 'red.600',
      'chart-5': 'orange.400'
    },
    dark: {
      'chart-1': 'orange.300',
      'chart-2': 'amber.300',
      'chart-3': 'rose.300',
      'chart-4': 'red.300',
      'chart-5': 'orange.200'
    }
  },
  natural: {
    light: {
      'chart-1': 'green.600',
      'chart-2': 'emerald.500',
      'chart-3': 'teal.600',
      'chart-4': 'lime.500',
      'chart-5': 'cyan.600'
    },
    dark: {
      'chart-1': 'green.300',
      'chart-2': 'emerald.300',
      'chart-3': 'teal.300',
      'chart-4': 'lime.300',
      'chart-5': 'cyan.300'
    }
  },
  minimal: {
    light: {
      'chart-1': 'slate.500',
      'chart-2': 'blue.400',
      'chart-3': 'emerald.400',
      'chart-4': 'amber.400',
      'chart-5': 'rose.400'
    },
    dark: {
      'chart-1': 'slate.300',
      'chart-2': 'blue.300',
      'chart-3': 'emerald.300',
      'chart-4': 'amber.300',
      'chart-5': 'rose.300'
    }
  }
} as const satisfies Record<string, ChartScheme>;

/** the built-in scheme keys, for pickers and validation. */
export const FEEDBACK_SCHEME_KEYS = Object.keys(FEEDBACK_SCHEMES);
export const CHART_SCHEME_KEYS = Object.keys(CHART_SCHEMES);

/** resolve a feedback scheme, falling back to the default. */
export function feedbackScheme(key: FeedbackSchemeKey | undefined): FeedbackScheme {
  return (FEEDBACK_SCHEMES as Record<string, FeedbackScheme>)[key ?? 'classic'] ?? FEEDBACK_SCHEMES.classic;
}

/** resolve a chart scheme, falling back to the default. */
export function chartScheme(key: string | undefined): ChartScheme {
  return (CHART_SCHEMES as Record<string, ChartScheme>)[key ?? 'vivid'] ?? CHART_SCHEMES.vivid;
}

/** split a `palette.level` reference. */
export function splitLevelRef(ref: string): { palette: PaletteKey; level: PaletteLevel } {
  const [palette, level] = ref.split('.');

  return { palette: palette as PaletteKey, level: Number(level) as PaletteLevel };
}
