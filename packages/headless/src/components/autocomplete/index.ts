export { default as AutocompleteCompact } from './autocomplete-compact.vue';
export { default as AutocompleteRoot } from './autocomplete-root.vue';
export { ComboboxAnchor as AutocompleteAnchor } from '../combobox/index';
export { default as AutocompleteInput } from './autocomplete-input.vue';
export { ComboboxTrigger as AutocompleteTrigger } from '../combobox/index';
export { Portal as AutocompletePortal } from '../portal/index';
export { ComboboxContent as AutocompleteContent } from '../combobox/index';
export { ComboboxViewport as AutocompleteViewport } from '../combobox/index';
export { ComboboxGroup as AutocompleteGroup } from '../combobox/index';
export { ComboboxGroupLabel as AutocompleteGroupLabel } from '../combobox/index';
export { ComboboxItem as AutocompleteItem } from '../combobox/index';
export { ComboboxItemIndicator as AutocompleteItemIndicator } from '../combobox/index';
export { ComboboxSeparator as AutocompleteSeparator } from '../combobox/index';

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
