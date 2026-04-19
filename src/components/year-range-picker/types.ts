import type { DateValue } from '@internationalized/date';
import type { ClassValue } from '@soybeanjs/headless';

import type {
  YearRangePickerPopupProps,
  YearRangePickerRootEmits,
  YearRangePickerRootProps,
  YearRangePickerTriggerProps,
  YearRangePickerUi
} from '@soybeanjs/headless/year-range-picker';
import type { DateRange } from '@soybeanjs/headless/date';
import type { ThemeSize } from '@/theme';

export interface YearRangePickerProps extends /* @vue-ignore */ YearRangePickerRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<YearRangePickerUi>;
  triggerProps?: YearRangePickerTriggerProps;
  popupProps?: YearRangePickerPopupProps;
}

export type YearRangePickerEmits = YearRangePickerRootEmits;

export interface YearRangePickerSlots {
  trigger?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  year?: (props: {
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
