import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ColorFormat, ColorValue, NormalizedColor } from '../../shared';
import type { FormFieldCommonProps } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the color picker root component.
 */
export interface ColorPickerRootProps extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
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
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Events for the color picker root component.
 */
export type ColorPickerRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when the color value changes.
   */
  'update:color': [value: NormalizedColor];
  /**
   * Emitted when change occurs.
   */
  change: [value: string];
};

/**
 * Slot properties for the color picker root component.
 */
export interface ColorPickerRootSlotProps {
  /**
   * Theme color of the component.
   */
  color: ComputedRef<ColorValue>;
  /**
   * Formatted value exposed in the slot scope.
   */
  formattedValue: ComputedRef<string>;
  /**
   * Set color exposed in the slot scope.
   */
  setColor: (color: ColorValue) => void;
}
