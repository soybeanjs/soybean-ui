import type { ComputedRef, CSSProperties, HTMLAttributes, ShallowRef } from 'vue';
import type {
  ColorChannel,
  ColorChannelRange,
  ColorFormat,
  ColorSpace,
  ColorValue,
  NormalizedColor
} from '../../shared';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type ColorAreaAxisChannel = Extract<ColorChannel, 'hue' | 'saturation' | 'lightness' | 'brightness' | 'chroma'>;

export interface ColorAreaRootProps extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  modelValue?: string | ColorValue;
  defaultValue?: string | ColorValue;
  colorSpace?: ColorSpace;
  format?: ColorFormat;
  xChannel?: ColorAreaAxisChannel;
  yChannel?: ColorAreaAxisChannel;
  disabled?: boolean;
  xName?: string;
  yName?: string;
}

export type ColorAreaRootEmits = {
  'update:modelValue': [value: string];
  'update:color': [value: NormalizedColor];
  change: [value: string];
  changeEnd: [value: string];
};

export interface ColorAreaAreaProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ColorAreaThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ColorAreaRootContext extends PropsToContext<
  ColorAreaRootProps,
  'colorSpace' | 'format' | 'xChannel' | 'yChannel' | 'disabled'
> {
  color: ComputedRef<NormalizedColor>;
  xValue: ShallowRef<number>;
  yValue: ShallowRef<number>;
  xRange: ComputedRef<ColorChannelRange>;
  yRange: ComputedRef<ColorChannelRange>;
  areaStyle: ComputedRef<CSSProperties>;
  thumbElement: ShallowRef<HTMLElement | undefined>;
  setThumbElement: (element: HTMLElement) => void;
  updateValues: (x: number, y: number) => void;
  commitValues: () => void;
}

export type ColorAreaUiSlot = 'root' | 'area' | 'thumb';

export type ColorAreaUi = UiClass<ColorAreaUiSlot>;
