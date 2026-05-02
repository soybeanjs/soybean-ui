import type { LabelProps as _LabelProps } from '@soybeanjs/headless/label';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the label component.
 */
export interface LabelProps extends _LabelProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
}
