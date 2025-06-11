import type { Component, DefineComponent, SlotsType, VNode } from 'vue';

export type AsTag =
  | 'a'
  | 'button'
  | 'div'
  | 'form'
  | 'h2'
  | 'h3'
  | 'img'
  | 'input'
  | 'label'
  | 'li'
  | 'nav'
  | 'ol'
  | 'p'
  | 'span'
  | 'svg'
  | 'ul'
  | 'template'
  | ({} & string);

export interface PrimitiveProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read our [Composition](https://www.soybean-ui.com/docs/guides/composition) guide for more details.
   */
  asChild?: boolean;
  /**
   * The element or component this component should render as. Can be overwrite by `asChild`
   *
   * @defaultValue 'div'
   */
  as?: AsTag | Component;
}

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];
export type ClassValueProp = {
  /** class name */
  class?: ClassValue;
};
export type StringOrVNode = string | VNode | (() => VNode);

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
export type ImageCrossOrigin = 'anonymous' | 'use-credentials' | '';
export type SplitType = 'pick' | 'omit';
export type ActivationMode = 'focus' | 'dblclick' | 'none';
export type SubmitMode = 'blur' | 'enter' | 'none' | 'both';
export type SwipeDirection = 'up' | 'down' | 'left' | 'right';
export type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';
export type AnchorTarget = '_blank' | '_parent' | '_self' | '_top' | (string & {}) | undefined;
export type AnchorRel = 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null;
export type CheckAction = 'check' | 'uncheck';

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
export type AcceptableValue = string | number | bigint | Record<string, any> | null;
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

export interface SingleOrMultipleProps<T = AcceptableValue | AcceptableValue[]> {
  /**
   * Determines whether a "single" or "multiple" items can be selected at a time.
   *
   * This prop will overwrite the inferred type from `modelValue` and `defaultValue`.
   */
  type?: SingleOrMultipleType;

  /**
   * The controlled value of the active item(s).
   *
   * Use this when you need to control the state of the items. Can be binded with `v-model`
   */
  modelValue?: T;

  /**
   * The default active value of the item(s).
   *
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: T;
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

export type MaybeArray<T> = T | T[];
