import type { LabelProps as $LabelProps } from 'radix-vue';
import type { LabelSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type LabelProps = $LabelProps & {
  class?: ClassValue;
  size?: LabelSize;
};
