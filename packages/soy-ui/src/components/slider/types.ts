import type {
  ClassValue,
  SliderRootEmits,
  SliderRootProps,
  SliderRangeProps as _SliderRangeProps,
  SliderThumbProps as _SliderThumbProps,
  SliderTrackProps as _SliderTrackProps
} from '@soybean-ui/primitives';
import type { SliderSlots } from '@soybean-ui/variants';
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

export type SliderUi = Partial<Record<SliderSlots, ClassValue>>;

export interface SliderProps extends SliderRootProps {
  ui?: SliderUi;
  color?: ThemeColor;
}

export type SliderEmits = SliderRootEmits;

export type { SliderRootEmits, SliderRootProps };
