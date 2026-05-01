import type { EventHookOn } from '@vueuse/core';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  MaybeArray,
  PropsToContext,
  TrapFocusProps,
  UiClass
} from '../../types';
import type {
  ListboxFilterEmits,
  ListboxFilterProps,
  ListboxRootEmits,
  ListboxRootProps,
  ListboxItemProps,
  ListboxItemEmits,
  ListboxGroupProps as ComboboxGroupProps,
  ListboxGroupLabelProps as ComboboxGroupLabelProps,
  ListboxItemIndicatorProps as ComboboxItemIndicatorProps,
  ListboxVirtualizerProps
} from '../listbox/types';
import type { PrimitiveProps } from '../primitive/types';
import type {
  PopperAnchorProps as ComboboxAnchorProps,
  PopperArrowProps as ComboboxArrowProps,
  PopperPopupProps,
  PopperPositionerEmits,
  PopperPositionerProps,
  PopperUiSlot
} from '../popper/types';
import type { IconValue } from '../_icon/types';
import type { PortalProps } from '../portal/types';

/**
 * Props for the combobox root component.
 */
export interface ComboboxRootProps<M extends boolean = false> extends Omit<
  ListboxRootProps<M>,
  'orientation' | 'selectionBehavior'
> {
  /** The controlled open state of the Combobox. Can be bound with `v-model:open`. */
  open?: boolean;
  /** The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * Whether to reset the searchTerm when the Combobox input blurred
   * @defaultValue `true`
   */
  resetSearchTermOnBlur?: boolean;
  /**
   * Whether to reset the searchTerm when the Combobox value is selected
   * @defaultValue `true`
   */
  resetSearchTermOnSelect?: boolean;
  /**
   * Whether to open the combobox when the input is focused
   * @defaultValue `false`
   */
  openOnFocus?: boolean;
  /**
   * Whether to open the combobox when the input is clicked
   * @defaultValue `false`
   */
  openOnClick?: boolean;
  /**
   * When `true`, disable the default filters
   */
  ignoreFilter?: boolean;
  /**
   * When `true` the `modelValue` will be reset to `null` (or `[]` if `multiple`)
   */
  resetModelValueOnClear?: boolean;
}

/**
 * Emits for the combobox root component.
 */
export type ComboboxRootEmits<M extends boolean = false> = Pick<
  ListboxRootEmits<M>,
  'update:modelValue' | 'highlight'
> & {
  /**
   * Emitted when the open state changes.
   */
  'update:open': [value: boolean];
};

/**
 * Props for the combobox trigger component.
 */
export interface ComboboxTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Props for the combobox content impl component.
 */
export interface ComboboxContentImplProps
  extends PopperPositionerProps, TrapFocusProps, DismissableLayerProps, ForceMountProps {
  /**
   * Position.
   */
  position?: 'inline' | 'popper';
  /**
   * Whether body lock.
   */
  bodyLock?: boolean;
  /**
   * Whether hide when empty.
   */
  hideWhenEmpty?: boolean;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: PopperPopupProps;
}

/**
 * Emits for the combobox content impl component.
 */
export type ComboboxContentImplEmits = DismissableLayerEmits & FocusScopeEmits & PopperPositionerEmits;

/**
 * Props for the combobox content component.
 */
export interface ComboboxContentProps extends ComboboxContentImplProps {}

/**
 * Emits for the combobox content component.
 */
export type ComboboxContentEmits = ComboboxContentImplEmits;

/**
 * Props for the combobox input component.
 */
export interface ComboboxInputProps extends ListboxFilterProps {
  /**
   * Display value.
   */
  displayValue?: (value: MaybeArray<string> | undefined) => string;
}

/**
 * Emits for the combobox input component.
 */
export type ComboboxInputEmits = ListboxFilterEmits;

/**
 * Props for the combobox viewport component.
 */
export interface ComboboxViewportProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Nonce.
   */
  nonce?: string;
}

/**
 * Props for the combobox item component.
 */
export interface ComboboxItemProps extends ListboxItemProps {
  /**
   * Text value.
   */
  textValue?: string;
}

/**
 * Emits for the combobox item component.
 */
export type ComboboxItemEmits = ListboxItemEmits;

/**
 * Props for the combobox empty component.
 */
export interface ComboboxEmptyProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the combobox separator component.
 */
export interface ComboboxSeparatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the combobox cancel component.
 */
