import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, Ref, ShallowRef } from 'vue';
import type {
  AcceptableValue,
  ClassValue,
  DefinedValue,
  Direction,
  ForceMountProps,
  FormFieldProps,
  PointerDownOutsideEvent,
  PropsToContext,
  SingleOrMultipleEmits,
  SingleOrMultipleProps,
  SingleOrMultipleValue
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { PopperAnchorProps, PopperArrowProps, PopperContentEmits, PopperContentProps } from '../popper/types';
import type { PortalProps } from '../portal/types';
import type { DividerRootProps } from '../divider/types';

// SelectRoot
export interface SelectRootProps<T extends SingleOrMultipleValue = SingleOrMultipleValue, M extends boolean = false>
  extends SingleOrMultipleProps<T, M>,
    FormFieldProps {
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

export type SelectRootEmits<T extends SingleOrMultipleValue = SingleOrMultipleValue> = SingleOrMultipleEmits<T> & {
  /** Event handler called when the open state of the context menu changes. */
  'update:open': [value: boolean];
};

export interface SelectOption<T = any> {
  value: T;
  disabled?: boolean;
  textContent: string;
}

// SelectPortal
export interface SelectPortalProps extends PortalProps {}

export type SelectPosition = 'item-aligned' | 'popper';

// SelectContentImpl
export interface SelectContentImplProps extends PopperContentProps {
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

export interface SelectTeleportProviderProps extends Pick<SelectContentImplProps, 'position'> {}

// Viewport
export interface SelectViewportProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits
   * globally from `ConfigProvider`.
   */
  nonce?: string;
}

// PopperPosition
export interface SelectPopperPositionProps extends PopperContentProps {}

export type SelectPopperPositionEmits = PopperContentEmits;

// SelectItemAlignedPosition
export interface SelectItemAlignedPositionProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

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
export interface SelectItemProps<T extends DefinedValue = DefinedValue>
  extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
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
export interface SelectSeparatorProps extends DividerRootProps {}

// SelectArrow
export interface SelectArrowProps extends PopperArrowProps {}

// SelectScrollButtonImpl
export interface SelectScrollButtonImplProps extends /** @vue-ignore */ ButtonHTMLAttributes {}

export type SelectScrollButtonImplEmits = {
  autoScroll: [];
};

// SelectScrollDownButton
export interface SelectScrollDownButtonProps extends SelectScrollButtonImplProps {}

// SelectScrollUpButton
export interface SelectScrollUpButtonProps extends SelectScrollButtonImplProps {}

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

export interface SelectRootContextParams
  extends PropsToContext<SelectRootProps, 'dir' | 'autocomplete' | 'disabled' | 'required'> {
  open: ShallowRef<boolean | undefined>;
  modelValue: Ref<AcceptableValue | DefinedValue[]>;
  onModelValueChange: (value: DefinedValue) => void;
  isMultiple: ShallowRef<boolean>;
  isEmptyModelValue: ShallowRef<boolean>;
}

export interface SelectContentContextParams
  extends PropsToContext<SelectContentProps, 'position'>,
    Pick<SelectRootContextParams, 'modelValue' | 'isMultiple'> {
  search: ShallowRef<string>;
}

export interface SelectItemAlignedPositionContextParams {
  contentWrapperElement: ShallowRef<HTMLElement | undefined>;
  shouldExpandOnScroll: ShallowRef<boolean>;
  onScrollButtonChange: (node: HTMLElement | undefined) => void;
}

export interface SelectItemContextParams<T extends DefinedValue = DefinedValue>
  extends PropsToContext<SelectItemProps<T>, 'textValue' | 'disabled'> {
  value: T;
  isSelected: ShallowRef<boolean>;
}

export interface SelectItemCollectionItemData {
  textValue: string;
}

// Theme Context
export type SelectSlot =
  | 'trigger'
  | 'triggerIcon'
  | 'value'
  | 'content'
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

export interface SelectThemeContextParams {
  ui: ComputedRef<Record<SelectSlot, ClassValue>>;
}
