import type { HTMLAttributes, ShallowRef } from 'vue';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { CollectionItemData } from '../../composables';
import type { Direction, FormFieldCommonProps } from '../../types';
import type {
  ComboboxAnchorProps as AutocompleteAnchorProps,
  ComboboxContentProps as AutocompleteContentProps,
  ComboboxGroupLabelProps as AutocompleteGroupLabelProps,
  ComboboxGroupProps as AutocompleteGroupProps,
  ComboboxItemEmits as AutocompleteItemEmits,
  ComboboxItemIndicatorProps as AutocompleteItemIndicatorProps,
  ComboboxItemProps as AutocompleteItemProps,
  ComboboxSeparatorProps as AutocompleteSeparatorProps,
  ComboboxTriggerProps as AutocompleteTriggerProps,
  ComboboxViewportProps as AutocompleteViewportProps,
  ComboboxUiSlot as AutocompleteUiSlot,
  ComboboxUi as AutocompleteUi
} from '../combobox/types';
import type { InputControlProps, InputRootEmits as AutocompleteInputEmits, InputRootProps } from '../input/types';
import type { IconValue } from '../_icon/types';
import type { ListboxCollectionItemData } from '../listbox/types';
import type { PortalProps as AutocompletePortalProps } from '../portal/types';

/**
 * Props for the autocomplete root component.
 */
export interface AutocompleteRootProps extends FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the autocomplete input. */
  modelValue?: string;
  /** The value of the autocomplete input when initially rendered. */
  defaultValue?: string;
  /** The controlled open state of the autocomplete popup. */
  open?: boolean;
  /** The open state of the autocomplete popup when initially rendered. */
  defaultOpen?: boolean;
  /** The reading direction of the autocomplete when applicable. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with autocomplete. */
  disabled?: boolean;
  /** When `true`, hover over item will trigger highlight. */
  highlightOnHover?: boolean;
  /** Whether to open the autocomplete when the input is focused. */
  openOnFocus?: boolean;
  /** Whether to open the autocomplete when the input is clicked. */
  openOnClick?: boolean;
}

/**
 * Type information for the autocomplete highlight payload component.
 */
export type AutocompleteHighlightPayload = CollectionItemData<ListboxCollectionItemData>;

/**
 * Emits for the autocomplete root component.
 */
export type AutocompleteRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when the open state changes.
   */
  'update:open': [value: boolean];
  /**
   * Emitted when highlight occurs.
   */
  highlight: [payload?: AutocompleteHighlightPayload];
};

/**
 * Context for the autocomplete root component.
 */
export interface AutocompleteRootContext {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string | undefined>;
}

/**
 * Props for the autocomplete input component.
 */
export interface AutocompleteInputProps extends Omit<InputRootProps, 'defaultValue' | 'modelValue'> {
  /**
   * Input ref.
   */
  inputRef?: (el: HTMLInputElement) => void;
  /**
   * Props forwarded to the control element.
   */
  controlProps?: InputControlProps;
}

/**
 * Option data for the autocomplete single component.
 */
export interface AutocompleteSingleOptionData extends Pick<AutocompleteItemProps, 'disabled' | 'value'> {
  /** Display label in the option list. */
  label?: string;
  /** Icon displayed before the option text. */
  icon?: IconValue;
  /** Additional keywords used for filtering. */
  keywords?: string[];
  /** Whether to show a separator after this option. */
  separator?: boolean;
}

/**
 * Option data for the autocomplete group component.
 */
export interface AutocompleteGroupOptionData<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> {
  /** Group label in the option list. */
  label: string;
  /** Whether to show a separator after this group. */
  separator?: boolean;
  /**
   * Items rendered by the component.
   */
  items: T[];
}

/**
 * Option data for the autocomplete component.
 */
export type AutocompleteOptionData<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  | T
  | AutocompleteGroupOptionData<T>;

/**
 * Option data for the autocomplete search component.
 */
