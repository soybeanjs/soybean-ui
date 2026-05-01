import type {
  ClassValue,
  CalendarCompactProps,
  CalendarCompactEmits,
  CalendarCompactSlots,
  CalendarUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the calendar component.
 */
export interface CalendarProps<M extends boolean = false> extends CalendarCompactProps<M> {
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
  ui?: Partial<CalendarUi>;
}

/**
 * Emits for the calendar component.
 */
export type CalendarEmits<M extends boolean = false> = CalendarCompactEmits<M>;

/**
 * Slots for the calendar component.
 */
export type CalendarSlots<M extends boolean = false> = CalendarCompactSlots<M>;
