import type { Ref } from 'vue';
import type { ClassValueProp, DataOrientation, Direction, PrimitiveProps, StringOrNumber } from '../../types';

// Root
export interface TabsRootProps<T extends StringOrNumber = StringOrNumber> extends ClassValueProp {
  /**
   * The value of the tab that should be active when initially rendered. Use when you do not need to control the state
   * of the tabs
   */
  defaultValue?: T;
  /**
   * The orientation the tabs are laid out. Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   *
   * @defaultValue horizontal
   */
  orientation?: DataOrientation;
  /**
   * The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /**
   * Whether a tab is activated automatically (on focus) or manually (on click).
   *
   * @defaultValue automatic
   */
  activationMode?: 'automatic' | 'manual';
  /** The controlled value of the tab to activate. Can be bind as `v-model`. */
  modelValue?: T;
  /**
   * When `true`, the element will be unmounted on closed state.
   *
   * @defaultValue `true`
   */
  unmountOnHide?: boolean;
}
export type TabsRootPropsWithPrimitive<T extends StringOrNumber = StringOrNumber> = TabsRootProps<T> & PrimitiveProps;

export type TabsRootEmits<T extends StringOrNumber = StringOrNumber> = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: T];
};

export type TabsRootContext<T extends StringOrNumber = StringOrNumber> = {
  modelValue: Ref<T | undefined>;
  changeModelValue: (value: T) => void;
  orientation: Ref<DataOrientation>;
  dir: Ref<Direction>;
  unmountOnHide: Ref<boolean>;
  activationMode: 'automatic' | 'manual';
  baseId: string;
  tabsList: Ref<HTMLElement | undefined>;
};

// List
export interface TabsListProps extends ClassValueProp {
  /** When `true`, keyboard navigation will loop from last tab to first, and vice versa. */
  loop?: boolean;
}
export type TabsListPropsWithPrimitive = TabsListProps & PrimitiveProps;

// Content
export interface TabsContentProps extends ClassValueProp {
  /** A unique value that associates the content with a trigger. */
  value: StringOrNumber;
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type TabsContentPropsWithPrimitive = TabsContentProps & PrimitiveProps;

// Trigger
export interface TabsTriggerProps extends ClassValueProp {
  /** A unique value that associates the trigger with a content. */
  value: StringOrNumber;
  /** When `true`, prevents the user from interacting with the tab. */
  disabled?: boolean;
}
export type TabsTriggerPropsWithPrimitive = TabsTriggerProps & PrimitiveProps;

// Indicator
export interface TabsIndicatorProps extends ClassValueProp {}
export type TabsIndicatorPropsWithPrimitive = TabsIndicatorProps & PrimitiveProps;
