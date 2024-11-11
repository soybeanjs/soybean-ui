import type { ProgressRootEmits, ProgressRootProps as _ProgressRootProps } from 'reka-ui';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type ProgressRootProps = ClassValueProp &
  Omit<_ProgressRootProps, 'as' | 'asChild'> & {
    color?: ThemeColor;
    size?: ThemeSize;
  };

export type ProgressIndicatorProps = ClassValueProp & {
  modelValue?: number | null;
  color?: ThemeColor;
};

export type ProgressProps = ProgressRootProps & {
  indicatorClass?: ClassValue;
};

export type ProgressEmits = ProgressRootEmits;

export type { ProgressRootEmits };
