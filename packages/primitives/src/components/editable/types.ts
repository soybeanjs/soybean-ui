import type { Ref } from 'vue';
import type {
  ActivationMode,
  ClassValueProp,
  Direction,
  FormFieldProps,
  PrimitiveProps,
  SubmitMode
} from '../../types';

// EditableRoot types
export interface EditableRootProps extends ClassValueProp, FormFieldProps {
  /** The default value of the editable field */
  defaultValue?: string;
  /** The value of the editable field */
  modelValue?: string | null;
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
export type EditableRootPropsWithPrimitive = EditableRootProps & PrimitiveProps;

export interface EditableRootEmits {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [value: string];
  /** Event handler called when a value is submitted */
  submit: [value: string | null | undefined];
  /** Event handler called when the editable field changes state */
  'update:state': [state: 'edit' | 'submit' | 'cancel'];
}

export interface EditableRootContext {
  id: Ref<string | undefined>;
  name: Ref<string | undefined>;
  maxLength: Ref<number | undefined>;
  disabled: Ref<boolean>;
  modelValue: Ref<string | null | undefined>;
  inputValue: Ref<string | null | undefined>;
  placeholder: Ref<{ edit: string; preview: string }>;
  isEditing: Ref<boolean>;
  submitMode: Ref<SubmitMode>;
  activationMode: Ref<ActivationMode>;
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
export interface EditableAreaProps extends ClassValueProp {}
export type EditableAreaPropsWithPrimitive = EditableAreaProps & PrimitiveProps;

// EditableInput types
export interface EditableInputProps extends ClassValueProp {}
export type EditableInputPropsWithPrimitive = EditableInputProps & PrimitiveProps;

// EditablePreview types
export interface EditablePreviewProps extends ClassValueProp {}
export type EditablePreviewPropsWithPrimitive = EditablePreviewProps & PrimitiveProps;

// EditableSubmitTrigger types
export interface EditableSubmitTriggerProps extends ClassValueProp {}
export type EditableSubmitTriggerPropsWithPrimitive = EditableSubmitTriggerProps & PrimitiveProps;

// EditableCancelTrigger types
export interface EditableCancelTriggerProps extends ClassValueProp {}
export type EditableCancelTriggerPropsWithPrimitive = EditableCancelTriggerProps & PrimitiveProps;

// EditableEditTrigger types
export interface EditableEditTriggerProps extends ClassValueProp {}
export type EditableEditTriggerPropsWithPrimitive = EditableEditTriggerProps & PrimitiveProps;
