import type { PaletteColorLevel } from '@soybeanjs/colord/palette';
import type { OKLCHColor, ThemeRadius, ThemeSize } from './types';

/**
 * Size → root font-size mapping (in pixels). Controls the root font-size,
 * scaling all rem-based values proportionally.
 */
export const THEME_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24
} as const satisfies Record<ThemeSize, number>;

export const themeSizeKeys = Object.keys(THEME_SIZE) as ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export const THEME_RADIUS = {
  '2xs': '0.25rem',
  xs: '0.375rem',
  sm: '0.5rem',
  md: '0.625rem',
  lg: '0.75rem',
  xl: '0.875rem',
  '2xl': '1rem'
} as const satisfies Record<ThemeRadius, string>;

export const themeRadiusKeys = Object.keys(THEME_RADIUS) as ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/**
 * fixed translucent dark border/input colors
 *
 * unlike surface tokens, these do not depend on the palette: keeping them a
 * neutral translucent white guarantees legible hairlines on any dark surface.
 */
export const DARK_BORDER: OKLCHColor = 'oklch(100% 0 0 / 0.1)';

export const DARK_INPUT: OKLCHColor = 'oklch(100% 0 0 / 0.15)';

/**
 * level tables used to derive the dark tokens from the light tokens (§4).
 *
 * each table maps a light-mode palette level to its dark-mode counterpart on
 * the same palette. Derivation is per-key (see `deriveDarkFromLight`), so a
 * surface like `card` darkens deeper than `background`.
 */
export const LEVEL_FLIP: Record<string, string> = {
  '50': '900',
  '100': '800',
  '500': '400',
  '800': '100',
  '900': '50',
  '950': '50'
};

/**
 * keys whose light `white` surface darkens to `{p}.900` (raised surfaces) —
 * every other white surface darkens to `{p}.950`.
 */
export const WHITE_TO_900_KEYS = new Set(['card', 'popover', 'sidebar']) as ReadonlySet<string>;

/**
 * keys that use the fixed translucent dark border/input colors instead of a
 * palette level.
 */
export const FIXED_BORDER_KEYS = new Set(['border', 'input', 'sidebarBorder']) as ReadonlySet<string>;

/**
 * level tables for the light/dark surface offsets (§4.2).
 *
 * - `*_SURFACE` / `*_CARD` / `*_WEAK` / `*_MUTED_FG` declare the ordered
 *   levels a token may take; shifting moves it `offset` steps toward the table
 *   end and clamps at the last entry.
 * - tokens whose baseline level is absent from their table never shift (D8).
 */
export const LIGHT_SURFACE = ['white', 50, 100, 200] as const satisfies readonly (PaletteColorLevel | 'white')[];

export const LIGHT_WEAK = [100, 200, 300, 400] as const satisfies readonly PaletteColorLevel[];

export const LIGHT_MUTED_FG = [500, 600, 700, 800] as const satisfies readonly PaletteColorLevel[];

export const DARK_SURFACE = [950, 900, 800, 700] as const satisfies readonly PaletteColorLevel[];

export const DARK_CARD = [900, 800, 700, 600] as const satisfies readonly PaletteColorLevel[];

export const DARK_WEAK = [800, 700, 600, 500] as const satisfies readonly PaletteColorLevel[];

export const DARK_MUTED_FG = [400, 300, 200, 100] as const satisfies readonly PaletteColorLevel[];
