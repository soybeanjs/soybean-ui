import type { HTMLAttributes } from 'vue';
import type { ColorValue } from '../../shared';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Props for the color swatch component.
 */
export interface ColorSwatchProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'color'> {
  /**
   * Theme color of the component.
   */
  color?: string | ColorValue;
  /**
   * Label text rendered by the component.
   */
  label?: string;
}
