import type { SeparatorLabelProps, SeparatorRootProps, SeparatorUi } from '@soybeanjs/headless/separator';
import type { Align, ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
import type { SeparatorBorder } from './variants';

/**
 * Props for the separator component.
 */
export interface SeparatorProps extends SeparatorRootProps {
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
  /**
   * Label text rendered by the component.
   */
  label?: string;
  /**
   * Props forwarded to the label element.
   */
  labelProps?: SeparatorLabelProps;
}
