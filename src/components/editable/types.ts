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

/**
 * Additional UI slots for the editable component.
 */
export type EditableExtraUiSlot = 'controls';

/**
 * Extended UI class overrides for the editable component.
 */
export type EditableExtendedUi = UiClass<EditableUiSlot | EditableExtraUiSlot>;

/**
 * Props for the editable component.
 */
export interface EditableProps extends EditableRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<EditableExtendedUi>;
  /**
   * Props forwarded to the area element.
   */
  areaProps?: EditableAreaProps;
  /**
   * Props forwarded to the preview element.
   */
  previewProps?: EditablePreviewProps;
  /**
   * Props forwarded to the input element.
   */
  inputProps?: EditableInputProps;
  /**
   * Props forwarded to the edit trigger element.
   */
  editTriggerProps?: EditableEditTriggerProps;
  /**
   * Props forwarded to the submit trigger element.
   */
  submitTriggerProps?: EditableSubmitTriggerProps;
  /**
   * Props forwarded to the cancel trigger element.
   */
  cancelTriggerProps?: EditableCancelTriggerProps;
}

/**
 * Emits for the editable component.
 */
export type EditableEmits = EditableRootEmits;

export type { EditableUi };
