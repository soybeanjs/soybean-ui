import type { ThemeSize } from './types';

export const themeSizeMap: Record<ThemeSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24
};

export const themeSizeRatio = Object.fromEntries(
  Object.entries(themeSizeMap).map(([key, value]) => [key, value / themeSizeMap.md])
) as Record<ThemeSize, number>;
