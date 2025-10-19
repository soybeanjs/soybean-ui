import type { ComputedRef, HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { ClassValue, FormFieldCommonProps, PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { InputBaseProps } from '../input/types';

export interface NumberInputRootProps extends InputBaseProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
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

export type NumberInputRootEmits = {
  'update:modelValue': [val: number];
};

export interface NumberInputControlProps extends /** @vue-ignore */ InputHTMLAttributes {}

export interface NumberInputIncrementProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

export interface NumberInputDecrementProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

export interface NumberInputRootContextParams
  extends PropsToContext<
    NumberInputRootProps,
    | 'id'
    | 'autofocus'
    | 'disabled'
    | 'maxlength'
    | 'minlength'
    | 'pattern'
    | 'placeholder'
    | 'readonly'
    | 'locale'
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

export type NumberInputThemeSlot = 'root' | 'increment' | 'decrement' | 'control';

export interface NumberInputThemeContextParams {
  ui: ComputedRef<Record<NumberInputThemeSlot, ClassValue>>;
}
