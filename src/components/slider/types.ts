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
 * Props for the slider component.
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
   * Props forwarded to the track element.
   */
  trackProps?: SliderTrackProps;
  /**
   * Props forwarded to the range element.
   */
  rangeProps?: SliderRangeProps;
  /**
   * Props forwarded to the thumb element.
   */
  thumbProps?: Omit<SliderThumbProps, 'index'>;
}

/**
 * Emits for the slider component.
 */
export type SliderEmits = SliderRootEmits;
