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
 * Props for the date range picker component.
 */
export interface DateRangePickerProps extends /* @vue-ignore */ DateRangePickerRootProps {
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
   * Props forwarded to the trigger element.
   */
  triggerProps?: DateRangePickerTriggerProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: DateRangePickerPopupProps;
}

/**
 * Emits for the date range picker component.
 */
export type DateRangePickerEmits = DateRangePickerRootEmits;

/**
 * Slots for the date range picker component.
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
