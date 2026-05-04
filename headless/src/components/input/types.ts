import type { HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';

/**
 * Properties for the input base component.
 */
export interface InputBaseProps {
  /** Id of the input element */
  id?: string;
  /** When `true`, the input is auto-focused. */
  autofocus?: boolean;
  /** When `true`, prevents the user from interacting with the input. */
  disabled?: boolean;
  /** The maximum number of characters allowed in the input */
  maxlength?: number;
  /** The minimum number of characters allowed in the input */
  minlength?: number;
  /** The pattern attribute of the input */
  pattern?: string;
  /** The placeholder of the input */
  placeholder?: string;
  /** When `true`, the input is read-only. */
  readonly?: boolean;
}

/**
 * Properties for the input root component.
 */
export interface InputRootProps extends InputBaseProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The default value of the input */
  defaultValue?: string;
  /** The controlled value of the input */
  modelValue?: string;
}

/**
 * Events for the input root component.
 */
export type InputRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
};

/**
 * Properties for the input control component.
 */
export interface InputControlProps extends /** @vue-ignore */ InputHTMLAttributes {}

/**
 * Context for the input root component.
 */
export interface InputRootContext extends PropsToContext<InputBaseProps & FormFieldCommonProps> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string | undefined>;
}

/**
 * Available UI slots for the input component.
 */
export type InputUiSlot = 'root' | 'control';

/**
 * UI class overrides for the input component.
 */
export type InputUi = UiClass<InputUiSlot>;
