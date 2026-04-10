export { default as SAutocomplete } from './autocomplete.vue';

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
  AutocompleteUiSlot,
  AutocompleteUi as HeadlessAutocompleteUi
} from '@soybeanjs/headless/autocomplete';

export type * from './types';
