export { default as AutocompleteCompact } from './autocomplete-compact.vue';
export { default as AutocompleteRoot } from './autocomplete-root.vue';
export { ComboboxAnchor as AutocompleteAnchor } from '../combobox/index.js';
export { default as AutocompleteInput } from './autocomplete-input.vue';
export { ComboboxTrigger as AutocompleteTrigger } from '../combobox/index.js';
export { Portal as AutocompletePortal } from '../portal/index.js';
export { ComboboxContent as AutocompleteContent } from '../combobox/index.js';
export { ComboboxViewport as AutocompleteViewport } from '../combobox/index.js';
export { ComboboxGroup as AutocompleteGroup } from '../combobox/index.js';
export { ComboboxGroupLabel as AutocompleteGroupLabel } from '../combobox/index.js';
export { ComboboxItem as AutocompleteItem } from '../combobox/index.js';
export { ComboboxItemIndicator as AutocompleteItemIndicator } from '../combobox/index.js';
export { ComboboxSeparator as AutocompleteSeparator } from '../combobox/index.js';

export { provideAutocompleteUi } from './context.js';

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
} from './types.js';
