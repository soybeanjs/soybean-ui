import type { Ref } from 'vue';
import type { ClassValueProp, ForceMountProps, PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface DialogRootProps {
  /**
   * The controlled open state of the dialog. Can be bound with `v-model:open`.
   *
   * @defaultValue undefined
   */
  open?: boolean;
  /**
   * The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.
   *
   * @defaultValue false
   */
  defaultOpen?: boolean;
  /**
   * The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog
   * content will be visible to screen readers.
   *
   * @defaultValue true
   */
  modal?: boolean;
}

export type DialogRootEmits = {
  /** Event handler called when the open state of the dialog changes. */
  'update:open': [value: boolean];
};

export interface DialogTriggerProps extends ClassValueProp, PrimitiveProps {}

export interface DialogOverlayProps extends ClassValueProp, ForceMountProps {}

export interface DialogContentProps extends PrimitiveProps, ForceMountProps {
  /**
   * When `true`, focus cannot escape the Content via keyboard, pointer, or a programmatic focus.
   *
   * @defaultValue false
   */
  trapFocus?: boolean;
}

export type DialogContentEmits = {
  /** Event handler called when the escape key is down. */
  escapeKeyDown: [event: KeyboardEvent];

  /** Event handler called when a pointer down event occurs outside the dialog. */
  pointerDownOutside: [event: PointerEvent];

  /** Event handler called when focus moves outside the dialog. */
  focusOutside: [event: FocusEvent];

  /** Event handler called when an interaction occurs outside the dialog. */
  interactOutside: [event: PointerEvent | FocusEvent];

  /** Event handler called when the dialog content is opened/closed. */
  openAutoFocus: [event: Event];

  /** Event handler called when the dialog content is opened/closed. */
  closeAutoFocus: [event: Event];
};

export interface DialogTitleProps extends ClassValueProp {}

export interface DialogDescriptionProps extends ClassValueProp {}

export interface DialogCloseProps extends ClassValueProp, PrimitiveProps {}

export interface DialogRootContextParams extends PropsToContext<DialogRootProps, 'modal'> {
  open: Ref<boolean>;
}
