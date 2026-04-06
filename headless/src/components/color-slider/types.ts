import type { ComputedRef, HTMLAttributes } from 'vue';
import type {
  ColorChannel,
  ColorChannelRange,
  ColorFormat,
  ColorSpace,
  ColorValue,
  NormalizedColor
} from '../../shared';
import type { DataOrientation, Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface ColorSliderRootProps extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  modelValue?: string | ColorValue;
  defaultValue?: string | ColorValue;
  colorSpace?: ColorSpace;
  channel: ColorChannel;
  format?: ColorFormat;
  orientation?: DataOrientation;
  dir?: Direction;
  inverted?: boolean;
  disabled?: boolean;
  step?: number;
}

export type ColorSliderRootEmits = {
  'update:modelValue': [value: string];
  'update:color': [value: NormalizedColor];
  change: [value: string];
  changeEnd: [value: string];
};

export interface ColorSliderTrackProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ColorSliderThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ColorSliderRootContext extends PropsToContext<
  ColorSliderRootProps,
  'channel' | 'colorSpace' | 'format' | 'orientation' | 'disabled' | 'inverted'
> {
  color: ComputedRef<NormalizedColor>;
  channelValue: ComputedRef<number>;
  range: ComputedRef<ColorChannelRange>;
}

export type ColorSliderUiSlot = 'root' | 'track' | 'thumb';

export type ColorSliderUi = UiClass<ColorSliderUiSlot>;
