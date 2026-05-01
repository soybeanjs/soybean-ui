import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass, VNodeRef } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type EditableActivationMode = 'focus' | 'dblclick' | 'none';

export type EditableSubmitMode = 'blur' | 'enter' | 'none' | 'both';

export type EditableEventState = 'edit' | 'submit' | 'cancel';

export type EditableViewState = 'preview' | 'edit';

export interface EditablePlaceholder {
  edit?: string;
  preview?: string;
}

export interface EditableRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSubmit' | 'placeholder'> {
  /** The default value of the editable field. */
  defaultValue?: string;
  /** The controlled value of the editable field. */
  modelValue?: string;
  /** The placeholder for the editable field. */
  placeholder?: string | EditablePlaceholder;
  /** The reading direction of the editable field when applicable. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with the editable field. */
  disabled?: boolean;
  /** When `true`, prevents the user from editing the value. */
  readonly?: boolean;
  /** The activation event of the editable field. */
  activationMode?: EditableActivationMode;
  /** Whether to select the text in the input when it is focused. */
  selectOnFocus?: boolean;
  /** The submit event of the editable field. */
  submitMode?: EditableSubmitMode;
  /** Whether to start with the edit mode active. */
  startWithEditMode?: boolean;
  /** The maximum number of characters allowed. */
  maxLength?: number;
  /** Whether the editable field should auto resize. */
  autoResize?: boolean;
  /** The id of the field. */
  id?: string;
}

export type EditableRootEmits = {
  /** Event handler called whenever the model value changes. */
  'update:modelValue': [value: string];
  /** Event handler called when a value is submitted. */
  submit: [value: string];
  /** Event handler called when the editable field changes state. */
  'update:state': [state: EditableEventState];
};

export interface EditableAreaProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface EditablePreviewProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface EditableInputProps extends PrimitiveProps, /** @vue-ignore */ Omit<InputHTMLAttributes, 'id'> {
  id?: string;
}

export interface EditableEditTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface EditableSubmitTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface EditableCancelTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface EditableRootContextParams extends PropsToContext<
  EditableRootProps,
  | 'id'
  | 'name'
  | 'maxLength'
  | 'disabled'
  | 'readonly'
  | 'activationMode'
  | 'submitMode'
  | 'selectOnFocus'
  | 'startWithEditMode'
  | 'dir'
  | 'required'
  | 'autoResize'
> {
  modelValue: ShallowRef<string | undefined>;
  inputValue: ShallowRef<string | undefined>;
  placeholder: ComputedRef<EditablePlaceholder>;
  isEditing: ShallowRef<boolean>;
  isEmpty: ComputedRef<boolean>;
  edit: () => void;
  cancel: () => void;
  submit: () => void;
}

export interface EditableRootContext extends Omit<EditableRootContextParams, 'dir'> {
  dir: ComputedRef<Direction>;
  inputElement: ShallowRef<HTMLInputElement | undefined>;
  setInputElement: (nodeRef: VNodeRef) => void;
  dataDisabled: ComputedRef<string | undefined>;
  dataReadonly: ComputedRef<string | undefined>;
  dataState: ComputedRef<EditableViewState>;
}

export type EditableUiSlot = 'root' | 'area' | 'preview' | 'input' | 'editTrigger' | 'submitTrigger' | 'cancelTrigger';

export type EditableUi = UiClass<EditableUiSlot>;

export interface EditableCompactProps extends EditableRootProps {
  areaProps?: EditableAreaProps;
  previewProps?: EditablePreviewProps;
  inputProps?: EditableInputProps;
  editTriggerProps?: EditableEditTriggerProps;
  submitTriggerProps?: EditableSubmitTriggerProps;
  cancelTriggerProps?: EditableCancelTriggerProps;
}

export type EditableCompactEmits = EditableRootEmits;

export interface EditableCompactSlots {
  default?: (props: { state: EditableViewState; isEmpty: boolean; isEditing: boolean }) => any;
  preview?: (props: { state: EditableViewState; isEmpty: boolean; isEditing: boolean }) => any;
  input?: (props: { state: EditableViewState; isEmpty: boolean; isEditing: boolean }) => any;
  'edit-trigger'?: (props: { state: EditableViewState; isEmpty: boolean; isEditing: boolean }) => any;
  'submit-trigger'?: (props: { state: EditableViewState; isEmpty: boolean; isEditing: boolean }) => any;
  'cancel-trigger'?: (props: { state: EditableViewState; isEmpty: boolean; isEditing: boolean }) => any;
}
