import { colord } from '@soybeanjs/colord';
import { tailwindPalette, simplePalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey, TailwindPaletteLevelColorKey } from '@soybeanjs/colord/palette';
import { DEFAULT_PRESET_OPTIONS } from './defaults';
import { getRegistry } from './registry';
import { THEME_SIZE, THEME_RADIUS } from './tokens';
import type { ColorFormat, ColorValue, DarkSelector, DarkSelectorValue } from './types';
import { DARK_SELECTOR } from './variables';

/**
 * resolve a raw dark selector into the CSS rule it produces.
 *
 * - 'class' → '.dark'
 * - 'media' → '@media (prefers-color-scheme: dark)'
 * - any other string is a custom selector used verbatim, e.g. '.custom-dark'
 */
export function getDarkSelector(darkSelector: DarkSelectorValue) {
  if (darkSelector === 'class' || darkSelector === 'media') {
    return DARK_SELECTOR[darkSelector as DarkSelector];
  }

  return darkSelector;
}

/**
 * a color that is not expressed as an hsl()/oklch() string is a token
 * reference (a simple palette key or a tailwind `palette.level` key).
 */
export function isTailwindPaletteLevelColorKey(color: ColorValue): color is TailwindPaletteLevelColorKey {
  return !color.startsWith('hsl(') && !color.startsWith('oklch(');
}

/**
 * strip the `hsl(...)` wrapper so the value can be referenced as a bare
 * space-separated channel triple inside other hsl() composites.
 */
export function removeHslBrackets(color: string) {
  return color.replace(/hsl\(/g, '').replace(/\)/g, '');
}

/**
 * special CSS-wide keywords that must pass through unchanged
 */
export const isUnTransformedColor = (color: ColorValue) => {
  return ['inherit', 'currentColor', 'transparent'].includes(color);
};

/**
 * resolve a `ColorValue` token into a normalized color string in the target
 * `format`. Palette references are looked up from the colord tables; literal
 * hsl()/oklch() strings are converted across formats as needed.
 */
export function resolveColorValue(colorValue: ColorValue, format: ColorFormat) {
  if (isUnTransformedColor(colorValue)) {
    return colorValue;
  }

  if (colorValue === 'black') {
    return simplePalette.black[format];
  }

  if (colorValue === 'white') {
    return simplePalette.white[format];
  }

  if (isTailwindPaletteLevelColorKey(colorValue)) {
    const [paletteKey, level] = colorValue.split('.') as [string, PaletteColorLevel];

    // custom palettes registered via `registerThemePresets` resolve from the
    // runtime registry first; built-in palettes fall back to the colord table.
    const custom = getRegistry().base[paletteKey] ?? getRegistry().primary[paletteKey];
    const customColor = custom?.colors[level];

    if (customColor) {
      return customColor[format];
    }

    return tailwindPalette[paletteKey as TailwindPaletteKey][level][format];
  }

  let color: string = colorValue;

  if (format === 'hsl' && colorValue.startsWith('oklch(')) {
    color = colord(colorValue).toHslString();
  }

  if (format === 'oklch' && colorValue.startsWith('hsl(')) {
    color = colord(colorValue).toOklchString();
  }

  return color;
}

/**
 * resolve a size token into a CSS length. Named keys map to a fixed root
 * font-size; raw `px`/`rem` values pass through unchanged.
 */
export function resolveSizeValue(size?: string) {
  if (!size) {
    return `${THEME_SIZE[DEFAULT_PRESET_OPTIONS.size]}px`;
  }

  if (Object.keys(THEME_SIZE).includes(size)) {
    return `${THEME_SIZE[size as keyof typeof THEME_SIZE]}px`;
  }

  return size;
}

/**
 * resolve a radius token into a CSS length. Named keys map to a fixed value;
 * raw `px`/`rem` values pass through unchanged.
 */
export function resolveRadiusValue(radius?: string): string {
  if (!radius) {
    return THEME_RADIUS[DEFAULT_PRESET_OPTIONS.radius];
  }

  if (Object.keys(THEME_RADIUS).includes(radius)) {
    return THEME_RADIUS[radius as keyof typeof THEME_RADIUS];
  }

  return radius;
}
