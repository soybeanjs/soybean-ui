import type { HTMLAttributes } from 'vue';
import type { ColorValue } from '../../shared';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the ColorSwatch component.
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
