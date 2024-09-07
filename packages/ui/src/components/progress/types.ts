import type { ClassValue, ProgressColor, ProgressSize } from '@soybean-ui/variants';
import type { ProgressRootProps as $ProgressRootProps } from 'radix-vue';

export type ProgressRootProps = $ProgressRootProps & {
  class?: ClassValue;
  size?: ProgressSize;
};

export type ProgressIndicatorProps = {
  class?: ClassValue;
  modelValue?: number | null;
  color?: ProgressColor;
};

export type ProgressProps = $ProgressRootProps & {
  class?: ClassValue;
  indicatorClass?: ClassValue;
  color?: ProgressColor;
  size?: ProgressSize;
};

export type { ProgressColor, ProgressSize };
