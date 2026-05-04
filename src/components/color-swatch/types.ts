import type { ClassValue, UiClass } from '@soybeanjs/headless/types';
import type { ColorSwatchProps as HeadlessColorSwatchProps } from '@soybeanjs/headless/color-swatch';
import type { ThemeSize } from '@/theme';
import type { ColorSwatchShape } from './variants';

/**
 * Additional UI slots for the color swatch component.
 */
export type ColorExtraUiSlot = 'checker' | 'fill';

/**
 * Extended UI class overrides for the ColorSwatch component.
 */
export type ColorSwatchExtendedUi = UiClass<ColorExtraUiSlot>;

/**
 * Properties for the ColorSwatch component.
 */
export interface ColorSwatchProps extends HeadlessColorSwatchProps {
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
  ui?: Partial<ColorSwatchExtendedUi>;
  /**
   * Shape of the component.
   */
  shape?: ColorSwatchShape;
}

export type { ColorSwatchShape };
