import type {
  ClassValue,
  ColorFieldInputProps,
  ColorFieldRootEmits,
  ColorFieldRootProps,
  ColorFieldUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the color field component.
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
   * Props forwarded to the input element.
   */
  inputProps?: ColorFieldInputProps;
}

/**
 * Emits for the color field component.
 */
export type ColorFieldEmits = ColorFieldRootEmits;
