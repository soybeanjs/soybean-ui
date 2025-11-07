import type { HTMLAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

export interface AspectRatioProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The desired ratio. Eg: 16/9
   *
   * @defaultValue 1
   */
  ratio?: number;
}
