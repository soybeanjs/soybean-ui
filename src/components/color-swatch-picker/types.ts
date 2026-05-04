import type {
  ColorSwatchPickerItemEmits,
  ColorSwatchPickerItemIndicatorProps,
  ColorSwatchPickerItemProps,
  ColorSwatchPickerItemSwatchProps,
  ColorSwatchPickerRootEmits,
  ColorSwatchPickerRootProps,
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
export interface ColorSwatchPickerProps extends ColorSwatchPickerRootProps<boolean> {
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
   * Colors.
   */
  colors?: string[];
  /**
   * Shape of the component.
   */
  shape?: ColorSwatchPickerShape;
  /**
   * Properties forwarded to the item element.
   */
  itemProps?: Omit<ColorSwatchPickerItemProps, 'value'>;
  /**
   * Properties forwarded to the indicator element.
   */
  indicatorProps?: ColorSwatchPickerItemIndicatorProps;
  /**
   * Properties forwarded to the swatch element.
   */
  swatchProps?: ColorSwatchPickerItemSwatchProps;
}

/**
 * Events for the ColorSwatchPicker component.
 */
export type ColorSwatchPickerEmits = ColorSwatchPickerRootEmits<boolean> & ColorSwatchPickerItemEmits;

export type { ColorSwatchPickerShape };
