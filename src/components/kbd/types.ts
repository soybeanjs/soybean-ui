import type { ClassValue, KbdProps as _KbdProps } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { KbdVariant } from './variants';

/**
 * Props for the kbd component.
 */
export interface KbdProps extends _KbdProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Visual variant of the component.
   */
  variant?: KbdVariant;
  /**
   * Whether raised.
   */
  raised?: boolean;
}

export type { KbdVariant };
