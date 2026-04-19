import type { DateRange, DateValue } from '@soybeanjs/headless/date';

import type {
  ClassValue,
  DateRangePickerPopupProps,
  DateRangePickerRootEmits,
  DateRangePickerRootProps,
  DateRangePickerTriggerProps,
  DateRangePickerUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface DateRangePickerProps extends /* @vue-ignore */ DateRangePickerRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<DateRangePickerUi>;
  triggerProps?: DateRangePickerTriggerProps;
  popupProps?: DateRangePickerPopupProps;
}

export type DateRangePickerEmits = DateRangePickerRootEmits;

export interface DateRangePickerSlots {
  trigger?: (props: { open: boolean }) => any;
  default?: (props: {
    modelValue: DateRange;
    open: boolean;
    placeholder: DateValue;
    setPlaceholder: (date: DateValue) => void;
    setRange: (range: DateRange) => void;
  }) => any;
  calendar?: (props: { modelValue: DateRange; placeholder: DateValue }) => any;
}
