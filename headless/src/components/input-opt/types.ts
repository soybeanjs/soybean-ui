import type { ComputedRef, HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { PropsToContext, UiClass } from '../../types';

export type InputOptTextAlign = 'left' | 'center' | 'right';

export interface InputOptBaseProps {
  /** Id of the input element. */
  id?: string;
  /** When `true`, the input is auto-focused. */
  autofocus?: boolean;
  /** The autocomplete attribute of the input. */
  autocomplete?: InputHTMLAttributes['autocomplete'];
  /** When `true`, prevents the user from interacting with the input. */
  disabled?: boolean;
  /** The virtual keyboard configuration used on mobile devices. */
  inputmode?: InputHTMLAttributes['inputmode'];
  /** The number of visible otp slots. */
  maxlength: number;
  /** The form field name. */
  name?: string;
  /** Optional validation pattern applied to the full otp value. */
  pattern?: string | RegExp;
  /** Placeholder characters displayed per slot. */
  placeholder?: string;
  /** Optional transform applied before pasted content is inserted. */
  pasteTransformer?: (value: string | undefined) => string;
  /** When `true`, the input is read-only. */
  readonly?: boolean;
  /** When `true`, the input is required. */
  required?: boolean;
  /** Text alignment used by the hidden input layer. */
  textAlign?: InputOptTextAlign;
}

export interface InputOptRootProps extends InputOptBaseProps, /** @vue-ignore */ HTMLAttributes {
  /** The default value of the input. */
  defaultValue?: string;
  /** The controlled value of the input. */
  modelValue?: string;
}

export type InputOptRootEmits = {
  'update:modelValue': [value: string];
  complete: [value: string];
};

export interface InputOptSlotData {
  char: string | null;
  placeholderChar: string | null;
  hasFakeCaret: boolean;
  isActive: boolean;
}

export interface InputOptRootContext extends PropsToContext<Pick<InputOptBaseProps, 'disabled' | 'maxlength' | 'placeholder'>> {
  modelValue: ShallowRef<string | undefined>;
  isFocused: ShallowRef<boolean>;
  isHovering: ShallowRef<boolean>;
  slots: ComputedRef<InputOptSlotData[]>;
}

export type InputOptUiSlot = 'root' | 'input';

export type InputOptUi = UiClass<InputOptUiSlot>;
