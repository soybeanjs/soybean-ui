import { colord } from '@soybeanjs/colord';
import { tailwindPalette, simplePalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey, TailwindPaletteLevelColorKey } from '@soybeanjs/colord/palette';
import type { ColorFormat, ColorValue, PresetConfig } from './types';

export function keysOf<TRecord extends Record<string, unknown>>(record: TRecord) {
  return Object.keys(record) as (keyof TRecord)[];
}

export function mergeObjects<T extends Record<string, any>>(base: T, ...objects: Partial<T>[]): T {
  const result: Record<string, any> = { ...base };

  objects.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const value = obj[key as keyof typeof obj];
      if (value !== undefined) {
        result[key] = value;
      }
    });
  });

  return result as T;
}

export function isTailwindPaletteLevelColorKey(color: ColorValue): color is TailwindPaletteLevelColorKey {
  return !color.startsWith('hsl(') && !color.startsWith('oklch(');
}

export function removeHslBrackets(color: string) {
  return color.replace(/hsl\(/g, '').replace(/\)/g, '');
}

export const isUnTransformedColor = (color: ColorValue) => {
  return ['inherit', 'currentColor', 'transparent'].includes(color);
};

export function getColorValue(colorValue: ColorValue, format: ColorFormat) {
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
    const [paletteKey, level] = colorValue.split('.') as [TailwindPaletteKey, PaletteColorLevel];

    return tailwindPalette[paletteKey][level][format];
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

export function getColorPresetCacheKey(config: PresetConfig) {
  const { base, primary, feedback, sidebar } = config;

  const key = `base:${base};primary:${primary};feedback:${feedback};sidebar:${sidebar}`;

  return key;
}
