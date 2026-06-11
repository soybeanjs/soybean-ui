import { keysOf } from './shared';
import type {
  BuiltinBasePresetKey,
  BuiltinFeedbackPresetKey,
  BuiltinPrimaryPresetKey,
  BasePreset,
  FeedbackPreset,
  PrimaryPreset,
  ThemeColorKey,
  BasePresetColorKey,
  PrimaryPresetColorKey,
  FeedbackPresetColorKey,
  SidebarPresetColorKey,
  DarkSelector,
  OKLCHColor,
  ThemeOptions,
  Radii
} from './types';

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
};

export const DEFAULT_PRESET_OPTIONS = {
  base: 'zinc',
  primary: 'indigo',
  feedback: 'classic',
  sidebar: 'extended',
  radius: 'md'
} as const satisfies ThemeOptions;

/**
 * dark mode selectors
 */
export const DARK_SELECTOR = {
  class: '.dark',
  media: '@media (prefers-color-scheme: dark)'
} as const satisfies Record<DarkSelector, string>;

const DARK_BORDER: OKLCHColor = 'oklch(100% 0 0 / 0.1)';

const DARK_INPUT: OKLCHColor = 'oklch(100% 0 0 / 0.15)';

export const RADII = {
  none: '0px',
  '2xs': '0.25rem',
  xs: '0.375rem',
  sm: '0.5rem',
  md: '0.625rem',
  lg: '0.75rem',
  xl: '0.875rem',
  '2xl': '1rem',
  full: '9999px'
} satisfies Record<Radii, string>;

export const radiiKeys = keysOf(RADII) as ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];

/**
 * builtin base color preset
 */
