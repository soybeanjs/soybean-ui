import type { HTMLAttributes } from 'vue';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type {
  AutocompleteAnchorProps,
  AutocompleteContentProps,
  AutocompleteGroupLabelProps,
  AutocompleteGroupProps,
  AutocompleteHighlightPayload,
  AutocompleteInputProps,
  AutocompleteItemEmits,
  AutocompleteItemIndicatorProps,
  AutocompleteItemProps,
  AutocompletePortalProps,
  AutocompleteRootEmits,
  AutocompleteRootProps,
  AutocompleteSeparatorProps,
  AutocompleteTriggerProps,
  AutocompleteUi as HeadlessAutocompleteUi,
  AutocompleteUiSlot,
  AutocompleteViewportProps,
  ClassValue,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { IconValue } from '../icon/types';

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

export interface AutocompleteSingleOptionProps<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData>
  extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  item: T;
  itemIndicatorProps?: AutocompleteItemIndicatorProps;
  separatorProps?: AutocompleteSeparatorProps;
}

export type AutocompleteSingleOptionEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> = {
  select: [item: T];
};

export interface AutocompleteGroupOptionProps<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> {
  item: AutocompleteGroupOptionData<T>;
  groupProps?: AutocompleteGroupProps;
  groupLabelProps?: AutocompleteGroupLabelProps;
  itemProps?: Omit<AutocompleteItemProps, 'disabled' | 'value'>;
  itemIndicatorProps?: AutocompleteItemIndicatorProps;
  separatorProps?: AutocompleteSeparatorProps;
}

export type AutocompleteGroupOptionEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> = {
  select: [item: T];
};

export interface AutocompleteOptionProps<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> {
  item: AutocompleteOptionData<T>;
  groupProps?: AutocompleteGroupProps;
  groupLabelProps?: AutocompleteGroupLabelProps;
  itemProps?: Omit<AutocompleteItemProps, 'disabled' | 'value'>;
  itemIndicatorProps?: AutocompleteItemIndicatorProps;
  separatorProps?: AutocompleteSeparatorProps;
}

export type AutocompleteOptionEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> = {
  select: [item: T];
};

export type AutocompleteExtraUiSlot =
  | 'inputIcon'
  | 'inputClearable'
  | 'triggerIcon'
  | 'itemText'
  | 'itemIcon'
  | 'empty';

export type AutocompleteUi = UiClass<AutocompleteUiSlot | AutocompleteExtraUiSlot>;

export interface AutocompleteProps<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> extends Omit<
  AutocompleteRootProps,
  'defaultValue' | 'modelValue'
> {
  /** Root class. */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<AutocompleteUi>;
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

export type AutocompleteEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  AutocompleteRootEmits & {
    select: [item: T];
  };

export type {
  AutocompleteRootProps,
  AutocompleteRootEmits,
  AutocompleteHighlightPayload,
  AutocompleteAnchorProps,
  AutocompleteInputProps,
  AutocompleteTriggerProps,
  AutocompletePortalProps,
  AutocompleteContentProps,
  AutocompleteViewportProps,
  AutocompleteGroupProps,
  AutocompleteGroupLabelProps,
  AutocompleteItemProps,
  AutocompleteItemEmits,
  AutocompleteItemIndicatorProps,
  AutocompleteSeparatorProps,
  HeadlessAutocompleteUi
};
