import type { ClassValue, Align } from '@soybeanjs/headless';
import type {
  InputOtpCompactEmits,
  InputOtpCompactProps,
  InputOtpCompactSlots,
  InputOtpUi
} from '@soybeanjs/headless/input-otp';
import type { ThemeSize } from '@/theme';

export interface InputOtpProps extends InputOtpCompactProps {
  /** Root class. */
  class?: ClassValue;
  size?: ThemeSize;
  align?: Align;
  ui?: Partial<InputOtpUi>;
}

export type InputOtpEmits = InputOtpCompactEmits;

export type InputOtpSlots = InputOtpCompactSlots;
