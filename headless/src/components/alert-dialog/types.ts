import type { DialogRootEmits, DialogRootProps } from '../dialog/types';

export interface AlertDialogRootProps extends Omit<DialogRootProps, 'modal'> {}

export type AlertDialogRootEmits = DialogRootEmits;

export type {
  DialogCloseProps as AlertDialogCloseProps,
  DialogContentProps as AlertDialogContentProps,
  DialogContentEmits as AlertDialogContentEmits
} from '../dialog/types';
