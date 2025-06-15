import type { SVGAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

export interface ArrowProps extends PrimitiveProps, /** @vue-ignore */ SVGAttributes {
  /**
   * The width of the arrow in pixels.
   *
   * @defaultValue 1em
   */
  width?: number | string;
  /**
   * The height of the arrow in pixels.
   *
   * @defaultValue 0.5em
   */
  height?: number | string;
}
