import type {
  ColorAreaAreaProps,
  ColorAreaRootEmits,
  ColorAreaRootProps,
  ColorAreaThumbProps,
  ColorAreaUi
} from '@soybeanjs/headless/color-area';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the ColorArea component.
 */
export interface ColorAreaProps extends ColorAreaRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ColorAreaUi>;
  /**
   * Properties forwarded to the area element.
   */
  areaProps?: ColorAreaAreaProps;
  /**
   * Properties forwarded to the thumb element.
   */
  thumbProps?: ColorAreaThumbProps;
}

/**
 * Events for the ColorArea component.
 */
export type ColorAreaEmits = ColorAreaRootEmits;
