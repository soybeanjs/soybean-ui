import type { HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';

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

export interface InputRootProps extends InputBaseProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The default value of the input */
  defaultValue?: string;
  /** The controlled value of the input */
  modelValue?: string;
}

export type InputRootEmits = {
  'update:modelValue': [value: string];
};

export interface InputControlProps extends /** @vue-ignore */ InputHTMLAttributes {}

export interface InputRootContextParams extends PropsToContext<InputBaseProps> {
  modelValue: ShallowRef<string | undefined>;
}

export type InputUiSlot = 'root' | 'control';

export type InputUi = UiClass<InputUiSlot>;
