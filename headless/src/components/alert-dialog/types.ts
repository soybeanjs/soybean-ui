import type { DialogRootEmits, DialogRootProps } from '../dialog/types';

export interface AlertDialogRootProps extends Omit<DialogRootProps, 'modal'> {}

export type AlertDialogRootEmits = DialogRootEmits;

export type {
  DialogCloseProps as AlertDialogCloseProps,
  DialogPopupProps as AlertDialogPopupProps,
  DialogPopupEmits as AlertDialogPopupEmits
} from '../dialog/types';
