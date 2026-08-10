import { tailwindPalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindNeutralPaletteKey, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import type {
  BaseColorKey,
  ChartSchemeKey,
  ColorValue,
  FeedbackSchemeKey,
  PrimaryColorKey,
  SemanticScheme,
  SidebarColorValue,
  SidebarColorKey,
  SidebarSchemeKey,
  ThemePalette,
  ThemePresetRegistry
} from './types';

/**
 * the built-in neutral palette keys (used for `base`)
 */
export const NEUTRAL_FAMILY: readonly PrimaryColorKey[] = [
  'slate',
  'mist',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'taupe',
  'olive',
  'mauve'
] as const;

/**
 * the built-in chromatic palette keys (used for `primary`)
 */
export const CHROMATIC_FAMILY: readonly PrimaryColorKey[] = [
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
] as const;

const LEVELS: readonly PaletteColorLevel[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * extract the hsl/oklch channel strings for every level of a colord palette.
 */
function toPaletteColors(key: TailwindPaletteKey): ThemePalette['colors'] {
  return Object.fromEntries(
    LEVELS.map(level => [level, { hsl: tailwindPalette[key][level].hsl, oklch: tailwindPalette[key][level].oklch }])
  ) as ThemePalette['colors'];
}

const buildBasePalette = (key: PrimaryColorKey): ThemePalette => ({
  name: key,
  family: 'neutral',
  colors: toPaletteColors(key as TailwindNeutralPaletteKey)
});

const buildPrimaryPalette = (key: PrimaryColorKey): ThemePalette => ({
  name: key,
  family: (NEUTRAL_FAMILY as readonly string[]).includes(key) ? 'neutral' : 'chromatic',
  colors: toPaletteColors(key as TailwindPaletteKey)
});

/**
 * the built-in schemes (identical to the previous hard-coded derivation).
 *
 * Five `feedback` presets, five `chart` presets and four `sidebar` presets are
 * provided as system built-ins (selected in `docs/theme-config-components-design.md`,
 * §5.8) so theme-config components can offer them without registration.
 */
const builtinSchemes = {
  feedback: {
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
  } satisfies Record<FeedbackSchemeKey, SemanticScheme<ColorValue>>,
  chart: {
    vivid: {
      light: { chart1: 'orange.600', chart2: 'teal.600', chart3: 'cyan.900', chart4: 'amber.400', chart5: 'amber.500' },
      dark: { chart1: 'blue.700', chart2: 'emerald.500', chart3: 'amber.500', chart4: 'purple.500', chart5: 'rose.500' }
    },
    cool: {
      light: { chart1: 'blue.700', chart2: 'cyan.600', chart3: 'sky.500', chart4: 'indigo.500', chart5: 'violet.500' },
      dark: { chart1: 'sky.300', chart2: 'cyan.300', chart3: 'blue.300', chart4: 'indigo.300', chart5: 'violet.300' }
    },
    warm: {
      light: { chart1: 'orange.600', chart2: 'amber.500', chart3: 'rose.500', chart4: 'red.600', chart5: 'orange.400' },
      dark: { chart1: 'orange.300', chart2: 'amber.300', chart3: 'rose.300', chart4: 'red.300', chart5: 'orange.200' }
    },
    natural: {
      light: { chart1: 'green.600', chart2: 'emerald.500', chart3: 'teal.600', chart4: 'lime.500', chart5: 'cyan.600' },
      dark: { chart1: 'green.300', chart2: 'emerald.300', chart3: 'teal.300', chart4: 'lime.300', chart5: 'cyan.300' }
    },
    minimal: {
      light: {
        chart1: 'slate.500',
        chart2: 'blue.400',
        chart3: 'emerald.400',
        chart4: 'amber.400',
        chart5: 'rose.400'
      },
      dark: { chart1: 'slate.300', chart2: 'blue.300', chart3: 'emerald.300', chart4: 'amber.300', chart5: 'rose.300' }
    }
  } satisfies Record<ChartSchemeKey, SemanticScheme<ColorValue>>,
  sidebar: {
    derived: {
      light: {
        sidebar: 'background',
        sidebarForeground: 'foreground',
        sidebarPrimary: 'primary',
        sidebarPrimaryForeground: 'primaryForeground',
        sidebarAccent: 'accent',
        sidebarAccentForeground: 'accentForeground',
        sidebarBorder: 'border',
        sidebarRing: 'ring'
      },
      dark: {
        sidebar: 'card',
        sidebarForeground: 'foreground',
        sidebarPrimary: 'primary',
        sidebarPrimaryForeground: 'primaryForeground',
        sidebarAccent: 'accent',
        sidebarAccentForeground: 'accentForeground',
        sidebarBorder: 'border',
        sidebarRing: 'ring'
      }
    },
    // 反转深色：全局 light 下 sidebar 呈现深色。light 槽填充深色面，dark 槽
    // 保持深色，使深色皮肤在双模式下恒定（§5.8.2）。
    'inverted-dark': {
      light: {
        sidebar: 'zinc.800',
        sidebarForeground: 'zinc.100',
        sidebarPrimary: 'primary',
        sidebarPrimaryForeground: 'primaryForeground',
        sidebarAccent: 'zinc.700',
        sidebarAccentForeground: 'zinc.100',
        sidebarBorder: 'zinc.700',
        sidebarRing: 'ring'
      },
      dark: {
        sidebar: 'zinc.800',
        sidebarForeground: 'zinc.100',
        sidebarPrimary: 'primary',
        sidebarPrimaryForeground: 'primaryForeground',
        sidebarAccent: 'zinc.700',
        sidebarAccentForeground: 'zinc.100',
        sidebarBorder: 'zinc.600',
        sidebarRing: 'ring'
      }
    },
    soft: {
      light: {
        sidebar: 'secondary',
        sidebarForeground: 'secondaryForeground',
        sidebarPrimary: 'primary',
        sidebarPrimaryForeground: 'primaryForeground',
        sidebarAccent: 'accent',
        sidebarAccentForeground: 'accentForeground',
        sidebarBorder: 'border',
        sidebarRing: 'ring'
      },
      dark: {
        sidebar: 'muted',
        sidebarForeground: 'foreground',
        sidebarPrimary: 'primary',
        sidebarPrimaryForeground: 'primaryForeground',
        sidebarAccent: 'accent',
        sidebarAccentForeground: 'accentForeground',
        sidebarBorder: 'border',
        sidebarRing: 'ring'
      }
    },
    contrast: {
      light: {
        sidebar: 'zinc.800',
        sidebarForeground: 'zinc.100',
        sidebarPrimary: 'background',
        sidebarPrimaryForeground: 'foreground',
        sidebarAccent: 'primary',
        sidebarAccentForeground: 'primaryForeground',
        sidebarBorder: 'zinc.700',
        sidebarRing: 'ring'
      },
      dark: {
        sidebar: 'card',
        sidebarForeground: 'foreground',
        sidebarPrimary: 'primary',
        sidebarPrimaryForeground: 'primaryForeground',
        sidebarAccent: 'accent',
        sidebarAccentForeground: 'accentForeground',
        sidebarBorder: 'border',
        sidebarRing: 'ring'
      }
    }
  } satisfies Record<SidebarSchemeKey, SemanticScheme<SidebarColorValue>>
} as const;

const builtinRegistry: ThemePresetRegistry = {
  base: Object.fromEntries(NEUTRAL_FAMILY.map(key => [key, buildBasePalette(key)])) as ThemePresetRegistry['base'],
  primary: Object.fromEntries(
    [...NEUTRAL_FAMILY, ...CHROMATIC_FAMILY].map(key => [key, buildPrimaryPalette(key)])
  ) as ThemePresetRegistry['primary'],
  feedback: builtinSchemes.feedback,
  chart: builtinSchemes.chart,
  sidebar: builtinSchemes.sidebar
};

/**
 * the built-in key sets, snapshot for backward-compat exports and to protect
 * built-ins from being overridden by `registerThemePresets`.
 */
const builtinKeys: { [K in keyof ThemePresetRegistry]: ReadonlySet<string> } = {
  base: new Set(Object.keys(builtinRegistry.base)),
  primary: new Set(Object.keys(builtinRegistry.primary)),
  feedback: new Set(Object.keys(builtinRegistry.feedback)),
  chart: new Set(Object.keys(builtinRegistry.chart)),
  sidebar: new Set(Object.keys(builtinRegistry.sidebar))
};

/**
 * the current runtime registry.
 *
 * starts as the built-in registry; `registerThemePresets` merges extra entries
 * without ever overriding built-in keys.
 */
let registry: ThemePresetRegistry = builtinRegistry;

/**
 * read the current runtime registry.
 */
export function getRegistry(): ThemePresetRegistry {
  return registry;
}

/**
 * merge a section, adding only keys that are not built-in.
 *
 * Built-in keys are never overridden; custom keys may override earlier custom
 * entries (the accumulated `current` section is the source).
 */
function mergeSection<K extends Record<string, unknown>>(
  current: K,
  extra: Partial<Record<string, unknown>> | undefined,
  builtin: ReadonlySet<string>
): K {
  if (!extra) {
    return current;
  }

  const result: Record<string, unknown> = { ...current };

  for (const key of Object.keys(extra)) {
    if (!builtin.has(key) && extra[key] !== undefined) {
      result[key] = extra[key];
    }
  }

  return result as K;
}

/**
 * register extra theme presets (palettes + semantic schemes) at runtime.
 *
 * This is the data-driven extension point used by the theme store / theme-shop
 * panel: provide `ThemePalette` / `SemanticScheme` data keyed by name and they
 * become selectable via `base` / `primary` / `feedback` / `chart` / `sidebar`.
 *
 * Built-in keys are protected: a registered entry never overrides a built-in.
 */
export function registerThemePresets(extra: Partial<ThemePresetRegistry>): void {
  registry = {
    base: mergeSection(registry.base, extra.base, builtinKeys.base),
    primary: mergeSection(registry.primary, extra.primary, builtinKeys.primary),
    feedback: mergeSection(registry.feedback, extra.feedback, builtinKeys.feedback),
    chart: mergeSection(registry.chart, extra.chart, builtinKeys.chart),
    sidebar: mergeSection(registry.sidebar, extra.sidebar, builtinKeys.sidebar)
  };
}

/**
 * the built-in base palette keys (backward-compat export)
 */
export const builtinBasePresetKeys = Object.keys(builtinRegistry.base) as BaseColorKey[];

/**
 * the built-in primary palette keys (backward-compat export)
 */
export const builtinPrimaryPresetKeys = Object.keys(builtinRegistry.primary) as PrimaryColorKey[];

/**
 * the built-in feedback scheme keys
 */
export const builtinFeedbackSchemeKeys = Object.keys(builtinRegistry.feedback) as FeedbackSchemeKey[];

/**
 * the built-in chart scheme keys
 */
export const builtinChartSchemeKeys = Object.keys(builtinRegistry.chart) as ChartSchemeKey[];

/**
 * the built-in sidebar scheme keys
 */
export const builtinSidebarSchemeKeys = Object.keys(builtinRegistry.sidebar) as SidebarSchemeKey[];

/**
 * whether a value is a registered base palette key (built-in or custom)
 */
export const isBaseKey = (value: unknown): value is BaseColorKey =>
  typeof value === 'string' && value in getRegistry().base;

/**
 * whether a value is a registered primary palette key (built-in or custom)
 */
export const isPrimaryKey = (value: unknown): value is PrimaryColorKey =>
  typeof value === 'string' && value in getRegistry().primary;

/**
 * whether a value is a registered feedback scheme key
 */
export const isFeedbackScheme = (value: unknown): value is FeedbackSchemeKey =>
  typeof value === 'string' && value in getRegistry().feedback;

/**
 * whether a value is a registered chart scheme key
 */
export const isChartScheme = (value: unknown): value is ChartSchemeKey =>
  typeof value === 'string' && value in getRegistry().chart;

/**
 * whether a value is a registered sidebar scheme key
 */
export const isSidebarScheme = (value: unknown): value is SidebarSchemeKey =>
  typeof value === 'string' && value in getRegistry().sidebar;

export type { SidebarColorKey };
