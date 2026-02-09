import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  DefinedValue,
  Direction,
  DismissableLayerProps,
  ForceMountProps,
  FormFieldCommonProps,
  MaybeArray,
  PointerDownOutsideEvent,
  PropsToContext,
  SelectionEmits,
  SelectionProps,
  UiClass
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { PopperAnchorProps, PopperPositionerProps } from '../popper/types';

// SelectRoot
export interface SelectRootProps<T extends DefinedValue = DefinedValue, M extends boolean = false>
  extends SelectionProps<M, T>, FormFieldCommonProps {
  /** The controlled open state of the Select. Can be bind as `v-model:open`. */
  open?: boolean;
  /** The open state of the select when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** Native html input `autocomplete` attribute. */
  autocomplete?: string;
  /** When `true`, prevents the user from interacting with Select */
  disabled?: boolean;
}

export type SelectRootEmits<T extends DefinedValue = DefinedValue, M extends boolean = false> = SelectionEmits<M, T> & {
  /** Event handler called when the open state of the context menu changes. */
  'update:open': [value: boolean];
};

export interface SelectOption {
  value: DefinedValue;
  disabled?: boolean;
  textContent: string;
}

export interface SelectPopupProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectItemAlignedPosition
export interface SelectItemAlignedPositionProps extends /** @vue-ignore */ HTMLAttributes {}

export type SelectPosition = 'item-aligned' | 'popper';

// SelectContentImpl
export interface SelectContentImplProps extends PopperPositionerProps, DismissableLayerProps {
  /**
   * The positioning mode to use
   *
   * `item-aligned (default)` - behaves similarly to a native MacOS menu by positioning content relative to the active
   * item. <br> `popper` - positions content in the same way as our other primitives, for example `Popover` or
   * `DropdownMenu`.
   */
  position?: SelectPosition;
  /**
   * The document.body will be lock, and scrolling will be disabled.
   *
   * @defaultValue true
   */
  bodyLock?: boolean;
  popupProps?: SelectPopupProps;
}

export type SelectContentImplEmits = {
  closeAutoFocus: [event: Event];
  /** Event handler called when the escape key is down. Can be prevented. */
  escapeKeyDown: [event: KeyboardEvent];
  /** Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. */
  pointerDownOutside: [event: PointerDownOutsideEvent];
};

// SelectContent
export interface SelectContentProps extends SelectContentImplProps, ForceMountProps {}

export type SelectContentEmits = SelectContentImplEmits;

export interface SelectTeleportProviderProps extends Pick<SelectContentImplProps, 'position'> {
  popupElement?: HTMLElement;
}

// Viewport
export interface SelectViewportProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits
   * globally from `ConfigProvider`.
   */
  nonce?: string;
}

// SelectGroup
export interface SelectGroupProps extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {}

// SelectGroupLabel
export interface SelectGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectTrigger
export interface SelectTriggerProps extends PopperAnchorProps {
  disabled?: boolean;
}

// SelectTriggerIcon
export interface SelectTriggerIconProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectItem
export interface SelectItemProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  /** The value given as data when submitted with a `name`. */
  value: DefinedValue;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
  /**
   * Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the
   * `SelectItemText` part. Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
}

export type SelectItemEvent<T extends DefinedValue = DefinedValue> = CustomEvent<{
  originalEvent: PointerEvent | KeyboardEvent;
  value: T;
}>;
export type SelectItemEmits<T extends DefinedValue = DefinedValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectItemEvent<T>];
};

// SelectItemText
export interface SelectItemTextProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectItemIndicator
export interface SelectItemIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export type SelectItemAlignedPositionEmits = {
  placed: [];
};

// SelectValue
export interface SelectValueProps extends /** @vue-ignore */ HTMLAttributes {
  /** The content that will be rendered inside the `SelectValue` when no `value` or `defaultValue` is set. */
  placeholder?: string;
}

// SelectSeparator
export interface SelectSeparatorProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectScrollButtonImpl
export interface SelectScrollButtonImplProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export type SelectScrollButtonImplEmits = {
  autoScroll: [];
};

// SelectScrollDownButton
export interface SelectScrollDownButtonProps extends SelectScrollButtonImplProps {}

// SelectScrollUpButton
export interface SelectScrollUpButtonProps extends SelectScrollButtonImplProps {}

// BubbleSelect
export interface SelectBubbleSelectProps {
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

export interface SelectRootContextParams extends PropsToContext<
  SelectRootProps,
  'dir' | 'autocomplete' | 'disabled' | 'required'
> {
  open: ShallowRef<boolean | undefined>;
  modelValue: ShallowRef<MaybeArray<DefinedValue> | undefined>;
  onModelValueChange: (value: DefinedValue) => void;
  isMultiple: ComputedRef<boolean>;
  isEmptyModelValue: ComputedRef<boolean>;
}

export interface SelectContentContextParams
  extends PropsToContext<SelectContentProps, 'position'>, Pick<SelectRootContextParams, 'modelValue' | 'isMultiple'> {
  search: ShallowRef<string>;
  popupElement: ShallowRef<HTMLElement | undefined>;
}

export interface SelectItemAlignedPositionContextParams {
  positionerElement: ShallowRef<HTMLElement | undefined>;
  shouldExpandOnScroll: ShallowRef<boolean>;
  onScrollButtonChange: (node: HTMLElement | undefined) => void;
}

export interface SelectItemContextParams extends PropsToContext<SelectItemProps, 'textValue' | 'disabled'> {
  value: DefinedValue;
  isSelected: ComputedRef<boolean>;
}

export interface SelectItemCollectionItemData {
  textValue: string;
}

// Theme Context
export type SelectUiSlot =
  | 'trigger'
  | 'triggerIcon'
  | 'value'
  | 'positioner'
  | 'popup'
  | 'viewport'
  | 'group'
  | 'groupLabel'
  | 'item'
  | 'itemText'
  | 'itemIndicator'
  | 'separator'
  | 'scrollUpButton'
  | 'scrollDownButton'
  | 'arrow';

export type SelectUi = UiClass<SelectUiSlot>;

export type { PopperArrowProps as SelectArrowProps } from '../popper/types';
