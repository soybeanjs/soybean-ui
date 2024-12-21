import type { Ref } from 'vue';
import type { EventHook } from '@vueuse/core';
import type { VirtualItem, Virtualizer } from '@tanstack/vue-virtual';
import type {
  AcceptableValue,
  ClassValueProp,
  DataOrientation,
  Direction,
  FormFieldProps,
  SelectEvent
} from '../../types';
import type { PrimitiveProps } from '../primitive';
import type { LabelProps } from '../label';

export interface ListboxRootProps<T = AcceptableValue> extends ClassValueProp, FormFieldProps {
  /** The controlled value of the listbox. Can be bound-with with `v-model`. */
  modelValue?: T | Array<T>;
  /** The value of the listbox when initially rendered. Use when you do not need to control the state of the Listbox */
  defaultValue?: T | Array<T>;
  /** Whether multiple options can be selected or not. */
  multiple?: boolean;
  /** The orientation of the listbox. <br>Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: DataOrientation;
  /**
   * The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with listbox */
  disabled?: boolean;
  /**
   * How multiple selection should behave in the collection.
   *
   * @defaultValue 'toggle'
   */
  selectionBehavior?: 'toggle' | 'replace';
  /** When `true`, hover over item will trigger highlight */
  highlightOnHover?: boolean;
  /**
   * Use this to compare objects by a particular field, or pass your own comparison function for complete control over
   * how objects are compared.
   */
  by?: string | ((a: T, b: T) => boolean);
}
export type ListboxRootPropsWithPrimitive<T = AcceptableValue> = ListboxRootProps<T> & PrimitiveProps;

export type ListboxRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value changes. */
  'update:modelValue': [value: T];
  /** Event handler when highlighted element changes. */
  highlight: [payload: { ref: HTMLElement; value: T } | undefined];
  /** Event handler called when container is being focused. Can be prevented. */
  entryFocus: [event: CustomEvent];
  /** Event handler called when the mouse leave the container */
  leave: [event: Event];
};

export type ListboxRootContext<T = AcceptableValue> = {
  modelValue: Ref<T | Array<T> | undefined>;
  onValueChange: (val: T) => void;
  multiple: Ref<boolean>;
  orientation: Ref<DataOrientation>;
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  highlightOnHover: Ref<boolean>;
  highlightedElement: Ref<HTMLElement | null>;
  isVirtual: Ref<boolean>;
  virtualFocusHook: EventHook<Event | null | undefined>;
  virtualKeydownHook: EventHook<KeyboardEvent>;
  virtualHighlightHook: EventHook<any>;
  by?: string | ((a: T, b: T) => boolean);
  firstValue?: Ref<T | undefined>;
  selectionBehavior?: Ref<'toggle' | 'replace'>;
  focusable: Ref<boolean>;
  onLeave: (event: Event) => void;
  onEnter: (event: Event) => void;
  changeHighlight: (el: HTMLElement, scrollIntoView?: boolean) => void;
  onKeydownNavigation: (event: KeyboardEvent) => void;
  onKeydownEnter: (event: KeyboardEvent) => void;
  onKeydownTypeahead: (event: KeyboardEvent) => void;
  highlightFirstItem: (event: InputEvent) => void;
};

export interface ListboxItemProps<T = AcceptableValue> extends ClassValueProp {
  /** The value given as data when submitted with a `name`. */
  value: T;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
}
export type ListboxItemPropsWithPrimitive<T = AcceptableValue> = ListboxItemProps<T> & PrimitiveProps;

export type ListboxItemEmits<T = AcceptableValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<T>];
};

export interface ListboxItemContext {
  isSelected: Ref<boolean>;
}

export interface ListboxItemIndicatorProps extends ClassValueProp {}
export type ListboxItemIndicatorPropsWithPrimitive = ListboxItemIndicatorProps & PrimitiveProps;

export interface ListboxGroupProps extends ClassValueProp {}
export type ListboxGroupPropsWithPrimitive = ListboxGroupProps & PrimitiveProps;

export interface ListboxGroupContext {
  id: string;
}

export interface ListboxGroupLabelProps extends LabelProps {}
export type ListboxGroupLabelPropsWithPrimitive = ListboxGroupLabelProps & PrimitiveProps;

export interface ListboxFilterProps extends ClassValueProp {
  /** The controlled value of the filter. Can be bound-with with v-model. */
  modelValue?: string;
  /** Focus on element when mounted. */
  autoFocus?: boolean;
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}
export type ListboxFilterPropsWithPrimitive = ListboxFilterProps & PrimitiveProps;

export type ListboxFilterEmits = {
  'update:modelValue': [string];
};

export interface ListboxContentProps extends ClassValueProp {}
export type ListboxContentPropsWithPrimitive = ListboxContentProps & PrimitiveProps;

export interface ListboxVirtualizerProps<T extends AcceptableValue = AcceptableValue> {
  /** List of items */
  options: T[];
  /** Number of items rendered outside the visible area */
  overscan?: number;
  /** Estimated size (in px) of each item */
  estimateSize?: number;
  /** Text content for each item to achieve type-ahead feature */
  textContent?: (option: T) => string;
}

export type ListboxVirtualizerSlotsProps<T extends AcceptableValue = AcceptableValue> = {
  option: T;
  virtualizer: Virtualizer<Element | Window, Element>;
  virtualItem: VirtualItem;
};

export type ListboxVirtualizerSlots<T extends AcceptableValue = AcceptableValue> = {
  default: (props: ListboxVirtualizerSlotsProps<T>) => any;
};
