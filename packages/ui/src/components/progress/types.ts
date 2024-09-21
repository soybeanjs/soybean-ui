import type { ProgressRootProps as $ProgressRootProps } from 'radix-vue';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type ProgressRootProps = $ProgressRootProps & {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
};

export type ProgressIndicatorProps = {
  class?: ClassValue;
  modelValue?: number | null;
  color?: ThemeColor;
};

export type ProgressProps = ProgressRootProps & {
  indicatorClass?: ClassValue;
};
