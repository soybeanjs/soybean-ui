import type { FocusOutsideEvent, PointerDownOutsideEvent } from 'radix-vue/dist/DismissableLayer';

import type { ThemeColor, ThemeOrientation, ThemeSize } from '@soybean-ui/variants';

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];

export type SingleOrMultipleType = 'single' | 'multiple';

export type { ThemeColor, ThemeOrientation, ThemeSize, FocusOutsideEvent, PointerDownOutsideEvent };

export type PrimitiveUnion = string | number | boolean;
