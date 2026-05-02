import type { ClassValue, UiClass } from '@soybeanjs/headless/types';
import type { ColorFormat, ColorSpace, ColorValue, NormalizedColor } from '@soybeanjs/headless/shared';
import type { ColorAreaProps } from '@/components/color-area/types';
import type { ColorFieldProps } from '@/components/color-field/types';
import type { ColorSliderProps } from '@/components/color-slider/types';
import type { ColorSwatchProps as UiColorSwatchProps } from '@/components/color-swatch/types';
import type { ColorSwatchPickerProps } from '@/components/color-swatch-picker/types';
import type { ThemeSize } from '@/theme';
import type { ButtonProps } from '../button/types';
import type { PopoverProps } from '../popover/types';

/**
 * Available UI slots for the color picker component.
 */
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

/**
 * UI class overrides for the color picker component.
 */
export type ColorPickerUi = UiClass<ColorPickerUiSlot>;

/**
 * Props for the color picker component.
 */
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
  ui?: Partial<ColorPickerUi>;
  /**
   * Current model value.
   */
  modelValue?: string | ColorValue;
  /**
   * Default value.
   */
  defaultValue?: string | ColorValue;
  /**
   * Format.
   */
  format?: ColorFormat;
  /**
   * Default format.
   */
  defaultFormat?: ColorFormat;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Color space.
   */
  colorSpace?: ColorSpace;
  /**
   * Whether to show an alpha.
   */
  showAlpha?: boolean;
  /**
   * Whether to show a fields.
   */
  showFields?: boolean;
  /**
   * Whether to show a swatches.
   */
  showSwatches?: boolean;
  /**
   * Swatches.
   */
  swatches?: string[];
  /**
   * Props forwarded to the trigger button element.
   */
  triggerButtonProps?: ButtonProps;
  /**
   * Props forwarded to the area element.
   */
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
  /**
   * Props forwarded to the hue slider element.
   */
  hueSliderProps?: Omit<
    ColorSliderProps,
    'modelValue' | 'defaultValue' | 'channel' | 'colorSpace' | 'disabled' | 'format' | 'onChange' | 'onChangeEnd'
  >;
  /**
   * Props forwarded to the alpha slider element.
   */
  alphaSliderProps?: Omit<
    ColorSliderProps,
    'modelValue' | 'defaultValue' | 'channel' | 'colorSpace' | 'disabled' | 'format' | 'onChange' | 'onChangeEnd'
  >;
  /**
   * Props forwarded to the alpha field element.
   */
  alphaFieldProps?: Omit<
    ColorFieldProps,
    'modelValue' | 'defaultValue' | 'disabled' | 'channel' | 'colorSpace' | 'format'
  >;
  /**
   * Props forwarded to the hex field element.
   */
  hexFieldProps?: Omit<
    ColorFieldProps,
    'modelValue' | 'defaultValue' | 'disabled' | 'channel' | 'colorSpace' | 'format'
  >;
  /**
   * Props forwarded to the field element.
   */
  fieldProps?: Omit<ColorFieldProps, 'modelValue' | 'defaultValue' | 'disabled' | 'channel' | 'colorSpace' | 'format'>;
  /**
   * Props forwarded to the swatch picker element.
   */
  swatchPickerProps?: Omit<ColorSwatchPickerProps, 'modelValue' | 'defaultValue' | 'colors' | 'disabled'>;
  /**
   * Props forwarded to the swatch element.
   */
  swatchProps?: Omit<UiColorSwatchProps, 'class' | 'color' | 'size'>;
}

/**
 * Emits for the color picker component.
 */
export type ColorPickerEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when the color value changes.
   */
  'update:color': [value: NormalizedColor];
  /**
   * Emitted when the format value changes.
   */
  'update:format': [value: ColorFormat];
  /**
   * Emitted when the open state changes.
   */
  'update:open': [value: boolean];
  /**
   * Emitted when change occurs.
   */
  change: [value: string];
};
