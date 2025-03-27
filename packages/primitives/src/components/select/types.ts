import type { Ref } from 'vue';
import type {
  AcceptableValue,
  ClassValueProp,
  Direction,
  FormFieldProps,
  PointerDownOutsideEvent,
  PrimitiveProps
} from '../../types';
import type { PopperAnchorProps, PopperArrowProps, PopperContentProps } from '../popper';
import type { TeleportProps } from '../teleport';
import type { LabelProps } from '../label';

// SelectRoot
export interface SelectRootProps<T = AcceptableValue> extends FormFieldProps {
  /** The controlled open state of the Select. Can be bind as `v-model:open`. */
  open?: boolean;
  /** The open state of the select when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The value of the select when initially rendered. Use when you do not need to control the state of the Select */
  defaultValue?: T | Array<T>;
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: T | Array<T>;
  /**
   * Use this to compare objects by a particular field, or pass your own comparison function for complete control over
   * how objects are compared.
   */
  by?: string | ((a: T, b: T) => boolean);
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** Whether multiple options can be selected or not. */
  multiple?: boolean;
  /** Native html input `autocomplete` attribute. */
  autocomplete?: string;
  /** When `true`, prevents the user from interacting with Select */
  disabled?: boolean;
}

export type SelectRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value changes. */
  'update:modelValue': [value: T];
  /** Event handler called when the open state of the context menu changes. */
  'update:open': [value: boolean];
};

export interface SelectRootContext<T> {
  triggerElement: Ref<HTMLElement | undefined>;
  onTriggerChange: (node: HTMLElement | undefined) => void;
  valueElement: Ref<HTMLElement | undefined>;
  onValueElementChange: (node: HTMLElement) => void;
  contentId: string;
  modelValue: Ref<T | Array<T> | undefined>;
  onValueChange: (value: T) => void;
  open: Ref<boolean>;
  multiple: Ref<boolean>;
  required?: Ref<boolean>;
  by?: string | ((a: T, b: T) => boolean);
  onOpenChange: (open: boolean) => void;
  dir: Ref<Direction>;
  triggerPointerDownPosRef: Ref<{ x: number; y: number } | null>;
  isEmptyModelValue: Ref<boolean>;
  disabled?: Ref<boolean>;

  optionsSet: Ref<Set<SelectOption>>;
  onOptionAdd: (option: SelectOption) => void;
  onOptionRemove: (option: SelectOption) => void;
}

export interface SelectOption<T = any> {
  value: T;
  disabled?: boolean;
  textContent: string;
}

// SelectProvider
export interface SelectProviderProps {
  context: SelectRootContext<AcceptableValue>;
}

// SelectPortal
export interface SelectPortalProps extends TeleportProps {}

// SelectContentImpl
export interface SelectContentImplProps extends PopperContentProps {
  /**
   * The positioning mode to use
   *
   * `item-aligned (default)` - behaves similarly to a native MacOS menu by positioning content relative to the active
   * item. <br> `popper` - positions content in the same way as our other primitives, for example `Popover` or
   * `DropdownMenu`.
   */
  position?: 'item-aligned' | 'popper';
  /**
   * The document.body will be lock, and scrolling will be disabled.
   *
   * @defaultValue true
   */
  bodyLock?: boolean;
}
export type SelectContentImplPropsWithPrimitive = SelectContentImplProps & PrimitiveProps;

export type SelectContentImplEmits = {
  closeAutoFocus: [event: Event];
  /** Event handler called when the escape key is down. Can be prevented. */
  escapeKeyDown: [event: KeyboardEvent];
  /** Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. */
  pointerDownOutside: [event: PointerDownOutsideEvent];
};

// SelectContent
export interface SelectContentProps extends SelectContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type SelectContentPropsWithPrimitive = SelectContentProps & PrimitiveProps;

export type SelectContentEmits = SelectContentImplEmits;

export interface SelectContentContext {
  content?: Ref<HTMLElement | undefined>;
  viewport?: Ref<HTMLElement | undefined>;
  onViewportChange: (node: HTMLElement | undefined) => void;
  itemRefCallback: (node: HTMLElement | undefined, value: AcceptableValue, disabled: boolean) => void;
  selectedItem?: Ref<HTMLElement | undefined>;
  onItemLeave?: () => void;
  itemTextRefCallback: (node: HTMLElement | undefined, value: AcceptableValue, disabled: boolean) => void;
  focusSelectedItem?: () => void;
  selectedItemText?: Ref<HTMLElement | undefined>;
  position?: 'item-aligned' | 'popper';
  isPositioned?: Ref<boolean>;
  searchRef?: Ref<string>;
}

