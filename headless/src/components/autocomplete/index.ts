export { default as AutocompleteCompact } from './autocomplete-compact.vue';
export { default as AutocompleteRoot } from './autocomplete-root.vue';
export { ComboboxAnchor as AutocompleteAnchor } from '../combobox';
export { default as AutocompleteInput } from './autocomplete-input.vue';
export { ComboboxTrigger as AutocompleteTrigger } from '../combobox';
export { Portal as AutocompletePortal } from '../portal';
export { ComboboxContent as AutocompleteContent } from '../combobox';
export { ComboboxViewport as AutocompleteViewport } from '../combobox';
export { ComboboxGroup as AutocompleteGroup } from '../combobox';
export { ComboboxGroupLabel as AutocompleteGroupLabel } from '../combobox';
export { ComboboxItem as AutocompleteItem } from '../combobox';
export { ComboboxItemIndicator as AutocompleteItemIndicator } from '../combobox';
export { ComboboxSeparator as AutocompleteSeparator } from '../combobox';

export { provideAutocompleteUi } from './context';

export type {
  AutocompleteCompactProps,
  AutocompleteCompactEmits,
  AutocompleteCompactSlots,
  AutocompleteRootProps,
  AutocompleteRootEmits,
  AutocompleteHighlightPayload,
  AutocompleteAnchorProps,
  AutocompleteInputProps,
  AutocompleteInputEmits,
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
  AutocompleteSingleOptionData,
  AutocompleteGroupOptionData,
  AutocompleteOptionData,
  AutocompleteSearchOptionData,
  AutocompleteUiSlot,
  AutocompleteUi
} from './types';
