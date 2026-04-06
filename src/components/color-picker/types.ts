import type { ClassValue, UiClass } from '@soybeanjs/headless';
import type { ColorFormat, ColorSpace, ColorValue, NormalizedColor } from '@soybeanjs/headless/shared';
import type { ColorAreaProps } from '@/components/color-area/types';
import type { ColorFieldProps } from '@/components/color-field/types';
import type { ColorSliderProps } from '@/components/color-slider/types';
import type { ColorSwatchProps as UiColorSwatchProps } from '@/components/color-swatch/types';
import type { ColorSwatchPickerProps } from '@/components/color-swatch-picker/types';
import type { ThemeSize } from '@/theme';
import type { ButtonProps } from '../button/types';
import type { PopoverProps } from '../popover/types';

export type ColorPickerUiSlot =
  | 'popup'
  | 'content'
  | 'trigger'
  | 'triggerSwatch'
  | 'triggerValue'
  | 'formatSelect'
  | 'area'
  | 'slider'
  | 'alphaRow'
  | 'alphaSwatch'
  | 'fields'
  | 'hexField'
  | 'field'
  | 'alphaField'
  | 'swatches';

export type ColorPickerUi = UiClass<ColorPickerUiSlot>;

export interface ColorPickerProps extends Pick<
  PopoverProps,
  | 'open'
  | 'defaultOpen'
  | 'modal'
  | 'placement'
  | 'showArrow'
  | 'positionerProps'
  | 'popupProps'
  | 'triggerProps'
  | 'closeProps'
  | 'portalProps'
  | 'arrowProps'
> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<ColorPickerUi>;
  modelValue?: string | ColorValue;
  defaultValue?: string | ColorValue;
  format?: ColorFormat;
  defaultFormat?: ColorFormat;
  disabled?: boolean;
  colorSpace?: ColorSpace;
  showAlpha?: boolean;
  showFields?: boolean;
  showSwatches?: boolean;
  swatches?: string[];
  triggerButtonProps?: ButtonProps;
  areaProps?: Omit<
    ColorAreaProps,
    | 'modelValue'
    | 'defaultValue'
    | 'disabled'
    | 'colorSpace'
    | 'format'
    | 'xChannel'
    | 'yChannel'
    | 'onChange'
    | 'onChangeEnd'
  >;
  hueSliderProps?: Omit<
    ColorSliderProps,
    'modelValue' | 'defaultValue' | 'channel' | 'colorSpace' | 'disabled' | 'format' | 'onChange' | 'onChangeEnd'
  >;
  alphaSliderProps?: Omit<
    ColorSliderProps,
    'modelValue' | 'defaultValue' | 'channel' | 'colorSpace' | 'disabled' | 'format' | 'onChange' | 'onChangeEnd'
  >;
  alphaFieldProps?: Omit<
    ColorFieldProps,
    'modelValue' | 'defaultValue' | 'disabled' | 'channel' | 'colorSpace' | 'format'
  >;
  hexFieldProps?: Omit<
    ColorFieldProps,
    'modelValue' | 'defaultValue' | 'disabled' | 'channel' | 'colorSpace' | 'format'
  >;
  fieldProps?: Omit<ColorFieldProps, 'modelValue' | 'defaultValue' | 'disabled' | 'channel' | 'colorSpace' | 'format'>;
  swatchPickerProps?: Omit<ColorSwatchPickerProps, 'modelValue' | 'defaultValue' | 'colors' | 'disabled'>;
  swatchProps?: Omit<UiColorSwatchProps, 'class' | 'color' | 'size'>;
}

export type ColorPickerEmits = {
  'update:modelValue': [value: string];
  'update:color': [value: NormalizedColor];
  'update:format': [value: ColorFormat];
  'update:open': [value: boolean];
  change: [value: string];
};
