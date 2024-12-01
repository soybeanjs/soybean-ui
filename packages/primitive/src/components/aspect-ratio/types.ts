import type { ClassValueProp, PrimitiveProps } from '@soybean-ui/primitive';

export interface AspectRatioProps extends ClassValueProp {
  /** The desired ratio. Eg: 16/9 */
  ratio?: number;
}

export type AspectRatioPropsWithPrimitive = AspectRatioProps & PrimitiveProps;
