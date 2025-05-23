import type { Ref } from 'vue';
import type {
  ClassValueProp,
  DismissableLayerEmits,
  DismissableLayerProps,
  ForceMountProps,
  PropsToContext,
  TrapFocusProps
} from '../../types';
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

export interface DialogContentImplProps
  extends ClassValueProp,
    PrimitiveProps,
    ForceMountProps,
    TrapFocusProps,
    DismissableLayerProps {}
export type DialogContentImplEmits = DismissableLayerEmits & {
  /** Event handler called when auto-focusing on open. Can be prevented. */
  openAutoFocus: [event: Event];
  /** Event handler called when auto-focusing on close. Can be prevented. */
  closeAutoFocus: [event: Event];
};

export interface DialogContentProps extends Omit<DialogContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> {}
export type DialogContentEmits = DialogContentImplEmits;

export interface DialogTitleProps extends ClassValueProp {}

export interface DialogDescriptionProps extends ClassValueProp {}

export interface DialogCloseProps extends ClassValueProp, PrimitiveProps {}

export interface DialogRootContextParams extends PropsToContext<DialogRootProps, 'modal'> {
  open: Ref<boolean | undefined>;
}
