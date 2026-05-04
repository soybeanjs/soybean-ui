import type {
  ColorSliderRootEmits,
  ColorSliderRootProps,
  ColorSliderThumbProps,
  ColorSliderTrackProps,
  ColorSliderUi
} from '@soybeanjs/headless/color-slider';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';

/**
 * Properties for the color slider component.
 */
export interface ColorSliderProps extends ColorSliderRootProps {
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
  ui?: Partial<ColorSliderUi>;
  /**
   * Properties forwarded to the track element.
   */
  trackProps?: ColorSliderTrackProps;
  /**
   * Properties forwarded to the thumb element.
   */
  thumbProps?: ColorSliderThumbProps;
}

/**
 * Events for the color slider component.
 */
export type ColorSliderEmits = ColorSliderRootEmits;
