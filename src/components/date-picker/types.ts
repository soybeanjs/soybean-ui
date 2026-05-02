import type {
  DatePickerUi,
  DatePickerCompactProps,
  DatePickerCompactEmits,
  DatePickerCompactSlots
} from '@soybeanjs/headless/date-picker';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the date picker component.
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
}

/**
 * Emits for the date picker component.
 */
export type DatePickerEmits = DatePickerCompactEmits;

/**
 * Slots for the date picker component.
 */
export type DatePickerSlots = DatePickerCompactSlots;
