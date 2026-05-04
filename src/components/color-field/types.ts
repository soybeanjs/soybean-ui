import type {
  ColorFieldInputProps,
  ColorFieldRootEmits,
  ColorFieldRootProps,
  ColorFieldUi
} from '@soybeanjs/headless/color-field';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the ColorField component.
 */
export interface ColorFieldProps extends ColorFieldRootProps {
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
  ui?: Partial<ColorFieldUi>;
  /**
   * Properties forwarded to the input element.
   */
  inputProps?: ColorFieldInputProps;
}

/**
 * Events for the ColorField component.
 */
export type ColorFieldEmits = ColorFieldRootEmits;
