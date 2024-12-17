import type {
  ClassValue,
  SliderRootEmits,
  SliderRootProps,
  SliderRangeProps as _SliderRangeProps,
  SliderThumbProps as _SliderThumbProps,
  SliderTrackProps as _SliderTrackProps
} from '@soybean-ui/primitive';
import type { ThemeColor } from '../../types';

export interface SliderTrackProps extends _SliderTrackProps {
  color?: ThemeColor;
}

export interface SliderRangeProps extends _SliderRangeProps {
  color?: ThemeColor;
}

export interface SliderThumbProps extends _SliderThumbProps {
  color?: ThemeColor;
}

export interface SliderProps extends SliderRootProps {
  color?: ThemeColor;
  trackClass?: ClassValue;
  rangeClass?: ClassValue;
  thumbClass?: ClassValue;
}

export type SliderEmits = SliderRootEmits;

export type { SliderRootEmits, SliderRootProps };
