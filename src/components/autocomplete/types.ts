import type {
  AutocompleteCompactEmits,
  AutocompleteCompactProps,
  AutocompleteCompactSlots,
  AutocompleteAnchorProps,
  AutocompleteContentProps,
  AutocompleteGroupOptionData,
  AutocompleteGroupLabelProps,
  AutocompleteGroupProps,
  AutocompleteHighlightPayload,
  AutocompleteInputProps,
  AutocompleteItemEmits,
  AutocompleteItemIndicatorProps,
  AutocompleteItemProps,
  AutocompleteOptionData,
  AutocompletePortalProps,
  AutocompleteRootEmits,
  AutocompleteRootProps,
  AutocompleteSearchOptionData,
  AutocompleteSeparatorProps,
  AutocompleteSingleOptionData,
  AutocompleteTriggerProps,
  AutocompleteUi as HeadlessAutocompleteUi,
  AutocompleteViewportProps
} from '@soybeanjs/headless/autocomplete';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
export type AutocompleteUi = HeadlessAutocompleteUi;

export interface AutocompleteProps<
  T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData
> extends AutocompleteCompactProps<T> {
  /** Root class. */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<AutocompleteUi>;
}

export type AutocompleteEmits<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  AutocompleteCompactEmits<T>;

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

export type AutocompleteSlots<T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData> =
  AutocompleteCompactSlots<T>;

export type {
  AutocompleteSingleOptionData,
  AutocompleteGroupOptionData,
  AutocompleteOptionData,
  AutocompleteSearchOptionData
} from '@soybeanjs/headless/autocomplete';
