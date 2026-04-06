import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ColorFormat, ColorValue, NormalizedColor } from '../../shared';
import type { FormFieldCommonProps } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface ColorPickerRootProps extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  modelValue?: string | ColorValue;
  defaultValue?: string | ColorValue;
  format?: ColorFormat;
  disabled?: boolean;
}

export type ColorPickerRootEmits = {
  'update:modelValue': [value: string];
  'update:color': [value: NormalizedColor];
  change: [value: string];
};

export interface ColorPickerRootSlotProps {
  color: ComputedRef<ColorValue>;
  formattedValue: ComputedRef<string>;
  setColor: (color: ColorValue) => void;
}
