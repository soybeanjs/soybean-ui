import type { ClassValue } from '@soybeanjs/headless';
import type { DateFieldCompactProps, DateFieldCompactEmits, DateFieldUi } from '@soybeanjs/headless/date-field';
import type { ThemeSize } from '@/theme';

/**
 * Props for the date field component.
 */
export interface DateFieldProps extends DateFieldCompactProps {
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
  ui?: Partial<DateFieldUi>;
}

/**
 * Emits for the date field component.
 */
export type DateFieldEmits = DateFieldCompactEmits;
