import type { HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { InputBaseProps } from '../input/types';

export interface InputNumberRootProps extends InputBaseProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The default value of the input */
  defaultValue?: number;
  /** The controlled value of the input */
  modelValue?: number | null;
  /** The smallest value allowed for the input. */
  min?: number;
  /** The largest value allowed for the input. */
  max?: number;
  /** The amount that the input value changes with each increment or decrement "tick". */
  step?: number;
  /** When `false`, prevents the value from snapping to the nearest increment of the step value */
  stepSnapping?: boolean;
  /** When `true`, the input will be focused when the value changes. */
  focusOnChange?: boolean;
  /**
   * Formatting options for the value displayed in the number field. This also affects what characters are allowed to be
   * typed by the user.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** The locale to use for formatting dates */
  locale?: string;
  /** When `true`, prevents the value from changing on wheel scroll. */
  disableWheelChange?: boolean;
  /** When `true`, inverts the direction of the wheel change. */
  invertWheelChange?: boolean;
}

export type InputNumberRootEmits = {
  'update:modelValue': [val: number];
};

export interface InputNumberControlProps extends /** @vue-ignore */ InputHTMLAttributes {}

export interface InputNumberIncrementProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

export interface InputNumberDecrementProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

export interface InputNumberRootContextParams extends PropsToContext<
  InputNumberRootProps,
  | 'id'
  | 'autofocus'
  | 'disabled'
  | 'maxlength'
  | 'minlength'
  | 'pattern'
  | 'placeholder'
  | 'readonly'
  | 'locale'
  | 'focusOnChange'
  | 'formatOptions'
  | 'max'
  | 'min'
  | 'step'
  | 'stepSnapping'
  | 'disableWheelChange'
  | 'invertWheelChange'
> {
  modelValue: ShallowRef<number | null | undefined>;
}

export type InputNumberUiSlot = 'root' | 'increment' | 'decrement' | 'control';

export type InputNumberUi = UiClass<InputNumberUiSlot>;
