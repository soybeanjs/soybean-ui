import type { BaseColorKey, ColorValue, PrimaryColorKey } from './types';

/**
 * the base core keys (§3.1)
 *
 * explicit per-palette core tokens; every other base key is derived (§3.2).
 */
export type BaseCoreKey =
  | 'background'
  | 'foreground'
  | 'card'
  | 'cardForeground'
  | 'popover'
  | 'popoverForeground'
  | 'muted'
  | 'mutedForeground'
  | 'accent'
  | 'accentForeground';

export type BaseCore = {
  light: Record<BaseCoreKey, ColorValue>;
  dark: Record<BaseCoreKey, ColorValue>;
};

/**
 * the primary core keys (§3.1)
 *
 * `primary` + `ring` per palette; charts use the fixed templates below (D7).
 */
export type PrimaryCore = {
  light: { primary: ColorValue; ring: ColorValue };
  dark: { primary: ColorValue; ring: ColorValue };
};

const NEUTRAL_FAMILY: readonly PrimaryColorKey[] = [
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

const CHROMATIC_FAMILY: readonly PrimaryColorKey[] = [
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

const createBaseCore = (p: BaseColorKey): BaseCore => ({
  light: {
    background: 'white',
    foreground: `${p}.950`,
    card: 'white',
    cardForeground: `${p}.950`,
    popover: 'white',
    popoverForeground: `${p}.950`,
    muted: `${p}.100`,
    mutedForeground: `${p}.500`,
    accent: `${p}.100`,
    accentForeground: `${p}.900`
  },
  dark: {
    background: `${p}.950`,
    foreground: `${p}.50`,
    card: `${p}.900`,
    cardForeground: `${p}.50`,
    popover: `${p}.900`,
    popoverForeground: `${p}.50`,
    muted: `${p}.800`,
    mutedForeground: `${p}.400`,
    accent: `${p}.800`,
    accentForeground: `${p}.50`
  }
});

/**
 * core templates for the 9 built-in base palettes
 *
 * values are the explicit "core 10 keys" from §3.1; the factory only
 * substitutes the palette prefix (identical structure across neutrals).
 */
export const builtinBaseCoreTemplate: Record<BaseColorKey, BaseCore> = {
  slate: createBaseCore('slate'),
  mist: createBaseCore('mist'),
  gray: createBaseCore('gray'),
  zinc: createBaseCore('zinc'),
  neutral: createBaseCore('neutral'),
  stone: createBaseCore('stone'),
  taupe: createBaseCore('taupe'),
  olive: createBaseCore('olive'),
  mauve: createBaseCore('mauve')
};

export const builtinBasePresetKeys = Object.keys(builtinBaseCoreTemplate) as BaseColorKey[];

const createNeutralPrimaryCore = (p: PrimaryColorKey): PrimaryCore => ({
  light: { primary: `${p}.800`, ring: `${p}.400` },
  dark: { primary: `${p}.200`, ring: `${p}.500` }
});

/**
 * chromatic palettes whose dark-mode primary is one level deeper
 *
 * baseline template keeps `{p}.500` in dark mode for every chromatic palette,
 * except the light-green family (lime/green/emerald) where `{p}.600` is used
 * to preserve contrast against the dark primaryForeground.
 */
const DARK_PRIMARY_600: ReadonlySet<PrimaryColorKey> = new Set(['lime', 'green', 'emerald']);

const createChromaticPrimaryCore = (p: PrimaryColorKey): PrimaryCore => ({
  light: { primary: `${p}.500`, ring: `${p}.400` },
  dark: { primary: DARK_PRIMARY_600.has(p) ? `${p}.600` : `${p}.500`, ring: `${p}.900` }
});

/**
 * core templates for the 26 built-in primary palettes
 *
 * neutral family: {p}.800/.200 + ring {p}.400/.500
 * chromatic family: {p}.500 (both modes) + ring {p}.400/.900
 */
export const builtinPrimaryCoreTemplate = Object.fromEntries(
  [...NEUTRAL_FAMILY, ...CHROMATIC_FAMILY].map(p => [
    p,
    NEUTRAL_FAMILY.includes(p) ? createNeutralPrimaryCore(p) : createChromaticPrimaryCore(p)
  ])
) as Record<PrimaryColorKey, PrimaryCore>;

export const builtinPrimaryPresetKeys = Object.keys(builtinPrimaryCoreTemplate) as PrimaryColorKey[];

/**
 * fixed chart templates (D7)
 *
 * reused for every primary palette; light/dark differ only by lightness.
 */
export const CHART_TEMPLATE: {
  light: Record<'chart1' | 'chart2' | 'chart3' | 'chart4' | 'chart5', ColorValue>;
  dark: Record<'chart1' | 'chart2' | 'chart3' | 'chart4' | 'chart5', ColorValue>;
} = {
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
};

export { NEUTRAL_FAMILY, CHROMATIC_FAMILY, DARK_PRIMARY_600 };
