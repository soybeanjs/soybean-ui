import type { ClassValue, UiClass } from '@soybeanjs/headless';
import type { ColorSwatchProps as HeadlessColorSwatchProps } from '@soybeanjs/headless/color-swatch';
import type { ThemeSize } from '@/theme';
import type { ColorSwatchShape } from './variants';

export type ColorExtraUiSlot = 'checker' | 'fill';

export type ColorSwatchExtendedUi = UiClass<ColorExtraUiSlot>;

export interface ColorSwatchProps extends HeadlessColorSwatchProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<ColorSwatchExtendedUi>;
  shape?: ColorSwatchShape;
}

export type { ColorSwatchShape };
