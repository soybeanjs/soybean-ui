import type { ClassValue } from '@soybeanjs/headless/types';
import type {
  TimeFieldInputProps,
  TimeFieldRootEmits,
  TimeFieldRootProps,
  TimeFieldUi
} from '@soybeanjs/headless/time-field';
import type { ThemeSize } from '@/theme';

/**
 * Slot props for the time field component.
 */
export interface TimeFieldSlotProps {
  /**
   * Current model value.
   */
  modelValue: TimeFieldRootProps['modelValue'];
  /**
   * Segments exposed in the slot scope.
   */
  segments: { part: TimeFieldInputProps['part']; value: string }[];
  /**
   * Whether the current value is invalid.
   */
  isInvalid: boolean;
}

/**
 * Props for the time field component.
 */
export interface TimeFieldProps extends /* @vue-ignore */ TimeFieldRootProps {
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
  ui?: Partial<TimeFieldUi>;
  /**
   * Props forwarded to the input element.
   */
  inputProps?: Omit<TimeFieldInputProps, 'part'>;
}

/**
 * Emits for the time field component.
 */
export type TimeFieldEmits = TimeFieldRootEmits;

/**
 * Slots for the time field component.
 */
export interface TimeFieldSlots {
  /**
   * Custom content for the default slot.
   */
  default?: (props: TimeFieldSlotProps) => any;
}