export const builtinBasePreset: Record<BuiltinBasePresetKey, BasePreset> = {
  slate: {
    light: {
      background: 'white',
      foreground: 'slate.950',
      card: 'white',
      cardForeground: 'slate.950',
      popover: 'white',
      popoverForeground: 'slate.950',
      primaryForeground: 'slate.50',
      secondary: 'slate.100',
      secondaryForeground: 'slate.900',
      muted: 'slate.100',
      mutedForeground: 'slate.500',
      accent: 'slate.100',
      accentForeground: 'slate.900',
      destructiveForeground: 'slate.50',
      successForeground: 'slate.50',
      warningForeground: 'slate.50',
      infoForeground: 'slate.50',
      carbon: 'slate.800',
      carbonForeground: 'slate.50',
      border: 'slate.200',
      input: 'slate.200'
    },
    dark: {
      background: 'slate.950',
      foreground: 'slate.50',
      card: 'slate.900',
      cardForeground: 'slate.50',
      popover: 'slate.900',
      popoverForeground: 'slate.50',
      primaryForeground: 'slate.900',
      secondary: 'slate.800',
      secondaryForeground: 'slate.50',
      muted: 'slate.800',
      mutedForeground: 'slate.400',
      accent: 'slate.800',
      accentForeground: 'slate.50',
      carbon: 'slate.100',
      destructiveForeground: 'slate.900',
      successForeground: 'slate.900',
      warningForeground: 'slate.900',
      infoForeground: 'slate.900',
      carbonForeground: 'slate.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  },
  mist: {
    light: {
      background: 'white',
      foreground: 'mist.950',
      card: 'white',
      cardForeground: 'mist.950',
      popover: 'white',
      popoverForeground: 'mist.950',
      primaryForeground: 'mist.50',
      secondary: 'mist.100',
      secondaryForeground: 'mist.900',
      muted: 'mist.100',
      mutedForeground: 'mist.500',
      accent: 'mist.100',
      accentForeground: 'mist.900',
      destructiveForeground: 'mist.50',
      successForeground: 'mist.50',
      warningForeground: 'mist.50',
      infoForeground: 'mist.50',
      carbon: 'mist.800',
      carbonForeground: 'mist.50',
      border: 'mist.200',
      input: 'mist.200'
    },
    dark: {
      background: 'mist.950',
      foreground: 'mist.50',
      card: 'mist.900',
      cardForeground: 'mist.50',
      popover: 'mist.900',
      popoverForeground: 'mist.50',
      primaryForeground: 'mist.900',
      secondary: 'mist.800',
      secondaryForeground: 'mist.50',
      muted: 'mist.800',
      mutedForeground: 'mist.400',
      accent: 'mist.800',
      accentForeground: 'mist.50',
      carbon: 'mist.100',
      destructiveForeground: 'mist.900',
      successForeground: 'mist.900',
      warningForeground: 'mist.900',
      infoForeground: 'mist.900',
      carbonForeground: 'mist.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  },
  gray: {
    light: {
      background: 'white',
      foreground: 'gray.950',
      card: 'white',
      cardForeground: 'gray.950',
      popover: 'white',
      popoverForeground: 'gray.950',
      primaryForeground: 'gray.50',
      secondary: 'gray.100',
      secondaryForeground: 'gray.900',
      muted: 'gray.100',
      mutedForeground: 'gray.500',
      accent: 'gray.100',
      accentForeground: 'gray.900',
      carbon: 'gray.800',
      destructiveForeground: 'gray.50',
      successForeground: 'gray.50',
      warningForeground: 'gray.50',
      infoForeground: 'gray.50',
      carbonForeground: 'gray.50',
      border: 'gray.200',
      input: 'gray.200'
    },
    dark: {
      background: 'gray.950',
      foreground: 'gray.50',
      card: 'gray.900',
      cardForeground: 'gray.50',
      popover: 'gray.900',
      popoverForeground: 'gray.50',
      primaryForeground: 'gray.900',
      secondary: 'gray.800',
      secondaryForeground: 'gray.50',
      muted: 'gray.800',
      mutedForeground: 'gray.400',
      accent: 'gray.800',
      accentForeground: 'gray.50',
      carbon: 'gray.100',
      destructiveForeground: 'gray.900',
      successForeground: 'gray.900',
      warningForeground: 'gray.900',
      infoForeground: 'gray.900',
      carbonForeground: 'gray.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  },
  zinc: {
    light: {
      background: 'white',
      foreground: 'zinc.950',
      card: 'white',
      cardForeground: 'zinc.950',
      popover: 'white',
      popoverForeground: 'zinc.950',
      primaryForeground: 'zinc.50',
      secondary: 'zinc.100',
      secondaryForeground: 'zinc.900',
      muted: 'zinc.100',
      mutedForeground: 'zinc.500',
      accent: 'zinc.100',
      accentForeground: 'zinc.900',
      destructiveForeground: 'zinc.50',
      successForeground: 'zinc.50',
      warningForeground: 'zinc.50',
      infoForeground: 'zinc.50',
      carbon: 'zinc.800',
      carbonForeground: 'zinc.50',
      border: 'zinc.200',
      input: 'zinc.200'
    },
    dark: {
      background: 'zinc.950',
      foreground: 'zinc.50',
      card: 'zinc.900',
      cardForeground: 'zinc.50',
      popover: 'zinc.900',
      popoverForeground: 'zinc.50',
      primaryForeground: 'zinc.900',
      secondary: 'zinc.800',
      secondaryForeground: 'zinc.50',
      muted: 'zinc.800',
      mutedForeground: 'zinc.400',
      accent: 'zinc.800',
      accentForeground: 'zinc.50',
      destructiveForeground: 'zinc.900',
      successForeground: 'zinc.900',
      warningForeground: 'zinc.900',
      infoForeground: 'zinc.900',
      carbon: 'zinc.100',
      carbonForeground: 'zinc.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  },
  neutral: {
    light: {
      background: 'white',
      foreground: 'neutral.950',
      card: 'white',
      cardForeground: 'neutral.950',
      popover: 'white',
      popoverForeground: 'neutral.950',
      primaryForeground: 'neutral.50',
      secondary: 'neutral.100',
      secondaryForeground: 'neutral.900',
      muted: 'neutral.100',
      mutedForeground: 'neutral.500',
      accent: 'neutral.100',
      accentForeground: 'neutral.900',
      destructiveForeground: 'neutral.50',
      successForeground: 'neutral.50',
      warningForeground: 'neutral.50',
      infoForeground: 'neutral.50',
      carbon: 'neutral.800',
      carbonForeground: 'neutral.50',
      border: 'neutral.200',
      input: 'neutral.200'
    },
    dark: {
      background: 'neutral.950',
      foreground: 'neutral.50',
      card: 'neutral.900',
      cardForeground: 'neutral.50',
      popover: 'neutral.900',
      popoverForeground: 'neutral.50',
      primaryForeground: 'neutral.900',
      secondary: 'neutral.800',
      secondaryForeground: 'neutral.50',
      muted: 'neutral.800',
      mutedForeground: 'neutral.400',
      accent: 'neutral.800',
      accentForeground: 'neutral.50',
      destructiveForeground: 'neutral.900',
      successForeground: 'neutral.900',
      warningForeground: 'neutral.900',
      infoForeground: 'neutral.900',
      carbon: 'neutral.100',
      carbonForeground: 'neutral.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  },
  stone: {
    light: {
      background: 'white',
      foreground: 'stone.950',
      card: 'white',
      cardForeground: 'stone.950',
      popover: 'white',
      popoverForeground: 'stone.950',
      primaryForeground: 'stone.50',
      secondary: 'stone.100',
      secondaryForeground: 'stone.900',
      muted: 'stone.100',
      mutedForeground: 'stone.500',
      accent: 'stone.100',
      accentForeground: 'stone.900',
      destructiveForeground: 'stone.50',
      successForeground: 'stone.50',
      warningForeground: 'stone.50',
      infoForeground: 'stone.50',
      carbon: 'stone.800',
      carbonForeground: 'stone.50',
      border: 'stone.200',
      input: 'stone.200'
    },
    dark: {
      background: 'stone.950',
      foreground: 'stone.50',
      card: 'stone.900',
      cardForeground: 'stone.50',
      popover: 'stone.900',
      popoverForeground: 'stone.50',
      primaryForeground: 'stone.900',
      secondary: 'stone.800',
      secondaryForeground: 'stone.50',
      muted: 'stone.800',
      mutedForeground: 'stone.400',
      accent: 'stone.800',
      accentForeground: 'stone.50',
      destructiveForeground: 'stone.900',
      successForeground: 'stone.900',
      warningForeground: 'stone.900',
      infoForeground: 'stone.900',
      carbon: 'stone.100',
      carbonForeground: 'stone.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  },
  taupe: {
    light: {
      background: 'white',
      foreground: 'taupe.950',
      card: 'white',
      cardForeground: 'taupe.950',
      popover: 'white',
      popoverForeground: 'taupe.950',
      primaryForeground: 'taupe.50',
      secondary: 'taupe.100',
      secondaryForeground: 'taupe.900',
      muted: 'taupe.100',
      mutedForeground: 'taupe.500',
      accent: 'taupe.100',
      accentForeground: 'taupe.900',
      destructiveForeground: 'taupe.50',
      successForeground: 'taupe.50',
      warningForeground: 'taupe.50',
      infoForeground: 'taupe.50',
      carbon: 'taupe.800',
      carbonForeground: 'taupe.50',
      border: 'taupe.200',
      input: 'taupe.200'
    },
    dark: {
      background: 'taupe.950',
      foreground: 'taupe.50',
      card: 'taupe.900',
      cardForeground: 'taupe.50',
      popover: 'taupe.900',
      popoverForeground: 'taupe.50',
      primaryForeground: 'taupe.900',
      secondary: 'taupe.800',
      secondaryForeground: 'taupe.50',
      muted: 'taupe.800',
      mutedForeground: 'taupe.400',
      accent: 'taupe.800',
      accentForeground: 'taupe.50',
      destructiveForeground: 'taupe.900',
      successForeground: 'taupe.900',
      warningForeground: 'taupe.900',
      infoForeground: 'taupe.900',
      carbon: 'taupe.100',
      carbonForeground: 'taupe.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  },
  olive: {
    light: {
      background: 'white',
      foreground: 'olive.950',
      card: 'white',
      cardForeground: 'olive.950',
      popover: 'white',
      popoverForeground: 'olive.950',
      primaryForeground: 'olive.50',
      secondary: 'olive.100',
      secondaryForeground: 'olive.900',
      muted: 'olive.100',
      mutedForeground: 'olive.500',
      accent: 'olive.100',
      accentForeground: 'olive.900',
      destructiveForeground: 'olive.50',
      successForeground: 'olive.50',
      warningForeground: 'olive.50',
      infoForeground: 'olive.50',
      carbon: 'olive.800',
      carbonForeground: 'olive.50',
      border: 'olive.200',
      input: 'olive.200'
    },
    dark: {
      background: 'olive.950',
      foreground: 'olive.50',
      card: 'olive.900',
      cardForeground: 'olive.50',
      popover: 'olive.900',
      popoverForeground: 'olive.50',
      primaryForeground: 'olive.900',
      secondary: 'olive.800',
      secondaryForeground: 'olive.50',
      muted: 'olive.800',
      mutedForeground: 'olive.400',
      accent: 'olive.800',
      accentForeground: 'olive.50',
      destructiveForeground: 'olive.900',
      successForeground: 'olive.900',
      warningForeground: 'olive.900',
      infoForeground: 'olive.900',
      carbon: 'olive.100',
      carbonForeground: 'olive.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  },
  mauve: {
    light: {
      background: 'white',
      foreground: 'mauve.950',
      card: 'white',
      cardForeground: 'mauve.950',
      popover: 'white',
      popoverForeground: 'mauve.950',
      primaryForeground: 'mauve.50',
      secondary: 'mauve.100',
      secondaryForeground: 'mauve.900',
      muted: 'mauve.100',
      mutedForeground: 'mauve.500',
      accent: 'mauve.100',
      accentForeground: 'mauve.900',
      destructiveForeground: 'mauve.50',
      successForeground: 'mauve.50',
      warningForeground: 'mauve.50',
      infoForeground: 'mauve.50',
      carbon: 'mauve.800',
      carbonForeground: 'mauve.50',
      border: 'mauve.200',
      input: 'mauve.200'
    },
    dark: {
      background: 'mauve.950',
      foreground: 'mauve.50',
      card: 'mauve.900',
      cardForeground: 'mauve.50',
      popover: 'mauve.900',
      popoverForeground: 'mauve.50',
      primaryForeground: 'mauve.900',
      secondary: 'mauve.800',
      secondaryForeground: 'mauve.50',
      muted: 'mauve.800',
      mutedForeground: 'mauve.400',
      accent: 'mauve.800',
      accentForeground: 'mauve.50',
      destructiveForeground: 'mauve.900',
      successForeground: 'mauve.900',
      warningForeground: 'mauve.900',
      infoForeground: 'mauve.900',
      carbon: 'mauve.100',
      carbonForeground: 'mauve.900',
      border: DARK_BORDER,
      input: DARK_INPUT
    }
  }
};

/**
 * builtin primary color preset
 */
export const builtinPrimaryPreset: Record<BuiltinPrimaryPresetKey, PrimaryPreset> = {
  slate: {
    light: {
      primary: 'slate.800',
      ring: 'slate.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'slate.200',
      ring: 'slate.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  mist: {
    light: {
      primary: 'mist.800',
      ring: 'mist.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'mist.200',
      ring: 'mist.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  gray: {
    light: {
      primary: 'gray.800',
      ring: 'gray.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'gray.200',
      ring: 'gray.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  zinc: {
    light: {
      primary: 'zinc.800',
      ring: 'zinc.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'zinc.200',
      ring: 'zinc.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  neutral: {
    light: {
      primary: 'neutral.800',
      ring: 'neutral.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'neutral.200',
      ring: 'neutral.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  stone: {
    light: {
      primary: 'stone.800',
      ring: 'stone.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'stone.200',
      ring: 'stone.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  taupe: {
    light: {
      primary: 'taupe.800',
      ring: 'taupe.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'taupe.200',
      ring: 'taupe.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  olive: {
    light: {
      primary: 'olive.800',
      ring: 'olive.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'olive.200',
      ring: 'olive.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  mauve: {
    light: {
      primary: 'mauve.800',
      ring: 'mauve.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'mauve.200',
      ring: 'mauve.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  red: {
    light: {
      primary: 'red.500',
      ring: 'red.400',
      chart1: 'red.300',
      chart2: 'red.500',
      chart3: 'red.600',
      chart4: 'red.700',
      chart5: 'red.800'
    },
    dark: {
      primary: 'red.500',
      ring: 'red.900',
      chart1: 'red.300',
      chart2: 'red.500',
      chart3: 'red.600',
      chart4: 'red.700',
      chart5: 'red.800'
    }
  },
  orange: {
    light: {
      primary: 'orange.500',
      ring: 'orange.400',
      chart1: 'orange.300',
      chart2: 'orange.500',
      chart3: 'orange.600',
      chart4: 'orange.700',
      chart5: 'orange.800'
    },
    dark: {
      primary: 'orange.500',
      ring: 'orange.900',
      chart1: 'orange.300',
      chart2: 'orange.500',
      chart3: 'orange.600',
      chart4: 'orange.700',
      chart5: 'orange.800'
    }
  },
  amber: {
    light: {
      primary: 'amber.500',
      ring: 'amber.400',
      chart1: 'amber.300',
      chart2: 'amber.500',
      chart3: 'amber.600',
      chart4: 'amber.700',
      chart5: 'amber.800'
    },
    dark: {
      primary: 'amber.500',
      ring: 'amber.900',
      chart1: 'amber.300',
      chart2: 'amber.500',
      chart3: 'amber.600',
      chart4: 'amber.700',
      chart5: 'amber.800'
    }
  },
  yellow: {
    light: {
      primary: 'yellow.500',
      ring: 'yellow.400',
      chart1: 'yellow.300',
      chart2: 'yellow.500',
      chart3: 'yellow.600',
      chart4: 'yellow.700',
      chart5: 'yellow.800'
    },
    dark: {
      primary: 'yellow.500',
      ring: 'yellow.900',
      chart1: 'yellow.300',
      chart2: 'yellow.500',
      chart3: 'yellow.600',
      chart4: 'yellow.700',
      chart5: 'yellow.800'
    }
  },
  lime: {
    light: {
      primary: 'lime.500',
      ring: 'lime.400',
      chart1: 'lime.300',
      chart2: 'lime.500',
      chart3: 'lime.600',
      chart4: 'lime.700',
      chart5: 'lime.800'
    },
    dark: {
      primary: 'lime.600',
      ring: 'lime.900',
      chart1: 'lime.300',
      chart2: 'lime.500',
      chart3: 'lime.600',
      chart4: 'lime.700',
      chart5: 'lime.800'
    }
  },
  green: {
    light: {
      primary: 'green.500',
      ring: 'green.400',
      chart1: 'green.300',
      chart2: 'green.500',
      chart3: 'green.600',
      chart4: 'green.700',
      chart5: 'green.800'
    },
    dark: {
      primary: 'green.600',
      ring: 'green.900',
      chart1: 'green.300',
      chart2: 'green.500',
      chart3: 'green.600',
      chart4: 'green.700',
      chart5: 'green.800'
    }
  },
  emerald: {
    light: {
      primary: 'emerald.500',
      ring: 'emerald.400',
      chart1: 'emerald.300',
      chart2: 'emerald.500',
      chart3: 'emerald.600',
      chart4: 'emerald.700',
      chart5: 'emerald.800'
    },
    dark: {
      primary: 'emerald.600',
      ring: 'emerald.900',
      chart1: 'emerald.300',
      chart2: 'emerald.500',
      chart3: 'emerald.600',
      chart4: 'emerald.700',
      chart5: 'emerald.800'
    }
  },
  teal: {
    light: {
      primary: 'teal.500',
      ring: 'teal.400',
      chart1: 'teal.300',
      chart2: 'teal.500',
      chart3: 'teal.600',
      chart4: 'teal.700',
      chart5: 'teal.800'
    },
    dark: {
      primary: 'teal.500',
      ring: 'teal.900',
      chart1: 'teal.300',
      chart2: 'teal.500',
      chart3: 'teal.600',
      chart4: 'teal.700',
      chart5: 'teal.800'
    }
  },
  cyan: {
    light: {
      primary: 'cyan.500',
      ring: 'cyan.400',
      chart1: 'cyan.300',
      chart2: 'cyan.500',
      chart3: 'cyan.600',
      chart4: 'cyan.700',
      chart5: 'cyan.800'
    },
    dark: {
      primary: 'cyan.500',
      ring: 'cyan.900',
      chart1: 'cyan.300',
      chart2: 'cyan.500',
      chart3: 'cyan.600',
      chart4: 'cyan.700',
      chart5: 'cyan.800'
    }
  },
  sky: {
    light: {
      primary: 'sky.500',
      ring: 'sky.400',
      chart1: 'sky.300',
      chart2: 'sky.500',
      chart3: 'sky.600',
      chart4: 'sky.700',
      chart5: 'sky.800'
    },
    dark: {
      primary: 'sky.500',
      ring: 'sky.900',
      chart1: 'sky.300',
      chart2: 'sky.500',
      chart3: 'sky.600',
      chart4: 'sky.700',
      chart5: 'sky.800'
    }
  },
  blue: {
    light: {
      primary: 'blue.500',
      ring: 'blue.400',
      chart1: 'blue.300',
      chart2: 'blue.500',
      chart3: 'blue.600',
      chart4: 'blue.700',
      chart5: 'blue.800'
    },
    dark: {
      primary: 'blue.500',
      ring: 'blue.900',
      chart1: 'blue.300',
      chart2: 'blue.500',
      chart3: 'blue.600',
      chart4: 'blue.700',
      chart5: 'blue.800'
    }
  },
  indigo: {
    light: {
      primary: 'indigo.500',
      ring: 'indigo.400',
      chart1: 'indigo.300',
      chart2: 'indigo.500',
      chart3: 'indigo.600',
      chart4: 'indigo.700',
      chart5: 'indigo.800'
    },
    dark: {
      primary: 'indigo.500',
      ring: 'indigo.900',
      chart1: 'indigo.300',
      chart2: 'indigo.500',
      chart3: 'indigo.600',
      chart4: 'indigo.700',
      chart5: 'indigo.800'
    }
  },
  violet: {
    light: {
      primary: 'violet.500',
      ring: 'violet.400',
      chart1: 'violet.300',
      chart2: 'violet.500',
      chart3: 'violet.600',
      chart4: 'violet.700',
      chart5: 'violet.800'
    },
    dark: {
      primary: 'violet.500',
      ring: 'violet.900',
      chart1: 'violet.300',
      chart2: 'violet.500',
      chart3: 'violet.600',
      chart4: 'violet.700',
      chart5: 'violet.800'
    }
  },
  purple: {
    light: {
      primary: 'purple.500',
      ring: 'purple.400',
      chart1: 'purple.300',
      chart2: 'purple.500',
      chart3: 'purple.600',
      chart4: 'purple.700',
      chart5: 'purple.800'
    },
    dark: {
      primary: 'purple.500',
      ring: 'purple.900',
      chart1: 'purple.300',
      chart2: 'purple.500',
      chart3: 'purple.600',
      chart4: 'purple.700',
      chart5: 'purple.800'
    }
  },
  fuchsia: {
    light: {
      primary: 'fuchsia.500',
      ring: 'fuchsia.400',
      chart1: 'fuchsia.300',
      chart2: 'fuchsia.500',
      chart3: 'fuchsia.600',
      chart4: 'fuchsia.700',
      chart5: 'fuchsia.800'
    },
    dark: {
      primary: 'fuchsia.500',
      ring: 'fuchsia.900',
      chart1: 'fuchsia.300',
      chart2: 'fuchsia.500',
      chart3: 'fuchsia.600',
      chart4: 'fuchsia.700',
      chart5: 'fuchsia.800'
    }
  },
  pink: {
    light: {
      primary: 'pink.500',
      ring: 'pink.400',
      chart1: 'pink.300',
      chart2: 'pink.500',
      chart3: 'pink.600',
      chart4: 'pink.700',
      chart5: 'pink.800'
    },
    dark: {
      primary: 'pink.500',
      ring: 'pink.900',
      chart1: 'pink.300',
      chart2: 'pink.500',
      chart3: 'pink.600',
      chart4: 'pink.700',
      chart5: 'pink.800'
    }
  },
  rose: {
    light: {
      primary: 'rose.500',
      ring: 'rose.400',
      chart1: 'rose.300',
      chart2: 'rose.500',
      chart3: 'rose.600',
      chart4: 'rose.700',
      chart5: 'rose.800'
    },
    dark: {
      primary: 'rose.500',
      ring: 'rose.900',
      chart1: 'rose.300',
      chart2: 'rose.500',
      chart3: 'rose.600',
      chart4: 'rose.700',
      chart5: 'rose.800'
    }
  }
};

/**
 * builtin feedback color preset
 */
export const builtinFeedbackPreset: Record<BuiltinFeedbackPresetKey, FeedbackPreset> = {
  /**
   * Classic standard combination for most scenarios
   * 经典标准 . 最常见的组合，适用于大多数场景
   */
  classic: {
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
  },
  /**
   * Vivid and energetic, high saturation for youthful and creative products
   * 鲜艳活力 . 高饱和度，适合年轻化产品和创意应用
   */
  vivid: {
    light: {
      destructive: 'red.500',
      success: 'emerald.500',
      warning: 'amber.500',
      info: 'sky.500'
    },
    dark: {
      destructive: 'red.400',
      success: 'emerald.400',
      warning: 'amber.400',
      info: 'sky.400'
    }
  },
  /**
   * Soft and elegant, low contrast for premium brands and refined interfaces
   * 柔和优雅 . 低对比度，适合高端品牌和优雅界面
   */
  subtle: {
    light: {
      destructive: 'rose.500',
      success: 'emerald.500',
      warning: 'amber.500',
      info: 'indigo.500'
    },
    dark: {
      destructive: 'rose.300',
      success: 'emerald.300',
      warning: 'amber.300',
      info: 'indigo.300'
    }
  },
  /**
   * Warm and welcoming, creates friendly and cozy atmosphere
   * 暖色温馨 . 暖色调为主，营造友好温暖的氛围
   */
  warm: {
    light: {
      destructive: 'red.500',
      success: 'lime.500',
      warning: 'orange.500',
      info: 'amber.600'
    },
    dark: {
      destructive: 'red.400',
      success: 'lime.400',
      warning: 'orange.400',
      info: 'amber.400'
    }
  },
  /**
   * Cool and professional, ideal for tech and professional applications
   * 冷色专业 . 冷色调为主，适合科技和专业应用
   */
  cool: {
    light: {
      destructive: 'rose.500',
      success: 'teal.500',
      warning: 'cyan.600',
      info: 'blue.500'
    },
    dark: {
      destructive: 'rose.400',
      success: 'teal.400',
      warning: 'cyan.400',
      info: 'blue.400'
    }
  },
  /**
   * Nature inspired, perfect for eco.friendly and health products
   * 自然清新 . 自然色系，适合环保、健康类产品
   */
  nature: {
    light: {
      destructive: 'red.500',
      success: 'green.600',
      warning: 'lime.600',
      info: 'teal.600'
    },
    dark: {
      destructive: 'red.300',
      success: 'green.300',
      warning: 'lime.300',
      info: 'teal.300'
    }
  },
  /**
   * Modern and minimal, great for tech products and SaaS applications
   * 现代简约 . 现代感强，适合科技产品和SaaS应用
   */
  modern: {
    light: {
      destructive: 'red.500',
      success: 'emerald.500',
      warning: 'orange.500',
      info: 'sky.500'
    },
    dark: {
      destructive: 'red.400',
      success: 'emerald.400',
      warning: 'orange.400',
      info: 'sky.400'
    }
  },
  /**
   * Vibrant and dynamic, perfect for sports and gaming applications
   * 活力四射 . 高能量配色，适合运动、游戏类应用
   */
  vibrant: {
    light: {
      destructive: 'red.500',
      success: 'lime.500',
      warning: 'amber.500',
      info: 'cyan.500'
    },
    dark: {
      destructive: 'pink.400',
      success: 'lime.400',
      warning: 'amber.400',
      info: 'cyan.400'
    }
  },
  /**
   * Professional business, stable and authoritative for enterprise and B2B
   * 商务专业 . 稳重大气，适合企业级应用和B2B产品
   */
  professional: {
    light: {
      destructive: 'red.500',
      success: 'green.600',
      warning: 'amber.600',
      info: 'blue.600'
    },
    dark: {
      destructive: 'red.300',
      success: 'green.300',
      warning: 'amber.300',
      info: 'blue.300'
    }
  },
  /**
   * Dreamy and soft, ideal for design tools and creative platforms
   * 梦幻柔美 . 柔和色调，适合设计工具和创意平台
   */
  soft: {
    light: {
      destructive: 'rose.400',
      success: 'teal.400',
      warning: 'yellow.400',
      info: 'violet.400'
    },
    dark: {
      destructive: 'rose.300',
      success: 'teal.300',
      warning: 'yellow.300',
      info: 'violet.300'
    }
  },
  /**
   * Bold and striking, high contrast for strong visual impact
   * 大胆醒目 . 高对比度，适合需要强烈视觉冲击的场景
   */
  bold: {
    light: {
      destructive: 'red.600',
      success: 'emerald.600',
      warning: 'orange.600',
      info: 'blue.600'
    },
    dark: {
      destructive: 'red.300',
      success: 'emerald.300',
      warning: 'orange.300',
      info: 'blue.300'
    }
  },
  /**
   * Calm and soothing, low saturation for extended use
   * 平静舒缓 . 低饱和度，适合长时间使用的应用
   */
  calm: {
    light: {
      destructive: 'rose.500',
      success: 'teal.500',
      warning: 'amber.500',
      info: 'slate.500'
    },
    dark: {
      destructive: 'rose.400',
      success: 'teal.400',
      warning: 'amber.400',
      info: 'slate.400'
    }
  },
  /**
   * Candy colors, bright and playful for children's products
   * 糖果色彩 . 明快可爱，适合儿童产品和趣味应用
   */
  candy: {
    light: {
      destructive: 'pink.400',
      success: 'emerald.400',
      warning: 'yellow.400',
      info: 'sky.400'
    },
    dark: {
      destructive: 'pink.300',
      success: 'emerald.300',
      warning: 'yellow.300',
      info: 'sky.300'
    }
  },
  /**
   * Deep and mysterious, for dark themes and mystical styles
   * 深邃神秘 . 深色调，适合暗黑主题和神秘风格
   */
  deep: {
    light: {
      destructive: 'red.600',
      success: 'green.700',
      warning: 'amber.700',
      info: 'blue.700'
    },
    dark: {
      destructive: 'red.200',
      success: 'green.200',
      warning: 'amber.200',
      info: 'blue.200'
    }
  },
  /**
   * Fresh and light, for clean and refreshing interfaces
   * 清新淡雅 . 浅色调，适合简洁清爽的界面
   */
  light: {
    light: {
      destructive: 'red.400',
      success: 'emerald.400',
      warning: 'amber.400',
      info: 'sky.400'
    },
    dark: {
      destructive: 'red.400',
      success: 'emerald.400',
      warning: 'amber.400',
      info: 'sky.400'
    }
  }
};

export const builtinBasePresetKeys = keysOf(builtinBasePreset) as [
  'slate',
  'mist',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'taupe',
  'olive',
  'mauve'
];

export const builtinPrimaryPresetKeys = keysOf(builtinPrimaryPreset) as [
  'slate',
  'mist',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'taupe',
  'olive',
  'mauve',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
];

export const builtinFeedbackPresetKeys = keysOf(builtinFeedbackPreset) as [
  'classic',
  'vivid',
  'subtle',
  'warm',
  'cool',
  'nature',
  'modern',
  'vibrant',
  'professional',
  'soft',
  'bold',
  'calm',
  'candy',
  'deep',
  'light'
];

export const basePresetColorKeys: BasePresetColorKey[] = keysOf(builtinBasePreset['zinc'].light);

export const primaryPresetColorKeys: PrimaryPresetColorKey[] = keysOf(builtinPrimaryPreset['indigo'].light);

export const feedbackPresetColorKeys: FeedbackPresetColorKey[] = keysOf(builtinFeedbackPreset['classic'].light);

export const sidebarPresetColorKeys: SidebarPresetColorKey[] = [
  'sidebar',
  'sidebarForeground',
  'sidebarPrimary',
  'sidebarPrimaryForeground',
  'sidebarAccent',
  'sidebarAccentForeground',
  'sidebarBorder',
  'sidebarRing'
];
