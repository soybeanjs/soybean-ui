import type { ClassValue, Align } from '@soybeanjs/headless';
import type {
  InputOtpCompactEmits,
  InputOtpCompactProps,
  InputOtpCompactSlots,
  InputOtpUi
} from '@soybeanjs/headless/input-otp';
import type { ThemeSize } from '@/theme';

/**
 * Props for the input otp component.
 */
export interface InputOtpProps extends InputOtpCompactProps {
  /** Root class. */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Align.
   */
  align?: Align;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<InputOtpUi>;
}

/**
 * Emits for the input otp component.
 */
export type InputOtpEmits = InputOtpCompactEmits;

/**
 * Slots for the input otp component.
 */
export type InputOtpSlots = InputOtpCompactSlots;
