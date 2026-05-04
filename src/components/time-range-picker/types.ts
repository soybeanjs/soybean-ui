import type { ClassValue } from '@soybeanjs/headless/types';
import type { TimeRange, TimeValue } from '@soybeanjs/headless/date';

import type {
  TimeRangePickerPopupProps,
  TimeRangePickerRootEmits,
  TimeRangePickerRootProps,
  TimeRangePickerTriggerProps,
  TimeRangePickerUi
} from '@soybeanjs/headless/time-range-picker';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the TimeRangePicker component.
 */
export interface TimeRangePickerProps extends /** @vue-ignore */ TimeRangePickerRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<TimeRangePickerUi>;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: TimeRangePickerTriggerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: TimeRangePickerPopupProps;
}

/**
 * Events for the TimeRangePicker component.
 */
export type TimeRangePickerEmits = TimeRangePickerRootEmits;

/**
 * Slots for the TimeRangePicker component.
 */
export interface TimeRangePickerSlots {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { displayValue: string; modelValue: TimeRange; open: boolean }) => any;
  /**
   * Custom content for the time slot.
   */
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
  /**
   * Custom content for the default slot.
   */
  default?: (props: { displayValue: string; modelValue: TimeRange; open: boolean }) => any;
}
