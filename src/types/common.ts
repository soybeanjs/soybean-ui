export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];

export type AcceptableValue = string | number | bigint | null | undefined;
export type AcceptableBooleanValue = AcceptableValue | boolean;

export type DataOrientation = 'vertical' | 'horizontal';
export type Direction = 'ltr' | 'rtl';

export type DisclosureState = 'open' | 'closed';

export type FocusIntent = 'first' | 'last' | 'prev' | 'next';

export type CheckedState = boolean | 'indeterminate';

export type NavigationKey =
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'End'
  | 'Home'
  | 'PageDown'
  | 'PageUp';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type HorizontalSide = Extract<Side, 'left' | 'right'>;

export type Align = 'start' | 'center' | 'end';

export type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

export interface Size {
  width: number;
  height: number;
}

export type Point = { x: number; y: number };

export type Polygon = Point[];

export interface GraceIntent {
  area: Polygon;
  side: HorizontalSide;
}

/**
 * if padding or margin is number, it will be in px if padding or margin is true, it will be var(--scrollbar-width)
 * otherwise, it will be passed string
 */
export type ScrollBodyOption = {
  padding?: boolean | number | string;
  margin?: boolean | number | string;
};

export type SingleOrMultipleType = 'single' | 'multiple';

type GetSingleOrMultipleType<T, S> = T extends AcceptableValue
  ? 'single'
  : T extends AcceptableValue[]
    ? 'multiple'
    : S extends 'single'
      ? 'single'
      : S extends 'multiple'
        ? 'multiple'
        : never;

export interface SingleOrMultipleProps<T = AcceptableValue | NonNullable<AcceptableValue>[], S = SingleOrMultipleType> {
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

export type SingleOrMultipleEmits<T = AcceptableValue | NonNullable<AcceptableValue>[]> = {
  'update:modelValue': [value: T extends NonNullable<AcceptableValue>[] ? T : NonNullable<T>];
};
