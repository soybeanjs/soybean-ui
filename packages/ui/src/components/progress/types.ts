import type { ProgressRootProps as $ProgressRootProps } from 'radix-vue';
import type { ClassValue, ProgressColor, ProgressSize } from '@soybean-ui/variants';

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
