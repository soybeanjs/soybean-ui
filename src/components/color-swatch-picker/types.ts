import type {
  ClassValue,
  ColorSwatchPickerItemEmits,
  ColorSwatchPickerItemIndicatorProps,
  ColorSwatchPickerItemProps,
  ColorSwatchPickerItemSwatchProps,
  ColorSwatchPickerRootEmits,
  ColorSwatchPickerRootProps,
  ColorSwatchPickerUiSlot,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { ColorSwatchPickerShape } from './variants';

/**
 * Additional UI slots for the color swatch picker component.
 */
export type ColorSwatchPickerExtraUiSlot = 'checker' | 'fill';

/**
 * Extended UI class overrides for the color swatch picker component.
 */
export type ColorSwatchPickerExtendedUi = UiClass<ColorSwatchPickerUiSlot | ColorSwatchPickerExtraUiSlot>;

/**
 * Props for the color swatch picker component.
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
   * Props forwarded to the item element.
   */
  itemProps?: Omit<ColorSwatchPickerItemProps, 'value'>;
  /**
   * Props forwarded to the indicator element.
   */
  indicatorProps?: ColorSwatchPickerItemIndicatorProps;
  /**
   * Props forwarded to the swatch element.
   */
  swatchProps?: ColorSwatchPickerItemSwatchProps;
}

/**
 * Emits for the color swatch picker component.
 */
export type ColorSwatchPickerEmits = ColorSwatchPickerRootEmits<boolean> & ColorSwatchPickerItemEmits;

export type { ColorSwatchPickerShape };
