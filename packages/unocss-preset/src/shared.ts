import { getColors } from 'theme-colors';

export type ColorPaletteNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export function getColorPalette(color: string) {
  return getColors(color) as Record<ColorPaletteNumber, string>;
}
