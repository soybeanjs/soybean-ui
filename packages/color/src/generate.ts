import { colord } from 'colord';
import type { ColorPalette, ColorPaletteNumber } from './types';

const CMY_HUES = [180, 300, 60];
const RGB_HUES = [360, 240, 120, 0];

function hueShift(hues: number[], hue: number, intensity: number) {
  const closestHue = hues.sort((a, b) => Math.abs(a - hue) - Math.abs(b - hue))[0];

  const hs = closestHue - hue;

  return Math.round(intensity * hs * 0.5);
}

function lighten(hex: string, intensity: number): string {
  if (!hex) {
    return '';
  }

  const { h, s, v } = colord(hex).toHsv();
  const hue = h + hueShift(CMY_HUES, h, intensity);
  const saturation = s - Math.round(s * intensity);
  const value = v + Math.round((100 - v) * intensity);

  return colord({ h: hue, s: saturation, v: value }).toHex();
}

function darken(hex: string, intensity: number): string {
  if (!hex) {
    return '';
  }

  const inverseIntensity = 1 - intensity;
  const { h, s, v } = colord(hex).toHsv();
  const hue = h + hueShift(RGB_HUES, h, inverseIntensity);
  const saturation = s + Math.round((100 - s) * inverseIntensity);
  const value = v - Math.round(v * inverseIntensity);

  return colord({ h: hue, s: saturation, v: value }).toHex();
}

export function generateColorPalette(baseColor: string): ColorPalette {
  const fullColorCode = colord(baseColor).toHex();

  const palette: Partial<ColorPalette> = {
    500: fullColorCode
  };

  const intensityMap: Record<ColorPaletteNumber, number> = {
    50: 0.95,
    100: 0.9,
    200: 0.75,
    300: 0.6,
    400: 0.3,
    500: 1,
    600: 0.9,
    700: 0.75,
    800: 0.6,
    900: 0.45,
    950: 0.29
  };

  const lightNumbers: ColorPaletteNumber[] = [50, 100, 200, 300, 400];
  const darkNumbers: ColorPaletteNumber[] = [600, 700, 800, 900, 950];

  lightNumbers.forEach(level => {
    palette[level] = lighten(fullColorCode, intensityMap[level]);
  });

  darkNumbers.forEach(level => {
    palette[level] = darken(fullColorCode, intensityMap[level]);
  });

  return palette as ColorPalette;
}
