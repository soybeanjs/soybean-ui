import type { ClassValue } from '@soybeanjs/headless';
import type { DateRange, DateValue } from '@soybeanjs/headless/date';
import type {
  MonthRangePickerPopupProps,
  MonthRangePickerRootEmits,
  MonthRangePickerRootProps,
  MonthRangePickerTriggerProps,
  MonthRangePickerUi
} from '@soybeanjs/headless/month-range-picker';
import type { ThemeSize } from '@/theme';

export interface MonthRangePickerProps extends /* @vue-ignore */ MonthRangePickerRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<MonthRangePickerUi>;
  triggerProps?: MonthRangePickerTriggerProps;
  popupProps?: MonthRangePickerPopupProps;
}

export type MonthRangePickerEmits = MonthRangePickerRootEmits;

export interface MonthRangePickerSlots {
  trigger?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  month?: (props: {
    date: DateValue;
    label: string;
    disabled: boolean;
    focused: boolean;
    highlighted: boolean;
    rangeEnd: boolean;
    rangeStart: boolean;
    selected: boolean;
  }) => any;
  default?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
}
