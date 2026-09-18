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
 * `primary` + `ring` per palette; chart colors come from the chart scheme (D7).
 */
export type PrimaryCore = {
  light: { primary: ColorValue; ring: ColorValue };
  dark: { primary: ColorValue; ring: ColorValue };
};

/**
 * the base core template (§3.1): the explicit "core 10 keys" for any palette,
 * whose structure is identical across the neutral family — the factory only
 * substitutes the palette prefix.
 */
export const createBaseCore = (p: BaseColorKey): BaseCore =>
  ({
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
  }) as BaseCore;

export const createNeutralPrimaryCore = (p: PrimaryColorKey): PrimaryCore =>
  ({
    light: { primary: `${p}.800`, ring: `${p}.400` },
    dark: { primary: `${p}.200`, ring: `${p}.500` }
  }) as PrimaryCore;

/**
 * chromatic palettes whose dark-mode primary is one level deeper
 *
 * baseline template keeps `{p}.500` in dark mode for every chromatic palette,
 * except the light-green family (lime/green/emerald) where `{p}.600` is used
 * to preserve contrast against the dark primaryForeground.
 */
const DARK_PRIMARY_600: ReadonlySet<PrimaryColorKey> = new Set(['lime', 'green', 'emerald']);

/**
 * the dark-mode primary level of a chromatic palette: `{p}.600` for the
 * light-green family, `{p}.500` otherwise. Single source for the rule shared by
 * the core template and the dark-token derivation of `primary` overrides.
 */
export const chromaticDarkPrimary = (p: PrimaryColorKey): ColorValue =>
  (DARK_PRIMARY_600.has(p) ? `${p}.600` : `${p}.500`) as ColorValue;

export const createChromaticPrimaryCore = (p: PrimaryColorKey): PrimaryCore =>
  ({
    light: { primary: `${p}.500`, ring: `${p}.400` },
    dark: { primary: chromaticDarkPrimary(p), ring: `${p}.900` }
  }) as PrimaryCore;
