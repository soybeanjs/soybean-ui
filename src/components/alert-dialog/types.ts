import type {
  DialogCloseProps as AlertDialogCancelProps,
  DialogContentEmits as AlertDialogContentEmits,
  DialogContentProps as AlertDialogContentProps,
  DialogDescriptionProps as AlertDialogDescriptionProps,
  DialogFooterProps as AlertDialogFooterProps,
  DialogHeaderProps as AlertDialogHeaderProps,
  DialogOverlayProps as AlertDialogOverlayProps,
  DialogPortalProps as AlertDialogPortalProps,
  DialogRootEmits as AlertDialogRootEmits,
  DialogTitleProps as AlertDialogTitleProps,
  DialogTriggerProps as AlertDialogTriggerProps,
  DialogRootProps
} from '../dialog';

export interface AlertDialogRootProps extends Omit<DialogRootProps, 'modal'> {}

export type {
  AlertDialogRootEmits,
  AlertDialogContentProps,
  AlertDialogContentEmits,
  AlertDialogCancelProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps
};
