import type { ComputedRef, HTMLAttributes, ShallowRef, TextareaHTMLAttributes } from 'vue';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';

/**
 * Type information for the textarea autosize options component.
 */
export interface TextareaAutosizeOptions {
  /** The minimum number of rows to display */
  minRows?: number;
  /** The maximum number of rows to display */
  maxRows?: number;
}

/**
 * Props for the textarea base component.
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
 * Props for the textarea root component.
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
 * Emits for the textarea root component.
 */
export type TextareaRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
};

/**
 * Props for the textarea control component.
 */
export interface TextareaControlProps extends /** @vue-ignore */ TextareaHTMLAttributes {}

/**
 * Props for the textarea counter component.
 */
export interface TextareaCounterProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the textarea root component.
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
 * Available UI slots for the textarea component.
 */
export type TextareaUiSlot = 'root' | 'control' | 'counter';

/**
 * UI class overrides for the textarea component.
 */
export type TextareaUi = UiClass<TextareaUiSlot>;
