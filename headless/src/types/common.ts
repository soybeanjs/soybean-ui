export type PrimitiveType = null | undefined | string | number | boolean | symbol | bigint;

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];

export type DefinedValue = string | number;
export type AcceptableValue = DefinedValue | null | undefined;
export type AcceptableBooleanValue = AcceptableValue | boolean;

export type MaybeArray<T> = T | Array<T>;
export type MaybePromise<T> = T | Promise<T>;

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

export type KbdKey =
  | 'meta'
  | 'ctrl'
  | 'alt'
  | 'win'
  | 'command'
  | 'shift'
  | 'option'
  | 'enter'
  | 'delete'
  | 'backspace'
  | 'escape'
  | 'tab'
  | 'capslock'
  | 'arrowup'
  | 'arrowright'
  | 'arrowdown'
  | 'arrowleft'
  | 'pageup'
  | 'pagedown'
  | 'home'
  | 'end';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

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

export interface SelectionProps<M extends boolean = false, N extends DefinedValue = string> {
  /**
   * The controlled value of the selected item(s).
   *
   * Use this when you need to control the state of the items. Can be bound with `v-model`
   */
  modelValue?: M extends true ? N[] : N;
  /**
   * The default value of the selected item(s).
   *
   * Use this when you need to set the initial state of the items.
   */
  defaultValue?: M extends true ? N[] : N;
  /**
   * Determines whether a "single" or "multiple" items can be selected at a time.
   *
   * This prop will overwrite the inferred type from `modelValue` and `defaultValue`.
   */
  multiple?: M;
}

export type SelectionEmits<M extends boolean = false, N extends DefinedValue = string> = {
  'update:modelValue': [value: M extends true ? N[] : N];
};
