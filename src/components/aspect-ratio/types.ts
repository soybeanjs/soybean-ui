import type { ClassValueProp } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface AspectRatioProps extends ClassValueProp, PrimitiveProps {
  /**
   * The desired ratio. Eg: 16/9
   *
   * @defaultValue 1
   */
  ratio?: number;
}
