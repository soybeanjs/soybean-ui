import type { BaseProps } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the AspectRatio component.
 */
export interface AspectRatioProps extends PrimitiveProps, BaseProps {
  /**
   * The desired ratio. Eg: 16/9
   *
   * @defaultValue 1
   */
  ratio?: number;
}
