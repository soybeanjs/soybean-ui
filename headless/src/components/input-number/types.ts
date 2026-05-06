import type { InputHTMLAttributes, ShallowRef } from 'vue';
import type { BaseProps, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveWithBaseProps } from '../primitive/types';
import type { InputBaseProps } from '../input/types';

/**
 * Properties for the InputNumberRoot component.
 */
export interface InputNumberRootProps extends InputBaseProps, FormFieldCommonProps, BaseProps {
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
 * Events for the InputNumberRoot component.
 */
export type InputNumberRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [val: number | null];
};

/**
 * Properties for the InputNumberControl component.
 */
export interface InputNumberControlProps extends BaseProps<InputHTMLAttributes> {}

/**
 * Properties for the InputNumberIncrement component.
 */
export interface InputNumberIncrementProps extends PrimitiveWithBaseProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Properties for the InputNumberDecrement component.
 */
export interface InputNumberDecrementProps extends PrimitiveWithBaseProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Parameters used to create the InputNumberRoot context.
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
 * Available UI slots for the InputNumber component.
 */
export type InputNumberUiSlot = 'root' | 'increment' | 'decrement' | 'control';

/**
 * UI class overrides for the InputNumber component.
 */
export type InputNumberUi = UiClass<InputNumberUiSlot>;
