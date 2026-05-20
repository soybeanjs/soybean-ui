import type { CalendarUi } from '@soybeanjs/headless/calendar';
import type { DatePickerUi, DatePickerCompactProps, DatePickerCompactEmits } from '@soybeanjs/headless/date-picker';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the DatePicker component.
 */
export interface DatePickerProps extends DatePickerCompactProps {
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
  ui?: Partial<DatePickerUi>;
  /**
   * Per-slot class overrides for the Calendar component within the DatePicker.
   */
  calendarUi?: Partial<CalendarUi>;
}

/**
 * Events for the DatePicker component.
 */
export type DatePickerEmits = DatePickerCompactEmits;
