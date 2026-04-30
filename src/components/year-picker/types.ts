import type { DateValue } from '@internationalized/date';
import type { ClassValue } from '@soybeanjs/headless';

import type {
  YearPickerPopupProps,
  YearPickerRootEmits,
  YearPickerRootProps,
  YearPickerTriggerProps,
  YearPickerUi
} from '@soybeanjs/headless/year-picker';
import type { ThemeSize } from '@/theme';

export interface YearPickerProps extends /* @vue-ignore */ YearPickerRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<YearPickerUi>;
  triggerProps?: YearPickerTriggerProps;
  popupProps?: YearPickerPopupProps;
}

export type YearPickerEmits = YearPickerRootEmits;

export interface YearPickerSlots {
  trigger?: (props: { displayValue: string; modelValue: DateValue | undefined; open: boolean }) => any;
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  year?: (props: {
    date: DateValue;
    label: string;
    disabled: boolean;
    focused: boolean;
    selected: boolean;
  }) => any;
  default?: (props: { displayValue: string; modelValue: DateValue | undefined; open: boolean }) => any;
}
