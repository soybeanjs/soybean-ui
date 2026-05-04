import type { KbdProps as _KbdProps } from '@soybeanjs/headless/kbd';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
import type { KbdVariant } from './variants';

/**
 * Properties for the Kbd component.
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
