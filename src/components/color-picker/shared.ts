import { resolveColorFormat } from '@soybeanjs/headless/shared';
import type { ColorFormat, ColorValue } from '@soybeanjs/headless/shared';

export const DEFAULT_COLOR_PICKER_SWATCHES: string[] = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6'
];

export const COLOR_PICKER_FORMATS: readonly ColorFormat[] = ['hex', 'rgb', 'hsl', 'oklch'];

export function resolveColorPickerFormat(value?: ColorFormat, fallbackColor?: ColorValue) {
  if (value) {
    return value;
  }

  return resolveColorFormat(fallbackColor, 'hex');
}
