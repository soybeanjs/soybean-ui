import type { ComputedRef, Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { TeleportProps } from '../teleport';
import type { DismissableLayerEmits, DismissableLayerProps } from '../dismissable-layer';
import type { DisclosureState } from '../../types';

export interface DialogRootProps {
  /** The controlled open state of the dialog. Can be bound as `v-model:open`. */
  open?: boolean;
  /** The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * The modality of the dialog When set to `true`, <br> interaction with outside elements will be disabled and only
   * dialog content will be visible to screen readers.
   */
  modal?: boolean;
}

export type DialogRootEmits = {
  /** Event handler called when the open state of the dialog changes. */
  'update:open': [value: boolean];
};

export interface DialogRootContextParams {
  open: Ref<boolean>;
  modal: Ref<boolean>;
  triggerElement: Ref<HTMLElement | undefined>;
  contentElement: Ref<HTMLElement | undefined>;
}

export interface DialogRootContext extends DialogRootContextParams {
  dataState: ComputedRef<DisclosureState>;
  openModal: () => void;
  onOpenChange: (value: boolean) => void;
  onOpenToggle: () => void;
  titleId: Ref<string>;
  initTitleId: () => void;
  descriptionId: Ref<string>;
  initDescriptionId: () => void;
  contentId: Ref<string>;
  initContentId: () => void;
}

export interface DialogTriggerProps {}

export type DialogTriggerPropsWithPrimitive = DialogTriggerProps & PrimitiveProps;

export interface DialogOverlayImplProps {}

export type DialogOverlayImplPropsWithPrimitive = DialogOverlayImplProps & PrimitiveProps;

export interface DialogOverlayProps extends DialogOverlayImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

export type DialogOverlayPropsWithPrimitive = DialogOverlayProps & PrimitiveProps;

export interface DialogPortalProps extends TeleportProps {}

export interface DialogContentImplProps extends DismissableLayerProps {
  /**
   * Used to force mounting when more control is needed. Useful when controlling transition with Vue native transition
   * or other animation libraries.
   */
  forceMount?: boolean;
  /**
   * When `true`, focus cannot escape the `Content` via keyboard, pointer, or a programmatic focus.
   *
   * @defaultValue false
   */
  trapFocus?: boolean;
}

export type DialogContentImplPropsWithPrimitive = DialogContentImplProps & PrimitiveProps;

export type DialogContentImplEmits = DismissableLayerEmits & {
  /** Event handler called when auto-focusing on open. Can be prevented. */
  openAutoFocus: [event: Event];
  /** Event handler called when auto-focusing on close. Can be prevented. */
  closeAutoFocus: [event: Event];
};

export interface DialogContentProps extends DialogContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

export type DialogContentPropsWithPrimitive = DialogContentProps & PrimitiveProps;

export type DialogContentEmits = DialogContentImplEmits;

export interface DialogTitleProps {}

export type DialogTitlePropsWithPrimitive = DialogTitleProps & PrimitiveProps;

export interface DialogDescriptionProps {}

export type DialogDescriptionPropsWithPrimitive = DialogDescriptionProps & PrimitiveProps;

export interface DialogCloseProps {}

export type DialogClosePropsWithPrimitive = DialogCloseProps & PrimitiveProps;