// Viewport
export interface SelectViewportProps extends ClassValueProp {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits
   * globally from `ConfigProvider`.
   */
  nonce?: string;
}
export type SelectViewportPropsWithPrimitive = SelectViewportProps & PrimitiveProps;

// PopperPosition
export interface SelectPopperPositionProps extends PopperContentProps {}
export type SelectPopperPositionPropsWithPrimitive = SelectPopperPositionProps & PrimitiveProps;

// SelectGroup
export interface SelectGroupProps extends ClassValueProp {}
export type SelectGroupPropsWithPrimitive = SelectGroupProps & PrimitiveProps;

export interface SelectGroupContext {
  id: string;
}

// SelectTrigger
export interface SelectTriggerProps extends PopperAnchorProps {
  disabled?: boolean;
}
export type SelectTriggerPropsWithPrimitive = SelectTriggerProps & PrimitiveProps;

// SelectItem
export interface SelectItemProps<T = AcceptableValue> extends ClassValueProp {
  /** The value given as data when submitted with a `name`. */
  value: T;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
  /**
   * Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the
   * `SelectItemText` part. Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
}
export type SelectItemPropsWithPrimitive<T = AcceptableValue> = SelectItemProps<T> & PrimitiveProps;
export type SelectItemEvent<T> = CustomEvent<{ originalEvent: PointerEvent | KeyboardEvent; value?: T }>;
export type SelectItemEmits<T = AcceptableValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectItemEvent<T>];
};

export interface SelectItemContext<T = AcceptableValue> {
  value: T;
  textId: string;
  disabled: Ref<boolean>;
  isSelected: Ref<boolean>;
  onItemTextChange: (node: HTMLElement | undefined) => void;
}

// SelectLabel
export interface SelectLabelProps extends LabelProps {}
export type SelectLabelPropsWithPrimitive = SelectLabelProps & PrimitiveProps;

// SelectItemText
export interface SelectItemTextProps extends ClassValueProp {}
export type SelectItemTextPropsWithPrimitive = SelectItemTextProps & PrimitiveProps;

// SelectItemIndicator
export interface SelectItemIndicatorProps extends ClassValueProp {}
export type SelectItemIndicatorPropsWithPrimitive = SelectItemIndicatorProps & PrimitiveProps;

// SelectItemAlignedPosition
export interface SelectItemAlignedPositionProps extends ClassValueProp {}
export type SelectItemAlignedPositionPropsWithPrimitive = SelectItemAlignedPositionProps & PrimitiveProps;

export type SelectItemAlignedPositionEmits = {
  placed: [];
};

export interface SelectItemAlignedPositionContext {
  contentWrapper?: Ref<HTMLElement | undefined>;
  shouldExpandOnScrollRef?: Ref<boolean>;
  onScrollButtonChange: (node: HTMLElement | undefined) => void;
}

// SelectValue
export interface SelectValueProps extends ClassValueProp {
  /** The content that will be rendered inside the `SelectValue` when no `value` or `defaultValue` is set. */
  placeholder?: string;
}
export type SelectValuePropsWithPrimitive = SelectValueProps & PrimitiveProps;

// SelectIcon
export interface SelectIconProps extends ClassValueProp {}
export type SelectIconPropsWithPrimitive = SelectIconProps & PrimitiveProps;

// SelectSeparator
export interface SelectSeparatorProps extends ClassValueProp {}
export type SelectSeparatorPropsWithPrimitive = SelectSeparatorProps & PrimitiveProps;

// SelectArrow
export interface SelectArrowProps extends PopperArrowProps {}
export type SelectArrowPropsWithPrimitive = SelectArrowProps & PrimitiveProps;

// SelectScrollButtonImpl
export type SelectScrollButtonImplEmits = {
  autoScroll: [];
};

// SelectScrollDownButton
export interface SelectScrollDownButtonProps extends ClassValueProp {}
export type SelectScrollDownButtonPropsWithPrimitive = SelectScrollDownButtonProps & PrimitiveProps;

// SelectScrollUpButton
export interface SelectScrollUpButtonProps extends ClassValueProp {}
export type SelectScrollUpButtonPropsWithPrimitive = SelectScrollUpButtonProps & PrimitiveProps;

// BubbleSelect
export interface BubbleSelectProps {
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name?: string;
  required?: boolean;
  size?: number;
  value?: any;
}
