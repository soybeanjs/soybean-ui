import type { DateValue } from '@internationalized/date';
import type { ClassValue } from '@soybeanjs/headless/types';
import type {
  MonthPickerPopupProps,
  MonthPickerRootEmits,
  MonthPickerRootProps,
  MonthPickerTriggerProps,
  MonthPickerUi
} from '@soybeanjs/headless/month-picker';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the MonthPicker component.
 */
export interface MonthPickerProps extends MonthPickerRootProps {
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
  ui?: Partial<MonthPickerUi>;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: MonthPickerTriggerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: MonthPickerPopupProps;
}

/**
 * Events for the MonthPicker component.
 */
export type MonthPickerEmits = MonthPickerRootEmits;

/**
 * Slots for the MonthPicker component.
 */
export interface MonthPickerSlots {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { displayValue: string; modelValue: DateValue | undefined; open: boolean }) => any;
  /**
   * Custom content for the heading slot.
   */
  heading?: (props: { headingValue: string }) => any;
  /**
   * Custom content for the prev slot.
   */
  prev?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the next slot.
   */
  next?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the month slot.
   */
  month?: (props: { date: DateValue; label: string; disabled: boolean; focused: boolean; selected: boolean }) => any;
  /**
   * Custom content for the default slot.
   */
  default?: (props: { displayValue: string; modelValue: DateValue | undefined; open: boolean }) => any;
}
