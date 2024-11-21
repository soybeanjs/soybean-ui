import type { Ref } from 'vue';
import type { EventHookOn } from '@vueuse/core';
import type { AcceptableValue } from '../../types';
import type { PrimitiveProps } from '../primitive';
import type { TeleportProps } from '../teleport';
import type { PopperAnchorProps, PopperArrowProps, PopperContentProps } from '../popper';
import type { DismissableLayerEmits, DismissableLayerProps } from '../dismissable-layer';
import type {
  ListboxFilterEmits,
  ListboxFilterProps,
  ListboxItemEmits,
  ListboxItemIndicatorProps,
  ListboxItemProps,
  ListboxRootProps,
  ListboxVirtualizerProps
} from '../listbox';
import type { LabelProps, LabelPropsWithPrimitive } from '../label';

export interface ComboboxRootProps<T = AcceptableValue>
  extends Omit<ListboxRootProps<T>, 'orientation' | 'selectionBehavior'> {
  /** The controlled open state of the Combobox. Can be bound-with with `v-model:open`. */
  open?: boolean;
  /**
   * The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open
   * state.
   */
  defaultOpen?: boolean;
  /**
   * Whether to reset the searchTerm when the Combobox input blurred
   *
   * @defaultValue `true`
   */
  resetSearchTermOnBlur?: boolean;
  /** When `true`, disable the default filters */
  ignoreFilter?: boolean;
}

export type ComboboxRootPropsWithPrimitive<T = AcceptableValue> = ComboboxRootProps<T> & PrimitiveProps;

export interface ComboboxRootContext<T> {
  modelValue: Ref<T | Array<T>>;
  multiple: Ref<boolean>;
  disabled: Ref<boolean>;
  open: Ref<boolean>;
  onOpenChange: (value: boolean) => void;
  isUserInputted: Ref<boolean>;
  isVirtual: Ref<boolean>;
  contentId: string;
  inputElement: Ref<HTMLInputElement | undefined>;
  onInputElementChange: (el: HTMLInputElement) => void;
  highlightedElement: Ref<HTMLElement | undefined>;
  parentElement: Ref<HTMLElement | undefined>;
  onResetSearchTerm: EventHookOn;
  allItems: Ref<Map<string, string>>;
  allGroups: Ref<Map<string, Set<string>>>;
  filterState: {
    search: string;
    filtered: { count: number; items: Map<string, number>; groups: Set<string> };
  };
  ignoreFilter: Ref<boolean>;
}

export type ComboboxRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value changes. */
  'update:modelValue': [value: T];
  /** Event handler when highlighted element changes. */
  highlight: [payload: { ref: HTMLElement; value: T } | undefined];
  /** Event handler called when the open state of the combobox changes. */
  'update:open': [value: boolean];
};

// ComboboxItem
export interface ComboboxItemProps<T = AcceptableValue> extends ListboxItemProps<T> {
  /**
   * A string representation of the item contents.
   *
   * If the children are not plain text, then the `textValue` prop must also be set to a plain text representation,
   * which will be used for autocomplete in the ComboBox.
   */
  textValue?: string;
}
export type ComboboxItemPropsWithPrimitive<T = AcceptableValue> = ComboboxItemProps<T> & PrimitiveProps;
export type ComboboxItemEmits<T = AcceptableValue> = ListboxItemEmits<T>;

// ComboboxGroup
export interface ComboboxGroupProps {}
export type ComboboxGroupPropsWithPrimitive = ComboboxGroupProps & PrimitiveProps;

// ComboboxInput
export interface ComboboxInputProps extends ListboxFilterProps {
  /** The display value of input for selected item. Does not work with `multiple`. */
  displayValue?: (val: any) => string;
}
export type ComboboxInputPropsWithPrimitive = ComboboxInputProps & PrimitiveProps;
export type ComboboxInputEmits = ListboxFilterEmits;

// ComboboxContentImpl
export type ComboboxContentPosition = 'inline' | 'popper';
export interface ComboboxContentImplProps extends PopperContentProps, DismissableLayerProps {
  /**
   * The positioning mode to use, <br> `inline` is the default and you can control the position using CSS. <br> `popper`
   * positions content in the same way as our other primitives, for example `Popover` or `DropdownMenu`.
   */
  position?: ComboboxContentPosition;
  /** The document.body will be lock, and scrolling will be disabled. */
  bodyLock?: boolean;
  /**
   * Allow component to be dismissableLayer.
   *
   * @deprecated (Will be removed in version 2.0, use `Listbox` instead)
   */
  dismissable?: boolean;
}
export type ComboboxContentImplPropsWithPrimitive = ComboboxContentImplProps & PrimitiveProps;
export type ComboboxContentImplEmits = DismissableLayerEmits;

// ComboboxContent
export interface ComboboxContentProps extends ComboboxContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type ComboboxContentPropsWithPrimitive = ComboboxContentProps & PrimitiveProps;
export type ComboboxContentEmits = ComboboxContentImplEmits;

export interface ComboboxContentContext {
  position: Ref<ComboboxContentPosition>;
}

// ComboboxItemContext
export interface ComboboxItemContext {
  isSelected: Ref<boolean>;
}

export interface ComboboxGroupContext {
  id: string;
  labelId: string;
}

export type ComboboxVirtualizerProps<T extends AcceptableValue = AcceptableValue> = ListboxVirtualizerProps<T>;

export interface ComboboxViewportProps {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits
   * globally from `ConfigProvider`.
   */
  nonce?: string;
}
export type ComboboxViewportPropsWithPrimitive = ComboboxViewportProps & PrimitiveProps;

export interface ComboboxTriggerProps {
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}
export type ComboboxTriggerPropsWithPrimitive = ComboboxTriggerProps & PrimitiveProps;

export interface ComboboxSeparatorProps {}
export type ComboboxSeparatorPropsWithPrimitive = ComboboxSeparatorProps & PrimitiveProps;

export interface ComboboxPortalProps extends TeleportProps {}

export type ComboboxLabelProps = LabelProps;
export type ComboboxLabelPropsWithPrimitive = LabelPropsWithPrimitive;

export interface ComboboxItemIndicatorProps extends ListboxItemIndicatorProps {}
export type ComboboxItemIndicatorPropsWithPrimitive = ComboboxItemIndicatorProps & PrimitiveProps;

export interface ComboboxEmptyProps {}
export type ComboboxEmptyPropsWithPrimitive = ComboboxEmptyProps & PrimitiveProps;

export interface ComboboxCancelProps {}
export type ComboboxCancelPropsWithPrimitive = ComboboxCancelProps & PrimitiveProps;

export interface ComboboxArrowProps extends PopperArrowProps {}
export type ComboboxArrowPropsWithPrimitive = ComboboxArrowProps & PrimitiveProps;

export interface ComboboxAnchorProps extends PopperAnchorProps {}
export type ComboboxAnchorPropsWithPrimitive = ComboboxAnchorProps & PrimitiveProps;
