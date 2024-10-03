export type { FocusOutsideEvent, PointerDownOutsideEvent } from 'radix-vue/dist/DismissableLayer';
export type { ThemeColor, ThemeOrientation, ThemeSize, ThemeAlign } from '@soybean-ui/variants';

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];

export type ClassValueProp = {
  class?: ClassValue;
};

export type SingleOrMultipleType = 'single' | 'multiple';

export type StringOrNumber = string | number;
