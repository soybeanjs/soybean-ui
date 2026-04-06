import type {
  ColorSliderRootEmits,
  ColorSliderRootProps,
  ColorSliderThumbProps,
  ColorSliderTrackProps,
  ColorSliderUi
} from '@soybeanjs/headless/color-slider';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export interface ColorSliderProps extends ColorSliderRootProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<ColorSliderUi>;
  trackProps?: ColorSliderTrackProps;
  thumbProps?: ColorSliderThumbProps;
}

export type ColorSliderEmits = ColorSliderRootEmits;
