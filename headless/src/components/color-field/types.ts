import type { HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { ColorChannel, ColorFormat, ColorSpace, ColorValue, NormalizedColor } from '../../shared';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface ColorFieldRootProps extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  modelValue?: string | ColorValue;
  defaultValue?: string | ColorValue;
  colorSpace?: ColorSpace;
  channel?: ColorChannel;
  format?: ColorFormat;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  disableWheelChange?: boolean;
  step?: number;
}

export type ColorFieldRootEmits = {
  'update:modelValue': [value: string];
  'update:color': [value: NormalizedColor];
};

export interface ColorFieldInputProps extends /** @vue-ignore */ InputHTMLAttributes {}

export interface ColorFieldRootContext extends PropsToContext<
  ColorFieldRootProps,
  'channel' | 'colorSpace' | 'format' | 'disabled' | 'readonly' | 'disableWheelChange' | 'placeholder'
> {
  color: ShallowRef<NormalizedColor>;
  inputValue: ShallowRef<string>;
  updateValue: (value: string) => void;
  commit: () => void;
  increment: () => void;
  decrement: () => void;
  incrementPage: () => void;
  decrementPage: () => void;
  incrementToMax: () => void;
  decrementToMin: () => void;
  handleWheel: (event: WheelEvent) => void;
}

export type ColorFieldUiSlot = 'root' | 'input';

export type ColorFieldUi = UiClass<ColorFieldUiSlot>;
