import type { ComputedRef, HTMLAttributes, ShallowRef, TextareaHTMLAttributes } from 'vue';
import type { ClassValue, FormFieldCommonProps, PropsToContext } from '../../types';

export interface TextareaAutosizeOptions {
  /** The minimum number of rows to display */
  minRows?: number;
  /** The maximum number of rows to display */
  maxRows?: number;
}

export interface TextareaBaseProps {
  /** Id of the textarea element */
  id?: string;
  /** When `true`, the textarea is auto-focused. */
  autofocus?: boolean;
  /** When `true`, prevents the user from interacting with the textarea. */
  disabled?: boolean;
  /** The maximum number of characters allowed in the textarea */
  maxlength?: number;
  /** The minimum number of characters allowed in the textarea */
  minlength?: number;
  /** The placeholder of the textarea */
  placeholder?: string;
  /** When `true`, the textarea is read-only. */
  readonly?: boolean;
}

export interface TextareaRootProps extends TextareaBaseProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The default value of the textarea */
  defaultValue?: string;
  /** The controlled value of the textarea */
  modelValue?: string;
  /** When `true` or an options object, enables auto-resizing based on content */
  autosize?: boolean | TextareaAutosizeOptions;
}

export type TextareaRootEmits = {
  'update:modelValue': [value: string];
};

export interface TextareaControlProps extends /** @vue-ignore */ TextareaHTMLAttributes {}

export interface TextareaCounterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TextareaRootContextParams extends PropsToContext<TextareaBaseProps> {
  modelValue: ShallowRef<string | undefined>;
  count: ComputedRef<number>;
  autosizeOptions: ComputedRef<TextareaAutosizeOptions | undefined>;
}

export type TextareaThemeSlot = 'root' | 'control' | 'counter';

export interface TextareaThemeContextParams {
  ui: ComputedRef<Record<TextareaThemeSlot, ClassValue>>;
}
