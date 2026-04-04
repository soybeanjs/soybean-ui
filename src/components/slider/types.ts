import type {
  ClassValue,
  SliderRangeProps,
  SliderRootEmits,
  SliderRootProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderUi
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export interface SliderProps extends SliderRootProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<SliderUi>;
  trackProps?: SliderTrackProps;
  rangeProps?: SliderRangeProps;
  thumbProps?: Omit<SliderThumbProps, 'index'>;
}

export type SliderEmits = SliderRootEmits;
