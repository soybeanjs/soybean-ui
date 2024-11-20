import type { PrimitiveProps } from '../primitive';

export interface AspectRatioProps {
  /** The desired ratio. Eg: 16/9 */
  ratio?: number;
}

export type AspectRatioPropsWithPrimitive = AspectRatioProps & PrimitiveProps;
