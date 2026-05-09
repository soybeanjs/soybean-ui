import type {
  ColorSwatchPickerCompactEmits,
  ColorSwatchPickerCompactProps,
  ColorSwatchPickerUiSlot
} from '@soybeanjs/headless/color-swatch-picker';
import type { ClassValue, UiClass } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
import type { ColorSwatchPickerShape } from './variants';

/**
 * Additional UI slots for the color swatch picker component.
 */
export type ColorSwatchPickerExtraUiSlot = 'checker' | 'fill';

/**
 * Extended UI class overrides for the ColorSwatchPicker component.
 */
export type ColorSwatchPickerExtendedUi = UiClass<ColorSwatchPickerUiSlot | ColorSwatchPickerExtraUiSlot>;

/**
 * Properties for the ColorSwatchPicker component.
 */
export interface ColorSwatchPickerProps extends ColorSwatchPickerCompactProps<boolean> {
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
  ui?: Partial<ColorSwatchPickerExtendedUi>;
  /**
   * Shape of the component.
   */
  shape?: ColorSwatchPickerShape;
}

/**
 * Events for the ColorSwatchPicker component.
 */
export type ColorSwatchPickerEmits = ColorSwatchPickerCompactEmits<boolean>;

export type { ColorSwatchPickerShape };
