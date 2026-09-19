import {
  paletteColorLevels,
  simplePalette,
  tailwindNeutralPaletteKeys,
  tailwindPalette,
  tailwindPaletteKeys
} from '@soybeanjs/colord/palette';
import type { TailwindPaletteKey } from '@soybeanjs/colord/palette';
import type { ColorFormat, PaletteKey, PaletteLevel, SimpleColorName } from './types';

/**
 * a palette entry as published by `@soybeanjs/colord` (`PaletteColorItem` is not
 * re-exported by the package, so the shape is declared structurally here).
 */
interface PaletteColorItem {
  level: number;
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
}

/**
 * Layer 1 (palette) data access.
 *
 * Every built-in palette level is exposed as a **naked channel** triple
 * (`240 4.8% 95.9%`) rather than a complete color, matching the library-wide
 * convention: consumers wrap it as `hsl(var(--zinc-100) / <alpha>)`. Naked
 * channels keep alpha composition available and avoid a second "complete color"
 * variable per token (see docs/theme.md §3.1).
 */

/**
 * the built-in palette keys, in colord order (26 keys).
 *
 * The key list and the family split both come straight from `@soybeanjs/colord`
 * (`tailwindPaletteKeys` / `tailwindNeutralPaletteKeys`): the palette table and
 * its classification live in one place, so a palette added upstream can never
 * drift from the engine's idea of which family it belongs to.
 */
export const PALETTE_KEYS: readonly PaletteKey[] = tailwindPaletteKeys;

/**
 * the neutral palettes: the ones that carry no hue and are used as the
 * page/surface family. A `primary` picked from this set switches the engine to
 * the "near-black in light, near-white in dark" brand form.
 */
export const NEUTRAL_PALETTES: readonly PaletteKey[] = tailwindNeutralPaletteKeys;

/** whether a palette belongs to the neutral family. */
export function isNeutralFamily(palette: string): boolean {
  return (NEUTRAL_PALETTES as readonly string[]).includes(palette);
}

/**
 * the built-in palette levels (11 levels, 50 … 950).
 */
export const PALETTE_LEVELS = paletteColorLevels as readonly PaletteLevel[];

/**
 * whether a value is a built-in palette key.
 */
export function isPaletteKey(value: unknown): value is PaletteKey {
  return typeof value === 'string' && value in tailwindPalette;
}

/**
 * whether a value is a built-in palette level.
 */
export function isPaletteLevel(value: unknown): value is PaletteLevel {
  return typeof value === 'number' && (paletteColorLevels as number[]).includes(value);
}

/**
 * strip the color function wrapper: `hsl(240 4.8% 95.9%)` → `240 4.8% 95.9%`.
 */
export function toChannel(value: string): string {
  return value.replace(/^[a-z]+\(/i, '').replace(/\)$/, '');
}

/**
 * the colord entry of a palette level, or `undefined` for unknown keys/levels.
 */
function paletteItem(palette: PaletteKey, level: PaletteLevel): PaletteColorItem | undefined {
  return tailwindPalette[palette as TailwindPaletteKey]?.[level];
}

/**
 * the naked channel triple of a palette level, or `undefined` when unknown.
 */
export function paletteChannel(palette: PaletteKey, level: PaletteLevel, format: ColorFormat): string | undefined {
  const item = paletteItem(palette, level);

  return item ? toChannel(item[format]) : undefined;
}

/**
 * the complete color of a palette level, or `undefined` when unknown.
 */
export function paletteColor(palette: PaletteKey, level: PaletteLevel, format: ColorFormat): string | undefined {
  return paletteItem(palette, level)?.[format];
}

/**
 * the naked channel triple of `white` / `black`, or `undefined` when unknown.
 */
export function simpleChannel(name: SimpleColorName, format: ColorFormat): string {
  return toChannel(simplePalette[name][format]);
}

/**
 * the complete color of `white` / `black`.
 */
export function simpleColor(name: SimpleColorName, format: ColorFormat): string {
  return simplePalette[name][format];
}

/**
 * the `palette.level` reference string used by the theme map, e.g. `'zinc.100'`.
 */
export function paletteRef(palette: PaletteKey, level: PaletteLevel): string {
  return `${palette}.${level}`;
}

/**
 * the hsl channel triple of a palette level regardless of the output format.
 *
 * The contrast guard always measures in hsl (one code path); `oklch` output is
 * converted through `@soybeanjs/colord` here, so the guard stays format-free.
 */
export function paletteChannelHsl(palette: PaletteKey, level: PaletteLevel): string | undefined {
  const item = paletteItem(palette, level);

  return item ? toChannel(item.hsl) : undefined;
}

/**
 * the hsl channel triple of `white` / `black`.
 */
export function simpleChannelHsl(name: SimpleColorName): string {
  return toChannel(simplePalette[name].hsl);
}

/**
 * walk a palette level along the ramp, clamped at both ends.
 *
 * Shared by the level knob (ladder shift) and the contrast guard so both move
 * levels by the same rule: `deeper` moves toward 950, `lighter` toward 50.
 */
export function walkPaletteLevel(level: PaletteLevel, steps: number, direction: 'deeper' | 'lighter'): PaletteLevel {
  const index = PALETTE_LEVELS.indexOf(level);
  const nextIndex = direction === 'deeper' ? index + steps : index - steps;
  const clamped = Math.min(Math.max(nextIndex, 0), PALETTE_LEVELS.length - 1);

  return (PALETTE_LEVELS[clamped] ?? level) as PaletteLevel;
}
