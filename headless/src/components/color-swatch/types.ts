import type { HTMLAttributes } from 'vue';
import type { ColorValue } from '../../shared';
import type { PrimitiveProps } from '../primitive/types';

export interface ColorSwatchProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'color'> {
  color?: string | ColorValue;
  label?: string;
}
