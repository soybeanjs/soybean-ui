import type { DefineComponent, SlotsType } from 'vue';

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];
export type ClassValueProp = {
  class?: ClassValue;
};

export type DataOrientation = 'vertical' | 'horizontal';
export type Direction = 'ltr' | 'rtl';
export type SingleOrMultipleType = 'single' | 'multiple';
export type Side = 'bottom' | 'left' | 'right' | 'top';
export type SlideDirection = 'from-left' | 'from-right' | 'from-bottom' | 'from-top';
export type Align = 'center' | 'end' | 'start';
export type DisclosureState = 'open' | 'closed';
export type DataState = 'on' | 'off';
export type FocusIntent = 'first' | 'last' | 'prev' | 'next';
export type NavigationKeys =
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'End'
  | 'Home'
  | 'PageDown'
  | 'PageUp';
export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';
export type SplitType = 'pick' | 'omit';
export type ActivationMode = 'focus' | 'dblclick' | 'none';
export type SubmitMode = 'blur' | 'enter' | 'none' | 'both';
export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

export interface Point {
  x: number;
  y: number;
}
export type Polygon = Point[];
export type HorizontalSide = 'left' | 'right';
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

// Exclude `boolean` type to prevent type casting
// reference: https://vuejs.org/guide/components/props.html#boolean-casting
export type AcceptableValue = string | number | Record<string, any>;
export type ArrayOrWrapped<T> = T extends any[] ? T : Array<T>;
export type StringOrNumber = string | number;

export type GenericComponentInstance<T> = T extends new (...args: any[]) => infer R
  ? R
  : T extends (...args: any[]) => infer R
    ? R extends { __ctx?: infer K }
      ? Exclude<K, void> extends { expose: (...args: infer Y) => void }
        ? Y[0] & InstanceType<DefineComponent>
        : any
      : any
    : any;

export interface SingleOrMultipleProps<
  ValidValue = AcceptableValue | AcceptableValue[],
  ExplicitType = SingleOrMultipleType
> {
  /**
   * Determines whether a "single" or "multiple" items can be pressed at a time.
   *
   * This prop will be ignored if any of `v-model` or `defaultValue` is defined, as the type will be inferred from the
   * value.
   */
  type?: ValidValue extends string
    ? 'single'
    : ValidValue extends string[]
      ? 'multiple'
      : ExplicitType extends 'single'
        ? 'single'
        : ExplicitType extends 'multiple'
          ? 'multiple'
          : never;

  /**
   * The controlled value of the active item(s).
   *
   * Use this when you need to control the state of the items. Can be bound with `v-model`
   */
  modelValue?: ValidValue;

  /**
   * The default active value of the item(s).
   *
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: ValidValue;
}

export interface FormFieldProps {
  /** The name of the field. Submitted with its owning form as part of a name/value pair. */
  name?: string;
  /** When `true`, indicates that the user must set the value before the owning form can be submitted. */
  required?: boolean;
}

export type DefaultSlots = SlotsType<{
  default: (props?: Record<string, unknown>) => any;
}>;

export type SelectEvent<T = AcceptableValue> = CustomEvent<{ originalEvent: MouseEvent; value?: T }>;

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

export type SwipeEvent = { currentTarget: EventTarget & HTMLElement } & Omit<
  CustomEvent<{ originalEvent: PointerEvent; delta: { x: number; y: number } }>,
  'currentTarget'
>;

export type TreeSelectEvent<T = AcceptableValue> = CustomEvent<{
  originalEvent: PointerEvent | KeyboardEvent;
  value?: T;
  isExpanded: boolean;
  isSelected: boolean;
}>;

export type TreeToggleEvent<T> = CustomEvent<{
  originalEvent: PointerEvent | KeyboardEvent;
  value?: T;
  isExpanded: boolean;
  isSelected: boolean;
}>;

export type InferDefaults<T> = {
  [K in keyof T]?: InferDefault<T, T[K]>;
};
type NativeType = null | number | string | boolean | symbol | Function;
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never);
