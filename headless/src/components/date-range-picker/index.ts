export { default as DateRangePickerRoot } from './date-range-picker-root.vue';
export { default as DateRangePickerTrigger } from './date-range-picker-trigger.vue';
export { default as DateRangePickerPopup } from './date-range-picker-popup.vue';

export { provideDateRangePickerUi } from './context';

export type {
  DateRangePickerPopupProps,
  DateRangePickerRootContext,
  DateRangePickerRootEmits,
  DateRangePickerRootProps,
  DateRangePickerTriggerProps,
  DateRangePickerUi,
  DateRangePickerUiSlot
} from './types';
