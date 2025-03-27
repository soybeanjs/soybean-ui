import type { ClassValueProp, PrimitiveProps } from '../../types';

export interface ArrowProps extends ClassValueProp {
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
  /**
   * When `true`, render the rounded version of arrow. Do not work with `as`/`asChild`
   *
   * @defaultValue false
   */
  rounded?: boolean;
}
export type ArrowPropsWithPrimitive = ArrowProps & PrimitiveProps;
