import type { ComputedRef, HTMLAttributes, ShallowRef, TextareaHTMLAttributes } from 'vue';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';

/**
 * Type information for TextareaAutosizeOptions.
 */
export interface TextareaAutosizeOptions {
  /** The minimum number of rows to display */
  minRows?: number;
  /** The maximum number of rows to display */
  maxRows?: number;
}

/**
 * Properties for the TextareaBase component.
 */
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

/**
 * Properties for the TextareaRoot component.
 */
export interface TextareaRootProps extends TextareaBaseProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The default value of the textarea */
  defaultValue?: string;
  /** The controlled value of the textarea */
  modelValue?: string;
  /** When `true` or an options object, enables auto-resizing based on content */
  autosize?: boolean | TextareaAutosizeOptions;
}

/**
 * Events for the TextareaRoot component.
 */
export type TextareaRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
};

/**
 * Properties for the TextareaControl component.
 */
export interface TextareaControlProps extends /** @vue-ignore */ TextareaHTMLAttributes {}

/**
 * Properties for the TextareaCounter component.
 */
export interface TextareaCounterProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the TextareaRoot component.
 */
export interface TextareaRootContext extends PropsToContext<TextareaBaseProps> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string | undefined>;
  /**
   * Count used by the component context.
   */
  count: ComputedRef<number>;
  /**
   * Autosize options used by the component context.
   */
  autosizeOptions: ComputedRef<TextareaAutosizeOptions | undefined>;
}

/**
 * Available UI slots for the Textarea component.
 */
export type TextareaUiSlot = 'root' | 'control' | 'counter';

/**
 * UI class overrides for the Textarea component.
 */
export type TextareaUi = UiClass<TextareaUiSlot>;
