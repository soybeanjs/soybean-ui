import type { DateValue } from '@internationalized/date';

import type {
  ClassValue,
  DatePickerPopupProps,
  DatePickerRootEmits,
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface DatePickerProps extends /* @vue-ignore */ DatePickerRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<DatePickerUi>;
  triggerProps?: DatePickerTriggerProps;
  popupProps?: DatePickerPopupProps;
}

export type DatePickerEmits = DatePickerRootEmits;

export interface DatePickerSlots {
  trigger?: (props: { open: boolean }) => any;
  default?: (props: { modelValue: DateValue | undefined; open: boolean }) => any;
}
