import type { ClassValue } from '@soybeanjs/headless/types';
import type { TimeValue } from '@soybeanjs/headless/date';

import type {
  TimePickerPopupProps,
  TimePickerRootEmits,
  TimePickerRootProps,
  TimePickerTriggerProps,
  TimePickerUi
} from '@soybeanjs/headless/time-picker';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the TimePicker component.
 */
export interface TimePickerProps extends TimePickerRootProps {
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
  ui?: Partial<TimePickerUi>;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: TimePickerTriggerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: TimePickerPopupProps;
}

/**
 * Events for the TimePicker component.
 */
export type TimePickerEmits = TimePickerRootEmits;

/**
 * Slots for the TimePicker component.
 */
export interface TimePickerSlots {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { displayValue: string; modelValue: TimeValue | undefined; open: boolean }) => any;
  /**
   * Custom content for the time slot.
   */
  time?: (props: { disabled: boolean; focused: boolean; label: string; selected: boolean; time: TimeValue }) => any;
  /**
   * Custom content for the default slot.
   */
  default?: (props: { displayValue: string; modelValue: TimeValue | undefined; open: boolean }) => any;
}
