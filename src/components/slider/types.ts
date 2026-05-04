import type {
  SliderRangeProps,
  SliderRootEmits,
  SliderRootProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderUi
} from '@soybeanjs/headless/slider';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';

/**
 * Properties for the slider component.
 */
export interface SliderProps extends SliderRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<SliderUi>;
  /**
   * Properties forwarded to the track element.
   */
  trackProps?: SliderTrackProps;
  /**
   * Properties forwarded to the range element.
   */
  rangeProps?: SliderRangeProps;
  /**
   * Properties forwarded to the thumb element.
   */
  thumbProps?: Omit<SliderThumbProps, 'index'>;
}

/**
 * Events for the slider component.
 */
export type SliderEmits = SliderRootEmits;