export interface ComboboxCancelProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Props for the combobox virtualizer component.
 */
export interface ComboboxVirtualizerProps extends ListboxVirtualizerProps {}

/**
 * Option data for the combobox single component.
 */
export interface ComboboxSingleOptionData extends Pick<ComboboxItemProps, 'disabled' | 'textValue'> {
  /**
   * Value associated with the current item.
   */
  value: string;
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
 * Option data for the combobox group component.
 */
export interface ComboboxGroupOptionData extends Pick<ComboboxSingleOptionData, 'label' | 'separator'> {
  /**
   * Items rendered by the component.
   */
  items: ComboboxSingleOptionData[];
}

/**
 * Option data for the combobox component.
 */
export type ComboboxOptionData = ComboboxSingleOptionData | ComboboxGroupOptionData;

/**
 * Props for the combobox compact component.
 */
export interface ComboboxCompactProps<M extends boolean = false> extends ComboboxRootProps<M> {
  /**
   * Items rendered by the component.
   */
  items: ComboboxOptionData[];
  /**
   * Placeholder.
   */
  placeholder?: string;
  /**
   * Search placeholder.
   */
  searchPlaceholder?: string;
  /**
   * Clear label.
   */
  clearLabel?: string;
  /**
   * Empty label.
   */
  emptyLabel?: string;
  /**
   * Props forwarded to the anchor element.
   */
  anchorProps?: ComboboxAnchorProps;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: ComboboxTriggerProps;
  /**
   * Props forwarded to the cancel element.
   */
  cancelProps?: ComboboxCancelProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: PortalProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: ComboboxContentProps;
  /**
   * Props forwarded to the viewport element.
   */
  viewportProps?: ComboboxViewportProps;
  /**
   * Props forwarded to the input element.
   */
  inputProps?: ComboboxInputProps;
  /**
   * Props forwarded to the empty element.
   */
  emptyProps?: ComboboxEmptyProps;
  /**
   * Props forwarded to the group element.
   */
  groupProps?: ComboboxGroupProps;
  /**
   * Props forwarded to the group label element.
   */
  groupLabelProps?: ComboboxGroupLabelProps;
  /**
   * Props forwarded to the item element.
   */
  itemProps?: ComboboxItemProps;
  /**
   * Props forwarded to the item indicator element.
   */
  itemIndicatorProps?: ComboboxItemIndicatorProps;
  /**
   * Props forwarded to the separator element.
   */
  separatorProps?: ComboboxSeparatorProps;
}

/**
 * Emits for the combobox compact component.
 */
export type ComboboxCompactEmits<M extends boolean = false> = ComboboxRootEmits<M> &
  ComboboxContentEmits &
  ComboboxItemEmits;

type ComboboxCompactModelValue<M extends boolean = false> = (M extends true ? string[] : string) | undefined;

/**
 * Slot props for the combobox compact trigger value component.
 */
export interface ComboboxCompactTriggerValueSlotProps<M extends boolean = false> {
  /**
   * Current model value.
   */
  modelValue: ComboboxCompactModelValue<M>;
  /**
   * Selected labels exposed in the slot scope.
   */
  selectedLabels: string[];
  /**
   * Slot text exposed in the slot scope.
   */
  slotText: string | undefined;
}

/**
 * Slot props for the combobox compact input component.
 */
export interface ComboboxCompactInputSlotProps {
  /**
   * Clear exposed in the slot scope.
   */
  clear: () => void;
}

/**
 * Slot props for the combobox compact group label component.
 */
export interface ComboboxCompactGroupLabelSlotProps {
  /**
   * Current item data.
   */
  item: ComboboxGroupOptionData;
}

/**
 * Slot props for the combobox compact item component.
 */
export interface ComboboxCompactItemSlotProps {
  /**
   * Current item data.
   */
  item: ComboboxSingleOptionData;
}

/**
 * Slots for the combobox compact component.
 */
export type ComboboxCompactSlots<M extends boolean = false> = {
  /**
   * Custom content for the trigger leading slot.
   */
  'trigger-leading'?: () => any;
  /**
   * Custom content for the trigger value slot.
   */
  'trigger-value'?: (props: ComboboxCompactTriggerValueSlotProps<M>) => any;
  /**
   * Custom content for the trigger trailing slot.
   */
  'trigger-trailing'?: () => any;
  /**
   * Custom content for the trigger icon slot.
   */
  'trigger-icon'?: () => any;
  /**
   * Custom content for the input leading slot.
   */
  'input-leading'?: (props: ComboboxCompactInputSlotProps) => any;
  /**
   * Custom content for the input trailing slot.
   */
  'input-trailing'?: (props: ComboboxCompactInputSlotProps) => any;
  /**
   * Custom content for the empty slot.
   */
  empty?: () => any;
  /**
   * Custom content for the group label slot.
   */
  'group-label'?: (props: ComboboxCompactGroupLabelSlotProps) => any;
  /**
   * Custom content for the item leading slot.
   */
  'item-leading'?: (props: ComboboxCompactItemSlotProps) => any;
  /**
   * Custom content for the item text slot.
   */
  'item-text'?: (props: ComboboxCompactItemSlotProps) => any;
  /**
   * Custom content for the item trailing slot.
   */
  'item-trailing'?: (props: ComboboxCompactItemSlotProps) => any;
  /**
   * Custom content for the item indicator slot.
   */
  'item-indicator'?: (props: ComboboxCompactItemSlotProps) => any;
};

/**
 * Context for the combobox root component.
 */
export interface ComboboxRootContext extends PropsToContext<
  ComboboxRootProps,
  | 'dir'
  | 'disabled'
  | 'ignoreFilter'
  | 'resetSearchTermOnBlur'
  | 'resetSearchTermOnSelect'
  | 'openOnFocus'
  | 'openOnClick'
  | 'resetModelValueOnClear'
> {
  /**
   * Whether multiple values are supported.
   */
  isMultiple: ComputedRef<boolean | undefined>;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  /**
   * Handler used to update the model value.
   */
  onModelValueChange: (value: string) => void;
  /**
   * Reset model value used by the component context.
   */
  resetModelValue: () => void;
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Callback invoked when the open changes.
   */
  onOpenChange: (value: boolean) => Promise<void> | void;
  /**
   * Whether an user inputted.
   */
  isUserInputted: ShallowRef<boolean>;
  /**
   * Whether virtualization is enabled.
   */
  isVirtual: ShallowRef<boolean>;
  /**
   * Parent element used by the component context.
   */
  parentElement: ComputedRef<HTMLElement | undefined>;
  /**
   * Content id used by the component context.
   */
  contentId: ShallowRef<string>;
  /**
   * Init content id used by the component context.
   */
  initContentId: () => void;
  /**
   * Input element used by the component context.
   */
  inputElement: ShallowRef<HTMLInputElement | undefined>;
  /**
   * Callback invoked when the input element changes.
   */
  onInputElementChange: (node: HTMLInputElement) => void;
  /**
   * Trigger element used by the component context.
   */
  triggerElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Callback invoked when the trigger element changes.
   */
  onTriggerElementChange: (node: HTMLElement) => void;
  /**
   * Popup element used by the component context.
   */
  popupElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Callback invoked when the popup element changes.
   */
  onPopupElementChange: (node: HTMLElement) => void;
  /**
   * Highlighted element used by the component context.
   */
  highlightedElement: ComputedRef<HTMLElement | null | undefined>;
  /**
   * Callback invoked when the reset search term event fires.
   */
  onResetSearchTerm: EventHookOn<undefined>;
  /**
   * Filter search used by the component context.
   */
  filterSearch: ShallowRef<string>;
  /**
   * All items used by the component context.
   */
  allItems: ShallowRef<Map<string, string>>;
  /**
   * All groups used by the component context.
   */
  allGroups: ShallowRef<Map<string, Set<string>>>;
  /**
   * Filter state used by the component context.
   */
  filterState: ComputedRef<{
    count: number;
    items: Map<string, number>;
    groups: Set<string>;
  }>;
}

/**
 * Available UI slots for the combobox component.
 */
export type ComboboxUiSlot =
  | PopperUiSlot
  | 'root'
  | 'trigger'
  | 'triggerIcon'
  | 'cancel'
  | 'viewport'
  | 'inputRoot'
  | 'inputControl'
  | 'group'
  | 'groupLabel'
  | 'item'
  | 'itemIndicator'
  | 'empty'
  | 'separator'
  | 'virtualizer';

/**
 * UI class overrides for the combobox component.
 */
export type ComboboxUi = UiClass<ComboboxUiSlot>;

export type {
  ComboboxAnchorProps,
  ComboboxArrowProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
  ComboboxItemIndicatorProps
};
