import type { ComponentPublicInstance, ComputedRef } from 'vue';

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];
export type ClassValueProp = {
  /** class name */
  class?: ClassValue;
};

export type StringOrNumber = string | number;
export type AcceptableValue = StringOrNumber | null | undefined;

export type DataOrientation = 'vertical' | 'horizontal';
export type Direction = 'ltr' | 'rtl';

/**
 * if padding or margin is number, it will be in px if padding or margin is true, it will be var(--scrollbar-width)
 * otherwise, it will be passed string
 */
export type ScrollBodyOption = {
  padding?: boolean | number | string;
  margin?: boolean | number | string;
};

export type PropsToContext<T, K extends keyof T = keyof T> = {
  [P in K]-?: ComputedRef<T[P]>;
};
export type VNodeRef = Element | ComponentPublicInstance | null | undefined;

export type OpenState = 'open' | 'closed';

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

type GetSingleOrMultipleType<T, S> = T extends AcceptableValue
  ? 'single'
  : T extends AcceptableValue[]
    ? 'multiple'
    : S extends 'single'
      ? 'single'
      : S extends 'multiple'
        ? 'multiple'
        : never;

export type SingleOrMultipleType = 'single' | 'multiple';
export interface SingleOrMultipleProps<T = AcceptableValue | AcceptableValue[], S = SingleOrMultipleType> {
  /**
   * Determines whether a "single" or "multiple" items can be selected at a time.
   *
   * This prop will overwrite the inferred type from `modelValue` and `defaultValue`.
   */
  type?: GetSingleOrMultipleType<T, S>;
  /**
   * The controlled value of the active item(s).
   *
   * Use this when you need to control the state of the items. Can be bound with `v-model`
   */
  modelValue?: T;
  /**
   * The default value of the active item(s).
   *
   * Use this when you need to set the initial state of the items.
   */
  defaultValue?: T;
}
export type SingleOrMultipleEmits<T = AcceptableValue | AcceptableValue[]> = {
  'update:modelValue': [value: T];
};
