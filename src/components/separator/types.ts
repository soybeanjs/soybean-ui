import type { SeparatorCompactProps, SeparatorUi } from '@soybeanjs/headless/separator';
import type { Align, ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
import type { SeparatorBorder } from './variants';

/**
 * Properties for the Separator component.
 */
export interface SeparatorProps extends SeparatorCompactProps {
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
  ui?: Partial<SeparatorUi>;
  /**
   * Align.
   */
  align?: Align;
  /**
   * Border.
   */
  border?: SeparatorBorder;
}
