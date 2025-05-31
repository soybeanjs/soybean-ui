import type { SVGAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

export interface ArrowProps extends PrimitiveProps, /** @vue-ignore */ SVGAttributes {
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
