export { default as CheckboxRoot } from './checkbox-root.vue';
export { default as CheckboxControl } from './checkbox-control.vue';
export { default as CheckboxIndicator } from './checkbox-indicator.vue';
export { default as CheckboxLabel } from './checkbox-label.vue';
export { default as CheckboxGroupRoot } from './checkbox-group-root.vue';

export { provideCheckboxUi } from './context';

export type {
  CheckboxRootProps,
  CheckboxRootEmits,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxGroupRootProps,
  CheckboxGroupRootEmits,
  CheckboxUiSlot,
  CheckboxUi
} from './types';
