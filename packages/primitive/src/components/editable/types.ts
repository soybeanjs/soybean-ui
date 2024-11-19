import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { ActivationMode, Direction, FormFieldProps, SubmitMode } from '../../types';

// EditableRoot types
export interface EditableRootProps {
  /** The default value of the editable field */
  defaultValue?: string;
  /** The value of the editable field */
  modelValue?: string;
  /** The placeholder for the editable field */
  placeholder?: string | { edit: string; preview: string };
  /**
   * The reading direction of the calendar when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** Whether the editable field is disabled */
  disabled?: boolean;
  /** Whether the editable field is read-only */
  readonly?: boolean;
  /** The activation event of the editable field */
  activationMode?: ActivationMode;
  /** Whether to select the text in the input when it is focused. */
  selectOnFocus?: boolean;
  /** The submit event of the editable field */
  submitMode?: SubmitMode;
  /** Whether to start with the edit mode active */
  startWithEditMode?: boolean;
  /** The maximum number of characters allowed */
  maxLength?: number;
  /** Whether the editable field should auto resize */
  autoResize?: boolean;
  /** The id of the field */
  id?: string;
}

export type EditableRootPropsWithPrimitive = EditableRootProps & PrimitiveProps & FormFieldProps;

export interface EditableRootEmits {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [value: string];
  /** Event handler called when a value is submitted */
  submit: [value: string | undefined];
  /** Event handler called when the editable field changes state */
  'update:state': [state: 'edit' | 'submit' | 'cancel'];
}

export interface EditableRootContext {
  id: Ref<string | undefined>;
  name: Ref<string | undefined>;
  maxLength: Ref<number | undefined>;
  disabled: Ref<boolean>;
  modelValue: Ref<string | undefined>;
  placeholder: Ref<{ edit: string; preview: string }>;
  isEditing: Ref<boolean>;
  submitMode: Ref<'blur' | 'enter' | 'none' | 'both'>;
  activationMode: Ref<'focus' | 'dblclick' | 'none'>;
  selectOnFocus: Ref<boolean>;
  edit: () => void;
  cancel: () => void;
  submit: () => void;
  inputRef: Ref<HTMLInputElement | undefined>;
  startWithEditMode: Ref<boolean>;
  isEmpty: Ref<boolean>;
  readonly: Ref<boolean>;
  autoResize: Ref<boolean>;
}

// EditableArea types
export interface EditableAreaProps {}
export type EditableAreaPropsWithPrimitive = EditableAreaProps & PrimitiveProps;

// EditableInput types
export interface EditableInputProps {}
export type EditableInputPropsWithPrimitive = EditableInputProps & PrimitiveProps;

// EditablePreview types
export interface EditablePreviewProps {}
export type EditablePreviewPropsWithPrimitive = EditablePreviewProps & PrimitiveProps;

// EditableSubmitTrigger types
export interface EditableSubmitTriggerProps {}
export type EditableSubmitTriggerPropsWithPrimitive = EditableSubmitTriggerProps & PrimitiveProps;

// EditableCancelTrigger types
export interface EditableCancelTriggerProps {}
export type EditableCancelTriggerPropsWithPrimitive = EditableCancelTriggerProps & PrimitiveProps;

// EditableEditTrigger types
export interface EditableEditTriggerProps {}
export type EditableEditTriggerPropsWithPrimitive = EditableEditTriggerProps & PrimitiveProps;
