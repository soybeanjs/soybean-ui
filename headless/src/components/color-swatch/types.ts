import type { ColorValue } from '../../shared';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * Properties for the ColorSwatch component.
 */
export interface ColorSwatchProps extends Omit<PrimitiveWithBaseProps, 'color'> {
  /**
   * Theme color of the component.
   */
  color?: string | ColorValue;
  /**
   * Label text rendered by the component.
   */
  label?: string;
}
