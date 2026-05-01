import type { HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { InputBaseProps } from '../input/types';

/**
 * Props for the input number root component.
 */
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

/**
 * Emits for the input number root component.
 */
export type InputNumberRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [val: number];
};

/**
 * Props for the input number control component.
 */
export interface InputNumberControlProps extends /** @vue-ignore */ InputHTMLAttributes {}

/**
 * Props for the input number increment component.
 */
export interface InputNumberIncrementProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Props for the input number decrement component.
 */
export interface InputNumberDecrementProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Parameters used to create the input number root context.
 */
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
  /**
   * Current model value.
   */
  modelValue: ShallowRef<number | null | undefined>;
}

/**
 * Available UI slots for the input number component.
 */
export type InputNumberUiSlot = 'root' | 'increment' | 'decrement' | 'control';

/**
 * UI class overrides for the input number component.
 */
export type InputNumberUi = UiClass<InputNumberUiSlot>;
