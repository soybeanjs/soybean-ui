import type { ColorValue } from '../../shared';
import { BaseProps } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the ColorSwatch component.
 */
export interface ColorSwatchProps extends PrimitiveProps, Omit<BaseProps, 'color'> {
  /**
   * Theme color of the component.
   */
  color?: string | ColorValue;
  /**
   * Label text rendered by the component.
   */
  label?: string;
}
