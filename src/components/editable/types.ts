import type {
  EditableAreaProps,
  EditableCancelTriggerProps,
  EditableEditTriggerProps,
  EditableInputProps,
  EditablePreviewProps,
  EditableRootEmits,
  EditableRootProps,
  EditableUi,
  EditableUiSlot,
  EditableSubmitTriggerProps
} from '@soybeanjs/headless/editable';
import type { ClassValue, UiClass } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Additional UI slots for the editable component.
 */
export type EditableExtraUiSlot = 'controls';

/**
 * Extended UI class overrides for the Editable component.
 */
export type EditableExtendedUi = UiClass<EditableUiSlot | EditableExtraUiSlot>;

/**
 * Properties for the Editable component.
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
   * Properties forwarded to the area element.
   */
  areaProps?: EditableAreaProps;
  /**
   * Properties forwarded to the preview element.
   */
  previewProps?: EditablePreviewProps;
  /**
   * Properties forwarded to the input element.
   */
  inputProps?: EditableInputProps;
  /**
   * Properties forwarded to the edit trigger element.
   */
  editTriggerProps?: EditableEditTriggerProps;
  /**
   * Properties forwarded to the submit trigger element.
   */
  submitTriggerProps?: EditableSubmitTriggerProps;
  /**
   * Properties forwarded to the cancel trigger element.
   */
  cancelTriggerProps?: EditableCancelTriggerProps;
}

/**
 * Events for the Editable component.
 */
export type EditableEmits = EditableRootEmits;

export type { EditableUi };
