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

export type ColorSwatchPickerExtraUiSlot = 'checker' | 'fill';

export type ColorSwatchPickerExtendedUi = UiClass<ColorSwatchPickerUiSlot | ColorSwatchPickerExtraUiSlot>;

export interface ColorSwatchPickerProps extends ColorSwatchPickerRootProps<boolean> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<ColorSwatchPickerExtendedUi>;
  colors?: string[];
  shape?: ColorSwatchPickerShape;
  itemProps?: Omit<ColorSwatchPickerItemProps, 'value'>;
  indicatorProps?: ColorSwatchPickerItemIndicatorProps;
  swatchProps?: ColorSwatchPickerItemSwatchProps;
}

export type ColorSwatchPickerEmits = ColorSwatchPickerRootEmits<boolean> & ColorSwatchPickerItemEmits;

export type { ColorSwatchPickerShape };
