import type {
  ClassValue,
  EditableAreaProps,
  EditableCancelTriggerProps,
  EditableEditTriggerProps,
  EditableInputProps,
  EditablePreviewProps,
  EditableRootEmits,
  EditableRootProps,
  EditableUi,
  EditableUiSlot,
  EditableSubmitTriggerProps,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type EditableExtraUiSlot = 'controls';

export type EditableExtendedUi = UiClass<EditableUiSlot | EditableExtraUiSlot>;

export interface EditableProps extends EditableRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<EditableExtendedUi>;
  areaProps?: EditableAreaProps;
  previewProps?: EditablePreviewProps;
  inputProps?: EditableInputProps;
  editTriggerProps?: EditableEditTriggerProps;
  submitTriggerProps?: EditableSubmitTriggerProps;
  cancelTriggerProps?: EditableCancelTriggerProps;
}

export type EditableEmits = EditableRootEmits;

export type { EditableUi };
