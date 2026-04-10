export { default as ComboboxRoot } from './combobox-root.vue';
export { default as ComboboxTrigger } from './combobox-trigger.vue';
export { default as ComboboxPortal } from '../portal/portal.vue';
export { default as ComboboxContent } from './combobox-content.vue';
export { default as ComboboxViewport } from './combobox-viewport.vue';
export { default as ComboboxInput } from './combobox-input.vue';
export { default as ComboboxGroup } from './combobox-group.vue';
export { default as ComboboxGroupLabel } from './combobox-group-label.vue';
export { default as ComboboxItem } from './combobox-item.vue';
export { default as ComboboxItemIndicator } from './combobox-item-indicator.vue';
export { default as ComboboxEmpty } from './combobox-empty.vue';
export { default as ComboboxSeparator } from './combobox-separator.vue';

export { provideComboboxUi } from './context';

export type { PortalProps as ComboboxPortalProps } from '../portal/types';
export type {
  ComboboxRootProps,
  ComboboxRootEmits,
  ComboboxTriggerProps,
  ComboboxContentProps,
  ComboboxContentEmits,
  ComboboxInputProps,
  ComboboxInputEmits,
  ComboboxViewportProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
  ComboboxItemProps,
  ComboboxItemEmits,
  ComboboxItemIndicatorProps,
  ComboboxEmptyProps,
  ComboboxSeparatorProps,
  ComboboxUiSlot,
  ComboboxUi
} from './types';
