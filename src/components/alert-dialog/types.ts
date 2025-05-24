import type {
  DialogCloseProps as AlertDialogCancelProps,
  DialogContentEmits as AlertDialogContentEmits,
  DialogContentProps as AlertDialogContentProps,
  DialogRootEmits as AlertDialogRootEmits,
  DialogRootProps
} from '../dialog';

export interface AlertDialogRootProps extends Omit<DialogRootProps, 'modal'> {}

export type { AlertDialogRootEmits, AlertDialogContentProps, AlertDialogContentEmits, AlertDialogCancelProps };
