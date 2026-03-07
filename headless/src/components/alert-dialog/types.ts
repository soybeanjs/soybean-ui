import type { DialogRootEmits, DialogContentEmits, DialogCloseEmits, DialogRootProps } from '../dialog/types';

export interface AlertDialogRootProps extends Omit<DialogRootProps, 'modal'> {}

export type AlertDialogRootEmits = DialogRootEmits;

export type AlertDialogCloseEmits = DialogCloseEmits;

export type AlertDialogContentEmits = DialogContentEmits;

export type {
  DialogCloseProps as AlertDialogCloseProps,
  DialogContentProps as AlertDialogContentProps
} from '../dialog/types';
