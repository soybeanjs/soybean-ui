import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type {
  DialogCloseProps,
  DialogContentEmits,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps
} from '../dialog';

// AlertDialogRoot
export interface AlertDialogRootProps extends Omit<DialogRootProps, 'modal'> {}
export type AlertDialogRootEmits = DialogRootEmits;

// AlertDialogTrigger
export interface AlertDialogTriggerProps extends DialogTriggerProps {}
export type AlertDialogTriggerPropsWithPrimitive = AlertDialogTriggerProps & PrimitiveProps;

// AlertDialogPortal
export interface AlertDialogPortalProps extends DialogPortalProps {}

// AlertDialogOverlay
export interface AlertDialogOverlayProps extends DialogOverlayProps {}
export type AlertDialogOverlayPropsWithPrimitive = AlertDialogOverlayProps & PrimitiveProps;

// AlertDialogContent
export interface AlertDialogContentProps extends DialogContentProps {}
export type AlertDialogContentPropsWithPrimitive = AlertDialogContentProps & PrimitiveProps;
export type AlertDialogContentEmits = DialogContentEmits;

// AlertDialogContentContext
export interface AlertDialogContentContextParams {
  cancelElement: Ref<HTMLElement | undefined>;
}
export interface AlertDialogContentContext extends AlertDialogContentContextParams {
  onCancelElementChange: (el: HTMLElement | undefined) => void;
}

// AlertDialogTitle
export interface AlertDialogTitleProps extends DialogTitleProps {}
export type AlertDialogTitlePropsWithPrimitive = AlertDialogTitleProps & PrimitiveProps;

// AlertDialogDescription
export interface AlertDialogDescriptionProps extends DialogDescriptionProps {}
export type AlertDialogDescriptionPropsWithPrimitive = AlertDialogDescriptionProps & PrimitiveProps;

// AlertDialogCancel
export interface AlertDialogCancelProps extends DialogCloseProps {}
export type AlertDialogCancelPropsWithPrimitive = AlertDialogCancelProps & PrimitiveProps;

// AlertDialogAction
export interface AlertDialogActionProps extends DialogCloseProps {}
export type AlertDialogActionPropsWithPrimitive = AlertDialogActionProps & PrimitiveProps;
