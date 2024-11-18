import type { PrimitiveProps } from '../primitive/types';

export interface AspectRatioProps {
  /** The desired ratio. Eg: 16/9 */
  value?: number;
}

export type AspectRatioPropsWithPrimitive = AspectRatioProps & PrimitiveProps;
