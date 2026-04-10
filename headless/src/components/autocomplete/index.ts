export { default as AutocompleteRoot } from './autocomplete-root.vue';
export { default as AutocompleteAnchor } from './autocomplete-anchor.vue';
export { default as AutocompleteInput } from './autocomplete-input.vue';
export { default as AutocompleteTrigger } from './autocomplete-trigger.vue';
export { Portal as AutocompletePortal } from '../portal';
export { default as AutocompleteContent } from './autocomplete-content.vue';
export { default as AutocompleteViewport } from './autocomplete-viewport.vue';
export { default as AutocompleteGroup } from './autocomplete-group.vue';
export { default as AutocompleteGroupLabel } from './autocomplete-group-label.vue';
export { default as AutocompleteItem } from './autocomplete-item.vue';
export { default as AutocompleteItemIndicator } from './autocomplete-item-indicator.vue';
export { default as AutocompleteSeparator } from './autocomplete-separator.vue';

export { provideAutocompleteUi } from './context';

export type {
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
  AutocompleteUiSlot,
  AutocompleteUi
} from './types';
