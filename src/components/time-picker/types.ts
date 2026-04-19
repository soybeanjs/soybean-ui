import type { ClassValue } from '@soybeanjs/headless';
import type { TimeValue } from '@soybeanjs/headless/date';

import type {
  TimePickerPopupProps,
  TimePickerRootEmits,
  TimePickerRootProps,
  TimePickerTriggerProps,
  TimePickerUi
} from '@soybeanjs/headless/time-picker';
import type { ThemeSize } from '@/theme';

export interface TimePickerProps extends /* @vue-ignore */ TimePickerRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TimePickerUi>;
  triggerProps?: TimePickerTriggerProps;
  popupProps?: TimePickerPopupProps;
}

export type TimePickerEmits = TimePickerRootEmits;

export interface TimePickerSlots {
  trigger?: (props: { displayValue: string; modelValue: TimeValue | undefined; open: boolean }) => any;
  time?: (props: { disabled: boolean; focused: boolean; label: string; selected: boolean; time: TimeValue }) => any;
  default?: (props: { displayValue: string; modelValue: TimeValue | undefined; open: boolean }) => any;
}
