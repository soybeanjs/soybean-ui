export { default as DatePickerRoot } from './date-picker-root.vue';
export { default as DatePickerTrigger } from './date-picker-trigger.vue';
export { default as DatePickerPopup } from './date-picker-popup.vue';

export { provideDatePickerUi } from './context';

export type {
  DatePickerPopupProps,
  DatePickerRootContext,
  DatePickerRootEmits,
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerUi,
  DatePickerUiSlot
} from './types';
