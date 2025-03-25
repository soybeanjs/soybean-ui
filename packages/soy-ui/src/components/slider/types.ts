import type {
  ClassValue,
  SliderRootEmits,
  SliderRangeProps as _SliderRangeProps,
  SliderRootProps as _SliderRootProps,
  SliderThumbProps as _SliderThumbProps,
  SliderTrackProps as _SliderTrackProps
} from '@soybean-ui/primitives';
import type { SliderSlots, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface SliderRootProps extends _SliderRootProps {
  size?: ThemeSize;
}

export interface SliderTrackProps extends _SliderTrackProps {
  color?: ThemeColor;
  size?: ThemeSize;
}

export interface SliderRangeProps extends _SliderRangeProps {
  color?: ThemeColor;
}

export interface SliderThumbProps extends _SliderThumbProps {
  color?: ThemeColor;
  size?: ThemeSize;
}

export type SliderUi = Partial<Record<SliderSlots, ClassValue>>;

export interface SliderProps extends SliderRootProps {
  ui?: SliderUi;
  color?: ThemeColor;
}

export type SliderEmits = SliderRootEmits;

export type { SliderRootEmits };
