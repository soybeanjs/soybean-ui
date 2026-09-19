import { THEME_RADIUS, THEME_SIZE, DARK_SELECTOR } from './defaults';
import type { DarkSelectorValue, PaletteLevel, PaletteLevelRef, ThemeRadiusValue, ThemeSizeValue } from './types';

/**
 * Small pure helpers shared by the engine: base-token resolution, dark selector
 * resolution and override parsing.
 */

/** resolve a size token into a CSS length. */
export function resolveSizeValue(size: ThemeSizeValue | undefined, fallback: ThemeSizeValue = 'md'): string {
  const value = size ?? fallback;

  if (value in THEME_SIZE) {
    return `${THEME_SIZE[value as keyof typeof THEME_SIZE]}px`;
  }

  return value;
}

/** resolve a radius token into a CSS length seed. */
export function resolveRadiusValue(radius: ThemeRadiusValue | undefined, fallback: ThemeRadiusValue = 'md'): string {
  const value = radius ?? fallback;

  if (value in THEME_RADIUS) {
    return THEME_RADIUS[value as keyof typeof THEME_RADIUS];
  }

  return value;
}

/**
 * resolve a dark selector value into the CSS rule it produces.
 *
 * - `class` → `.dark`
 * - `media` → `@media (prefers-color-scheme: dark)`
 * - anything else is used verbatim (e.g. `[data-theme="dark"]`)
 */
export function getDarkSelector(value: DarkSelectorValue): string {
  if (value === 'class' || value === 'media') {
    return DARK_SELECTOR[value as 'class' | 'media'];
  }

  return value;
}

/**
 * resolve a dark selector into the **class name** the runtime should toggle.
 *
 * - `class` (the keyword) → `dark`
 * - `media` → `null` (the media query follows the OS; toggling a class would be
 *   a no-op at best and could misfire other `.dark` rules at worst)
 * - any other selector is used verbatim with the leading dot stripped
 */
export function darkClassName(selector: DarkSelectorValue): string | null {
  if (selector === 'media') {
    return null;
  }

  if (selector === 'class') {
    return 'dark';
  }

  return selector.replace(/^\./, '');
}

/** whether a string is a `palette.level` reference. */
export function isPaletteLevelRef(value: string): value is PaletteLevelRef {
  const [palette, level] = value.split('.');

  return Boolean(palette && level) && /^\d+$/.test(level as string);
}

/** the numeric level of a `palette.level` reference. */
export function levelOf(ref: PaletteLevelRef): PaletteLevel {
  return Number(ref.split('.')[1]) as PaletteLevel;
}
