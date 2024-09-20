import type { ProgressRootProps as $ProgressRootProps } from 'radix-vue';
import type { ProgressColor, ProgressSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type ProgressRootProps = $ProgressRootProps & {
  class?: ClassValue;
  size?: ProgressSize;
  color?: ProgressColor;
};

export type ProgressIndicatorProps = {
  class?: ClassValue;
  modelValue?: number | null;
  color?: ProgressColor;
};

export type ProgressProps = ProgressRootProps & {
  indicatorClass?: ClassValue;
};

export type { ProgressColor, ProgressSize };
