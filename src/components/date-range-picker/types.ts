import type { DateRange, DateValue } from '@soybeanjs/headless/date';
import type {
  DateRangePickerPopupProps,
  DateRangePickerRootEmits,
  DateRangePickerRootProps,
  DateRangePickerTriggerProps,
  DateRangePickerUi
} from '@soybeanjs/headless/date-range-picker';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the DateRangePicker component.
 */
export interface DateRangePickerProps extends DateRangePickerRootProps {
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
  ui?: Partial<DateRangePickerUi>;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: DateRangePickerTriggerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: DateRangePickerPopupProps;
}

/**
 * Events for the DateRangePicker component.
 */
export type DateRangePickerEmits = DateRangePickerRootEmits;

/**
 * Slots for the DateRangePicker component.
 */
export interface DateRangePickerSlots {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { open: boolean }) => any;
  /**
   * Custom content for the default slot.
   */
  default?: (props: {
    modelValue: DateRange;
    open: boolean;
    placeholder: DateValue;
    setPlaceholder: (date: DateValue) => void;
    setRange: (range: DateRange) => void;
  }) => any;
  /**
   * Custom content for the calendar slot.
   */
  calendar?: (props: { modelValue: DateRange; placeholder: DateValue }) => any;
}
