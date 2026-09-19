import { colord } from '@soybeanjs/colord';
import { isPaletteLevelRef } from './shared';
import { paletteColor, simpleColor } from './palette';
import { resolveThemeMap } from './theme-map';
import type {
  ColorFormat,
  PaletteKey,
  PaletteLevel,
  SemanticToken,
  ThemeMode,
  ThemeOptions,
  ThemeMap,
  TokenValue
} from './types';

/**
 * JS-side color resolution (docs/theme.md §3.1).
 *
 * The CSS variables hold **naked channels**, which is what CSS needs (alpha
 * composition) but not what other consumers need (canvas, WebGL, color math,
 * workers, native bridges). Those callers use these functions instead of reading
 * a CSS variable: the results come from the same `resolveThemeMap` the CSS
 * emitter uses — guard corrections included — so JS and CSS never disagree, and
 * no DOM is required (SSR / worker safe).
 */

/**
 * resolve a token map value into a complete CSS color.
 */
function resolveValue(value: TokenValue, format: ColorFormat): string {
  if (value.kind === 'palette') {
    return paletteColor(value.palette, value.level, format) ?? '';
  }

  if (value.kind === 'simple') {
    return simpleColor(value.name, format);
  }

  // 完整色覆盖：按需要转换格式（colord 与调色板层用的是同一套色彩管线）
  const color = colord(value.value);

  if (!color.isValid()) {
    return '';
  }

  return format === 'hsl' ? color.toHslString() : color.toOklchString();
}

/**
 * resolve one semantic token into a complete CSS color.
 *
 * @example
 * resolveTokenColor({ base: 'zinc', primary: 'indigo' }, 'primary', 'dark') // 'hsl(243.5 77.8% 59.2%)'
 */
export function resolveTokenColor(
  options: ThemeOptions,
  token: SemanticToken,
  mode: ThemeMode,
  format: ColorFormat = 'hsl'
): string {
  const map = resolveThemeMap(options);
  const value = map[mode][token];

  return value ? resolveValue(value, format) : '';
}

/**
 * resolve a standalone color reference into a complete CSS color.
 *
 * Accepts the same forms as a token override: a `palette.level` reference
 * (`indigo.600`), a simple name (`white` / `black`), or a complete CSS color,
 * which is passed through (re-expressed in the requested format). Used for
 * swatch previews and any consumer that holds a reference instead of a token.
 */
export function resolveColorRef(ref: string, format: ColorFormat = 'hsl'): string {
  if (ref === 'white' || ref === 'black') {
    return simpleColor(ref, format);
  }

  const isLevelRef = isPaletteLevelRef(ref);

  if (isLevelRef) {
    const [palette, level] = ref.split('.') as [PaletteKey, PaletteLevel];

    return paletteColor(palette, level, format) ?? '';
  }

  const color = colord(ref);

  if (!color.isValid()) {
    return '';
  }

  return format === 'hsl' ? color.toHslString() : color.toOklchString();
}

/**
 * resolve every semantic token of one mode into complete CSS colors.
 *
 * Useful for data visualisation palettes (all chart colors at once) and for
 * exporting a theme to a non-CSS target.
 */
export function resolveThemeColors(
  options: ThemeOptions,
  mode: ThemeMode,
  format: ColorFormat = 'hsl'
): Record<SemanticToken, string> {
  const map: ThemeMap = resolveThemeMap(options);

  return Object.fromEntries(
    (Object.keys(map[mode]) as SemanticToken[]).map(token => [
      token,
      resolveValue(map[mode][token] as TokenValue, format)
    ])
  ) as Record<SemanticToken, string>;
}