export interface AutocompleteSearchOptionData extends AutocompleteSingleOptionData {
  /**
   * Group label.
   */
  groupLabel?: string;
  /**
   * Group value.
   */
  groupValue?: string;
  /**
   * Whether group separator.
   */
  groupSeparator?: boolean;
}

/**
 * Props for the autocomplete compact component.
 */
export interface AutocompleteCompactProps<
  T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData
> extends Omit<AutocompleteRootProps, 'defaultValue' | 'modelValue' | 'onSelect'> {
  /** The controlled value of the autocomplete input. */
  modelValue?: string;
  /** The initial value of the autocomplete input. */
  defaultValue?: string;
  /**
   * Items rendered by the component.
   */
  items: AutocompleteOptionData<T>[];
  /**
   * Placeholder.
   */
  placeholder?: string;
  /**
   * Whether clearable.
   */
  clearable?: boolean;
  /**
   * Clear label.
   */
  clearLabel?: string;
  /**
   * Empty label.
   */
  emptyLabel?: string;
  /**
   * Fuse options.
   */
  fuseOptions?: UseFuseOptions<AutocompleteSearchOptionData>;
  /**
   * Props forwarded to the anchor element.
   */
  anchorProps?: AutocompleteAnchorProps;
  /**
   * Props forwarded to the input element.
   */
  inputProps?: AutocompleteInputProps;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: AutocompleteTriggerProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: AutocompletePortalProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: AutocompleteContentProps;
  /**
   * Props forwarded to the viewport element.
   */
  viewportProps?: AutocompleteViewportProps;
  /**
   * Props forwarded to the group element.
   */
  groupProps?: AutocompleteGroupProps;
  /**
   * Props forwarded to the group label element.
   */
  groupLabelProps?: AutocompleteGroupLabelProps;
  /**
   * Props forwarded to the item element.
   */
  itemProps?: Omit<AutocompleteItemProps, 'disabled' | 'value'>;
  /**
   * Props forwarded to the item indicator element.
   */
  itemIndicatorProps?: AutocompleteItemIndicatorProps;
  /**
   * Props forwarded to the separator element.
   */
  separatorProps?: AutocompleteSeparatorProps;
}

/**
 * Emits for the autocomplete compact component.
 */
export type AutocompleteCompactEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  AutocompleteRootEmits & {
    /**
     * Emitted when select occurs.
     */
    select: [item: T];
  };

/**
 * Slots for the autocomplete compact component.
 */
export type AutocompleteCompactSlots<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> = {
  /**
   * Custom content for the input leading slot.
   */
  'input-leading'?: () => any;
  /**
   * Custom content for the input trailing slot.
   */
  'input-trailing'?: () => any;
  /**
   * Custom content for the trigger icon slot.
   */
  'trigger-icon'?: () => any;
  /**
   * Custom content for the empty slot.
   */
  empty?: () => any;
  /**
   * Custom content for the group label slot.
   */
  'group-label'?: (props: { item: Extract<AutocompleteOptionData<T>, { items: T[] }> }) => any;
  /**
   * Custom content for the item leading slot.
   */
  'item-leading'?: (props: { item: T }) => any;
  /**
   * Custom content for the item text slot.
   */
  'item-text'?: (props: { item: T }) => any;
  /**
   * Custom content for the item trailing slot.
   */
  'item-trailing'?: (props: { item: T }) => any;
  /**
   * Custom content for the item indicator slot.
   */
  'item-indicator'?: (props: { item: T }) => any;
};

export type {
  AutocompleteAnchorProps,
  AutocompleteContentProps,
  AutocompleteGroupLabelProps,
  AutocompleteGroupProps,
  AutocompleteInputEmits,
  AutocompleteItemEmits,
  AutocompleteItemIndicatorProps,
  AutocompleteItemProps,
  AutocompletePortalProps,
  AutocompleteSeparatorProps,
  AutocompleteTriggerProps,
  AutocompleteViewportProps,
  AutocompleteUiSlot,
  AutocompleteUi
};
