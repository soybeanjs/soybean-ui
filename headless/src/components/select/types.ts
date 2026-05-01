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
import type { IconValue } from '../_icon/types';
import type { PrimitiveProps } from '../primitive/types';
import type { PopperAnchorProps, PopperArrowProps, PopperPositionerProps } from '../popper/types';
import type { PortalProps } from '../portal/types';

// SelectRoot
/**
 * Props for the select root component.
 */
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

/**
 * Emits for the select root component.
 */
export type SelectRootEmits<T extends DefinedValue = DefinedValue, M extends boolean = false> = SelectionEmits<M, T> & {
  /** Event handler called when the open state of the context menu changes. */
  'update:open': [value: boolean];
};

/**
 * Type information for the select option component.
 */
export interface SelectOption {
  /**
   * Value associated with the current item.
   */
  value: DefinedValue;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Text content.
   */
  textContent: string;
}

/**
 * Props for the select popup component.
 */
export interface SelectPopupProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectItemAlignedPosition
/**
 * Props for the select item aligned position component.
 */
export interface SelectItemAlignedPositionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Type information for the select position component.
 */
export type SelectPosition = 'item-aligned' | 'popper';

// SelectContentImpl
/**
 * Props for the select content impl component.
 */
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
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: SelectPopupProps;
}

/**
 * Emits for the select content impl component.
 */
export type SelectContentImplEmits = {
  /**
   * Emitted when close auto focus occurs.
   */
  closeAutoFocus: [event: Event];
  /** Event handler called when the escape key is down. Can be prevented. */
  escapeKeyDown: [event: KeyboardEvent];
  /** Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. */
  pointerDownOutside: [event: PointerDownOutsideEvent];
};

// SelectContent
/**
 * Props for the select content component.
 */
export interface SelectContentProps extends SelectContentImplProps, ForceMountProps {}

/**
 * Emits for the select content component.
 */
export type SelectContentEmits = SelectContentImplEmits;

/**
 * Props for the select teleport provider component.
 */
export interface SelectTeleportProviderProps extends Pick<SelectContentImplProps, 'position'> {
  /**
   * Popup element.
   */
  popupElement?: HTMLElement;
}

// Viewport
/**
 * Props for the select viewport component.
 */
export interface SelectViewportProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits
   * globally from `ConfigProvider`.
   */
  nonce?: string;
}

// SelectGroup
/**
 * Props for the select group component.
 */
export interface SelectGroupProps extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {}

// SelectGroupLabel
/**
 * Props for the select group label component.
 */
export interface SelectGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectTrigger
/**
 * Props for the select trigger component.
 */
export interface SelectTriggerProps extends PopperAnchorProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

// SelectTriggerIcon
/**
 * Props for the select trigger icon component.
 */
export interface SelectTriggerIconProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectItem
/**
 * Props for the select item component.
 */
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

/**
 * Type information for the select item event component.
 */
export type SelectItemEvent<T extends DefinedValue = DefinedValue> = CustomEvent<{
  /**
   * Original event.
   */
  originalEvent: PointerEvent | KeyboardEvent;
  /**
   * Value associated with the current item.
   */
  value: T;
}>;
/**
 * Emits for the select item component.
 */
export type SelectItemEmits<T extends DefinedValue = DefinedValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectItemEvent<T>];
};

// SelectItemText
/**
 * Props for the select item text component.
 */
export interface SelectItemTextProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectItemIndicator
/**
 * Props for the select item indicator component.
 */
export interface SelectItemIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Emits for the select item aligned position component.
 */
export type SelectItemAlignedPositionEmits = {
  /**
   * Emitted when placed occurs.
   */
  placed: [];
};

/**
 * Option data for the select single component.
 */
export interface SelectSingleOptionData<T extends DefinedValue = DefinedValue> extends Pick<
  SelectItemProps,
  'disabled' | 'textValue'
> {
  /**
   * Value associated with the current item.
   */
  value: T;
  /**
   * Icon rendered by the component.
   */
  icon?: IconValue;
  /**
   * Label text rendered by the component.
   */
  label: string;
  /**
   * Whether separator.
   */
  separator?: boolean;
}

/**
 * Option data for the select group component.
 */
export interface SelectGroupOptionData<T extends DefinedValue = DefinedValue> extends Pick<
  SelectSingleOptionData<T>,
  'label' | 'separator'
> {
  /**
   * Items rendered by the component.
   */
  items: SelectSingleOptionData<T>[];
}

