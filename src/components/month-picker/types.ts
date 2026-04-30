import type { DateValue } from '@internationalized/date';
import type { ClassValue } from '@soybeanjs/headless';

import type {
  MonthPickerPopupProps,
  MonthPickerRootEmits,
  MonthPickerRootProps,
  MonthPickerTriggerProps,
  MonthPickerUi
} from '@soybeanjs/headless/month-picker';
import type { ThemeSize } from '@/theme';

export interface MonthPickerProps extends /* @vue-ignore */ MonthPickerRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<MonthPickerUi>;
  triggerProps?: MonthPickerTriggerProps;
  popupProps?: MonthPickerPopupProps;
}

export type MonthPickerEmits = MonthPickerRootEmits;

export interface MonthPickerSlots {
  trigger?: (props: { displayValue: string; modelValue: DateValue | undefined; open: boolean }) => any;
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  month?: (props: {
    date: DateValue;
    label: string;
    disabled: boolean;
    focused: boolean;
    selected: boolean;
  }) => any;
  default?: (props: { displayValue: string; modelValue: DateValue | undefined; open: boolean }) => any;
}
