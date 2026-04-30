import type { ClassValue } from '@soybeanjs/headless';
import type { TimeRange, TimeValue } from '@soybeanjs/headless/date';

import type {
  TimeRangePickerPopupProps,
  TimeRangePickerRootEmits,
  TimeRangePickerRootProps,
  TimeRangePickerTriggerProps,
  TimeRangePickerUi
} from '@soybeanjs/headless/time-range-picker';
import type { ThemeSize } from '@/theme';

export interface TimeRangePickerProps extends /* @vue-ignore */ TimeRangePickerRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TimeRangePickerUi>;
  triggerProps?: TimeRangePickerTriggerProps;
  popupProps?: TimeRangePickerPopupProps;
}

export type TimeRangePickerEmits = TimeRangePickerRootEmits;

export interface TimeRangePickerSlots {
  trigger?: (props: { displayValue: string; modelValue: TimeRange; open: boolean }) => any;
  time?: (props: {
    disabled: boolean;
    focused: boolean;
    highlighted: boolean;
    label: string;
    rangeEnd: boolean;
    rangeStart: boolean;
    selected: boolean;
    time: TimeValue;
  }) => any;
  default?: (props: { displayValue: string; modelValue: TimeRange; open: boolean }) => any;
}