/**
 * Option data for the select component.
 */
export type SelectOptionData<T extends DefinedValue = DefinedValue> =
  | SelectSingleOptionData<T>
  | SelectGroupOptionData<T>;

/**
 * Props for the select compact component.
 */
export interface SelectCompactProps<
  T extends DefinedValue = DefinedValue,
  M extends boolean = false
> extends SelectRootProps<T, M> {
  /**
   * Items rendered by the component.
   */
  items: SelectOptionData<T>[];
  /**
   * Whether to show an arrow.
   */
  showArrow?: boolean;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: SelectTriggerProps;
  /**
   * Props forwarded to the trigger icon element.
   */
  triggerIconProps?: SelectTriggerIconProps;
  /**
   * Placeholder.
   */
  placeholder?: string;
  /**
   * Props forwarded to the value element.
   */
  valueProps?: SelectValueProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: PortalProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: SelectContentProps;
  /**
   * Placement.
   */
  placement?: PopperPositionerProps['placement'];
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: SelectPopupProps;
  /**
   * Props forwarded to the viewport element.
   */
  viewportProps?: SelectViewportProps;
  /**
   * Props forwarded to the scroll down button element.
   */
  scrollDownButtonProps?: SelectScrollDownButtonProps;
  /**
   * Props forwarded to the scroll up button element.
   */
  scrollUpButtonProps?: SelectScrollUpButtonProps;
  /**
   * Props forwarded to the group element.
   */
  groupProps?: SelectGroupProps;
  /**
   * Props forwarded to the group label element.
   */
  groupLabelProps?: SelectGroupLabelProps;
  /**
   * Props forwarded to the item element.
   */
  itemProps?: SelectItemProps;
  /**
   * Props forwarded to the item text element.
   */
  itemTextProps?: SelectItemTextProps;
  /**
   * Props forwarded to the item indicator element.
   */
  itemIndicatorProps?: SelectItemIndicatorProps;
  /**
   * Props forwarded to the separator element.
   */
  separatorProps?: SelectSeparatorProps;
  /**
   * Props forwarded to the arrow element.
   */
  arrowProps?: PopperArrowProps;
}

/**
 * Emits for the select compact component.
 */
export type SelectCompactEmits<T extends DefinedValue = DefinedValue, M extends boolean = false> = SelectRootEmits<
  T,
  M
> &
  SelectContentEmits &
  SelectItemEmits<T>;

type SelectCompactModelValue<T extends DefinedValue = DefinedValue, M extends boolean = false> =
  | (M extends true ? T[] : T)
  | undefined;

/**
 * Slot props for the select compact trigger value component.
 */
export interface SelectCompactTriggerValueSlotProps<T extends DefinedValue = DefinedValue, M extends boolean = false> {
  /**
   * Current model value.
   */
  modelValue: SelectCompactModelValue<T, M>;
  /**
   * Selected label exposed in the slot scope.
   */
  selectedLabel: string[];
  /**
   * Slot text exposed in the slot scope.
   */
  slotText: string;
}

/**
 * Slot props for the select compact group label component.
 */
export interface SelectCompactGroupLabelSlotProps<T extends DefinedValue = DefinedValue> {
  /**
   * Current item data.
   */
  item: SelectGroupOptionData<T>;
}

/**
 * Slot props for the select compact item component.
 */
export interface SelectCompactItemSlotProps<T extends DefinedValue = DefinedValue> {
  /**
   * Current item data.
   */
  item: SelectSingleOptionData<T>;
}

/**
 * Slots for the select compact component.
 */
