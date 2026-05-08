import type {
  DateRangePickerCompactProps,
  DateRangePickerCompactEmits,
  DateRangePickerUi
} from '@soybeanjs/headless/date-range-picker';
import type { CalendarRangeUi } from '@soybeanjs/headless/calendar-range';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the DateRangePicker component.
 */
export interface DateRangePickerProps extends DateRangePickerCompactProps {
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
   * Per-slot class overrides for the CalendarRange component within the DateRangePicker.
   */
  calendarRangeUi?: Partial<CalendarRangeUi>;
}

/**
 * Events for the DateRangePicker component.
 */
export type DateRangePickerEmits = DateRangePickerCompactEmits;
