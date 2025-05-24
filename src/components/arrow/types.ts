import type { ClassValueProp } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface ArrowProps extends ClassValueProp, PrimitiveProps {
  /**
   * The width of the arrow in pixels.
   *
   * @defaultValue 10
   */
  width?: number;
  /**
   * The height of the arrow in pixels.
   *
   * @defaultValue 5
   */
  height?: number;
}
