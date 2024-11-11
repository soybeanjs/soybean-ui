export type { ThemeColor, ThemeOrientation, ThemeSize, ThemeAlign, ThemeSide } from '@soybean-ui/variants';

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];

export type ClassValueProp = {
  class?: ClassValue;
};

export type SingleOrMultipleType = 'single' | 'multiple';

export type StringOrNumber = string | number;
