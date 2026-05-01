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

export type AutocompleteHighlightPayload = CollectionItemData<ListboxCollectionItemData>;

export type AutocompleteRootEmits = {
  'update:modelValue': [value: string];
  'update:open': [value: boolean];
  highlight: [payload?: AutocompleteHighlightPayload];
};

export interface AutocompleteRootContext {
  modelValue: ShallowRef<string | undefined>;
}

export interface AutocompleteInputProps extends Omit<InputRootProps, 'defaultValue' | 'modelValue'> {
  inputRef?: (el: HTMLInputElement) => void;
  controlProps?: InputControlProps;
}

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

export interface AutocompleteGroupOptionData<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> {
  /** Group label in the option list. */
  label: string;
  /** Whether to show a separator after this group. */
  separator?: boolean;
  items: T[];
}

export type AutocompleteOptionData<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  | T
  | AutocompleteGroupOptionData<T>;

export interface AutocompleteSearchOptionData extends AutocompleteSingleOptionData {
  groupLabel?: string;
  groupValue?: string;
  groupSeparator?: boolean;
}

export interface AutocompleteCompactProps<
  T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData
> extends Omit<AutocompleteRootProps, 'defaultValue' | 'modelValue' | 'onSelect'> {
  /** The controlled value of the autocomplete input. */
  modelValue?: string;
  /** The initial value of the autocomplete input. */
  defaultValue?: string;
  items: AutocompleteOptionData<T>[];
  placeholder?: string;
  clearable?: boolean;
  clearLabel?: string;
  emptyLabel?: string;
  fuseOptions?: UseFuseOptions<AutocompleteSearchOptionData>;
  anchorProps?: AutocompleteAnchorProps;
  inputProps?: AutocompleteInputProps;
  triggerProps?: AutocompleteTriggerProps;
  portalProps?: AutocompletePortalProps;
  contentProps?: AutocompleteContentProps;
  viewportProps?: AutocompleteViewportProps;
  groupProps?: AutocompleteGroupProps;
  groupLabelProps?: AutocompleteGroupLabelProps;
  itemProps?: Omit<AutocompleteItemProps, 'disabled' | 'value'>;
  itemIndicatorProps?: AutocompleteItemIndicatorProps;
  separatorProps?: AutocompleteSeparatorProps;
}

export type AutocompleteCompactEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  AutocompleteRootEmits & {
    select: [item: T];
  };

export type AutocompleteCompactSlots<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> = {
  'input-leading'?: () => any;
  'input-trailing'?: () => any;
  'trigger-icon'?: () => any;
  empty?: () => any;
  'group-label'?: (props: { item: Extract<AutocompleteOptionData<T>, { items: T[] }> }) => any;
  'item-leading'?: (props: { item: T }) => any;
  'item-text'?: (props: { item: T }) => any;
  'item-trailing'?: (props: { item: T }) => any;
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
