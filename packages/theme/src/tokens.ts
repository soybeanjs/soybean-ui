import type { PaletteColorLevel } from '@soybeanjs/colord/palette';
import type { OKLCHColor, ThemeRadius, ThemeSize } from './types';

/** Size → root font-size mapping (in pixels). */
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
 * fixed dark border/input colors
 *
 * do not change with dark level offsets (ADR-5 decision)
 */
export const DARK_BORDER: OKLCHColor = 'oklch(100% 0 0 / 0.1)';

export const DARK_INPUT: OKLCHColor = 'oklch(100% 0 0 / 0.15)';

/**
 * level offset tables (§4.2)
 *
 * - LIGHT_*: moving from shallow to deep = darkening
 * - DARK_*: moving from deep to shallow = brightening
 *
 * a token whose baseline level is not present in its table is never shifted
 */
export const LIGHT_SURFACE = ['white', 50, 100, 200] as const satisfies readonly (PaletteColorLevel | 'white')[];

export const LIGHT_WEAK = [100, 200, 300, 400] as const satisfies readonly PaletteColorLevel[];

export const LIGHT_MUTED_FG = [500, 600, 700, 800] as const satisfies readonly PaletteColorLevel[];

export const DARK_SURFACE = [950, 900, 800, 700] as const satisfies readonly PaletteColorLevel[];

export const DARK_CARD = [900, 800, 700, 600] as const satisfies readonly PaletteColorLevel[];

export const DARK_WEAK = [800, 700, 600, 500] as const satisfies readonly PaletteColorLevel[];

export const DARK_MUTED_FG = [400, 300, 200, 100] as const satisfies readonly PaletteColorLevel[];
