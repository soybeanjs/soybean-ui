import type { HTMLAttributes, Ref } from 'vue';
import type { ClassValueProp, FormFieldProps, PrimitiveProps } from '../../types';

// Root
export interface NumberFieldRootProps extends ClassValueProp {
  defaultValue?: number;
  modelValue?: number | null;
  /** The smallest value allowed for the input. */
  min?: number;
  /** The largest value allowed for the input. */
  max?: number;
  /** The amount that the input value changes with each increment or decrement "tick". */
  step?: number;
  /** When `false`, prevents the value from snapping to the nearest increment of the step value */
  stepSnapping?: boolean;
  /**
   * Formatting options for the value displayed in the number field. This also affects what characters are allowed to be
   * typed by the user.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** The locale to use for formatting dates */
  locale?: string;
  /** When `true`, prevents the user from interacting with the Number Field. */
  disabled?: boolean;
  /** When `true`, prevents the value from changing on wheel scroll. */
  disableWheelChange?: boolean;
  /** When `true`, inverts the direction of the wheel change. */
  invertWheelChange?: boolean;
  /** Id of the element */
  id?: string;
}
export type NumberFieldRootPropsWithPrimitive = NumberFieldRootProps & PrimitiveProps & FormFieldProps;

export type NumberFieldRootEmits = {
  'update:modelValue': [val: number];
};

export interface NumberFieldRootContext {
  modelValue: Ref<number | undefined>;
  handleIncrease: (multiplier?: number) => void;
  handleDecrease: (multiplier?: number) => void;
  handleMinMaxValue: (type: 'min' | 'max') => void;
  inputEl: Ref<HTMLInputElement | undefined>;
  onInputElement: (el: HTMLInputElement) => void;
  inputMode: Ref<HTMLAttributes['inputmode']>;
  textValue: Ref<string>;
  validate: (val: string) => boolean;
  applyInputValue: (val: string) => void;
  disabled: Ref<boolean>;
  disableWheelChange: Ref<boolean>;
  invertWheelChange: Ref<boolean>;
  max: Ref<number | undefined>;
  min: Ref<number | undefined>;
  isDecreaseDisabled: Ref<boolean>;
  isIncreaseDisabled: Ref<boolean>;
  id: Ref<string | undefined>;
}

// Input
export interface NumberFieldInputProps extends ClassValueProp {}
export type NumberFieldInputPropsWithPrimitive = NumberFieldInputProps & PrimitiveProps;

// Increment
export interface NumberFieldIncrementProps extends ClassValueProp {
  disabled?: boolean;
}
export type NumberFieldIncrementPropsWithPrimitive = NumberFieldIncrementProps & PrimitiveProps;

// Decrement
export interface NumberFieldDecrementProps extends ClassValueProp {
  disabled?: boolean;
}
export type NumberFieldDecrementPropsWithPrimitive = NumberFieldDecrementProps & PrimitiveProps;
