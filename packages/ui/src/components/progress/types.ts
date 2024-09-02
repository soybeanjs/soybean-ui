import type { ClassValue, ProgressColor, ProgressSize } from '@soybean-ui/variants';
import type { ProgressRootProps as $ProgressRootProps } from 'radix-vue';
import type { PrimitivePropsWithClass } from '../../types';

export type ProgressRootProps = PrimitivePropsWithClass & {
  size?: ProgressSize;
};

export type ProgressIndicatorProps = PrimitivePropsWithClass & {
  modelValue?: number | null;
  color?: ProgressColor;
};

export type ProgressProps = $ProgressRootProps &
  PrimitivePropsWithClass & {
    indicatorClass?: ClassValue;
    color?: ProgressColor;
    size?: ProgressSize;
  };

export type { ProgressColor, ProgressSize };
