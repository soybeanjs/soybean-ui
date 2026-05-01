import type {
  ClassValue,
  ColorAreaAreaProps,
  ColorAreaRootEmits,
  ColorAreaRootProps,
  ColorAreaThumbProps,
  ColorAreaUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the color area component.
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
   * Props forwarded to the area element.
   */
  areaProps?: ColorAreaAreaProps;
  /**
   * Props forwarded to the thumb element.
   */
  thumbProps?: ColorAreaThumbProps;
}

/**
 * Emits for the color area component.
 */
export type ColorAreaEmits = ColorAreaRootEmits;
