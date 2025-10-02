import type { ComputedRef, HTMLAttributes, InputHTMLAttributes, InputTypeHTMLAttribute, ShallowRef } from 'vue';
import type { ClassValue, FormFieldProps, PropsToContext } from '../../types';

export interface InputRootProps extends FormFieldProps, /** @vue-ignore */ HTMLAttributes {
  /** The default value of the input */
  defaultValue?: string;
  /** The controlled value of the input */
  modelValue?: string;
  /** Id of the input element */
  id?: string;
  /** The type of the input */
  type?: InputTypeHTMLAttribute | undefined;
  /** The placeholder of the input */
  placeholder?: string;
  /** When `true`, the input is auto-focused. */
  autoFocus?: boolean;
  /** When `true`, prevents the user from interacting with the input. */
  disabled?: boolean;
  /** When `true`, the input is read-only. */
  readonly?: boolean;
}

export interface InputControlProps extends /** @vue-ignore */ InputHTMLAttributes {}

export type InputRootEmits = {
  'update:modelValue': [value: string];
};

export interface InputRootContextParams
  extends PropsToContext<InputRootProps, 'id' | 'type' | 'placeholder' | 'autoFocus' | 'disabled' | 'readonly'> {
  modelValue: ShallowRef<string | undefined>;
}

export type InputThemeSlot = 'root' | 'control';

export interface InputThemeContextParams {
  ui: ComputedRef<Record<InputThemeSlot, ClassValue>>;
}
