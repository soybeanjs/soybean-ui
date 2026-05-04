import type { ClassValue } from '@soybeanjs/headless/types';
import type { DateRange, DateValue } from '@soybeanjs/headless/date';
import type {
  MonthRangePickerPopupProps,
  MonthRangePickerRootEmits,
  MonthRangePickerRootProps,
  MonthRangePickerTriggerProps,
  MonthRangePickerUi
} from '@soybeanjs/headless/month-range-picker';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the month range picker component.
 */
export interface MonthRangePickerProps extends /** @vue-ignore */ MonthRangePickerRootProps {
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
  ui?: Partial<MonthRangePickerUi>;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: MonthRangePickerTriggerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: MonthRangePickerPopupProps;
}

/**
 * Events for the month range picker component.
 */
export type MonthRangePickerEmits = MonthRangePickerRootEmits;

/**
 * Slots for the month range picker component.
 */
export interface MonthRangePickerSlots {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
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
  /**
   * Custom content for the default slot.
   */
  default?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
}
