import type { ClassValue, ProgressColor, ProgressSize } from '@soybean-ui/variants';
import type { ProgressRootProps as $ProgressRootProps } from 'radix-vue';
import type { PrimitivePropsWithClass } from '../../types';

export type ProgressProps = $ProgressRootProps &
  PrimitivePropsWithClass & {
    indicatorClass?: ClassValue;
    color?: ProgressColor;
    size?: ProgressSize;
  };

export type { ProgressColor, ProgressSize };
