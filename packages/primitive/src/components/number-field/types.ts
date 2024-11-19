import type { HTMLAttributes, Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { FormFieldProps } from '../../types';

// Root
export interface NumberFieldRootProps {
  defaultValue?: number;
  modelValue?: number;
  /** The smallest value allowed for the input. */
  min?: number;
  /** The largest value allowed for the input. */
  max?: number;
  /** The amount that the input value changes with each increment or decrement "tick". */
  step?: number;
  /**
   * Formatting options for the value displayed in the number field. This also affects what characters are allowed to be
   * typed by the user.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** The locale to use for formatting dates */
  locale?: string;
  /** When `true`, prevents the user from interacting with the Number Field. */
  disabled?: boolean;
  /** Id of the element */
  id?: string;
}

export type NumberFieldRootPropsWithPrimitive = NumberFieldRootProps & PrimitiveProps & FormFieldProps;

export type NumberFieldRootEmits = {
  'update:modelValue': [val: number];
};

export interface NumberFieldRootContext {
  modelValue: Ref<number>;
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
  max: Ref<number | undefined>;
  min: Ref<number | undefined>;
  isDecreaseDisabled: Ref<boolean>;
  isIncreaseDisabled: Ref<boolean>;
  id: Ref<string | undefined>;
}

// Input
export interface NumberFieldInputProps {}

export type NumberFieldInputPropsWithPrimitive = NumberFieldInputProps & PrimitiveProps;

// Increment
export interface NumberFieldIncrementProps {
  disabled?: boolean;
}

export type NumberFieldIncrementPropsWithPrimitive = NumberFieldIncrementProps & PrimitiveProps;

// Decrement
export interface NumberFieldDecrementProps {
  disabled?: boolean;
}

export type NumberFieldDecrementPropsWithPrimitive = NumberFieldDecrementProps & PrimitiveProps;
