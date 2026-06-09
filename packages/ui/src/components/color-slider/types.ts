import type { ColorSliderCompactEmits, ColorSliderCompactProps, ColorSliderUi } from '@soybeanjs/headless/color-slider';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';

/**
 * Properties for the ColorSlider component.
 */
export interface ColorSliderProps extends ColorSliderCompactProps {
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
}

/**
 * Events for the ColorSlider component.
 */
export type ColorSliderEmits = ColorSliderCompactEmits;