export type SelectCompactSlots<T extends DefinedValue = DefinedValue, M extends boolean = false> = {
  /**
   * Custom content for the trigger leading slot.
   */
  'trigger-leading'?: () => any;
  /**
   * Custom content for the trigger value slot.
   */
  'trigger-value'?: (props: SelectCompactTriggerValueSlotProps<T, M>) => any;
  /**
   * Custom content for the trigger trailing slot.
   */
  'trigger-trailing'?: () => any;
  /**
   * Custom content for the trigger icon slot.
   */
  'trigger-icon'?: () => any;
  /**
   * Custom content for the scroll up button slot.
   */
  'scroll-up-button'?: () => any;
  /**
   * Custom content for the scroll down button slot.
   */
  'scroll-down-button'?: () => any;
  /**
   * Custom content for the group label slot.
   */
  'group-label'?: (props: SelectCompactGroupLabelSlotProps<T>) => any;
  /**
   * Custom content for the item text slot.
   */
  'item-text'?: (props: SelectCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the item leading slot.
   */
  'item-leading'?: (props: SelectCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the item trailing slot.
   */
  'item-trailing'?: (props: SelectCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the item indicator slot.
   */
  'item-indicator'?: (props: SelectCompactItemSlotProps<T>) => any;
};

// SelectValue
/**
 * Props for the select value component.
 */
export interface SelectValueProps extends /** @vue-ignore */ HTMLAttributes {
  /** The content that will be rendered inside the `SelectValue` when no `value` or `defaultValue` is set. */
  placeholder?: string;
}

// SelectSeparator
/**
 * Props for the select separator component.
 */
export interface SelectSeparatorProps extends /** @vue-ignore */ HTMLAttributes {}

// SelectScrollButtonImpl
/**
 * Props for the select scroll button impl component.
 */
export interface SelectScrollButtonImplProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

/**
 * Emits for the select scroll button impl component.
 */
export type SelectScrollButtonImplEmits = {
  /**
   * Emitted when auto scroll occurs.
   */
  autoScroll: [];
};

// SelectScrollDownButton
/**
 * Props for the select scroll down button component.
 */
export interface SelectScrollDownButtonProps extends SelectScrollButtonImplProps {}

// SelectScrollUpButton
/**
 * Props for the select scroll up button component.
 */
export interface SelectScrollUpButtonProps extends SelectScrollButtonImplProps {}

// BubbleSelect
/**
 * Props for the select bubble select component.
 */
export interface SelectBubbleSelectProps {
  /**
   * Autocomplete.
   */
  autocomplete?: string;
  /**
   * Whether autofocus.
   */
  autofocus?: boolean;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Form.
   */
  form?: string;
  /**
   * Whether multiple values are supported.
   */
  multiple?: boolean;
  /**
   * Name.
   */
  name?: string;
  /**
   * Whether the value is required.
   */
  required?: boolean;
  /**
   * Visual size of the component.
   */
  size?: number;
  /**
   * Value associated with the current item.
   */
  value?: any;
}

/**
 * Parameters used to create the select root context.
 */
export interface SelectRootContextParams extends PropsToContext<
  SelectRootProps,
  'dir' | 'autocomplete' | 'disabled' | 'required' | 'clearable'
> {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<MaybeArray<DefinedValue> | undefined>;
  /**
   * Handler used to update the model value.
   */
  onModelValueChange: (value: DefinedValue) => void;
  /**
   * Whether multiple values are supported.
   */
  isMultiple: ComputedRef<boolean>;
  /**
   * Whether the model value is empty.
   */
  isEmptyModelValue: ComputedRef<boolean>;
}

/**
 * Parameters used to create the select content context.
 */
export interface SelectContentContextParams
  extends PropsToContext<SelectContentProps, 'position'>, Pick<SelectRootContextParams, 'modelValue' | 'isMultiple'> {
  /**
   * Search used by the component context.
   */
  search: ShallowRef<string>;
  /**
   * Popup element used by the component context.
   */
  popupElement: ShallowRef<HTMLElement | undefined>;
}

/**
 * Context for the select item aligned position component.
 */
export interface SelectItemAlignedPositionContext {
  /**
   * Positioner element used by the component context.
   */
  positionerElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Whether the component should expand on scroll.
   */
  shouldExpandOnScroll: ShallowRef<boolean>;
  /**
   * Callback invoked when the scroll button changes.
   */
  onScrollButtonChange: (node: HTMLElement | undefined) => void;
}

/**
 * Parameters used to create the select item context.
 */
export interface SelectItemContextParams extends PropsToContext<SelectItemProps, 'textValue' | 'disabled'> {
  /**
   * Value associated with the current item.
   */
  value: DefinedValue;
  /**
   * Whether a selected.
   */
  isSelected: ComputedRef<boolean>;
}

/**
 * Type information for the select item collection item data component.
 */
export interface SelectItemCollectionItemData {
  /**
   * Text value.
   */
  textValue: string;
}

// Theme Context
/**
 * Available UI slots for the select component.
 */
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

/**
 * UI class overrides for the select component.
 */
export type SelectUi = UiClass<SelectUiSlot>;

export type { PopperArrowProps as SelectArrowProps } from '../popper/types';
export type { PortalProps as SelectPortalProps } from '../portal/types';
