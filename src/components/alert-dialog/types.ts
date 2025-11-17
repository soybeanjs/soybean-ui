import type { AlertDialogRootEmits, MaybePromise } from '@soybeanjs/headless';
import type { ThemeColor } from '@/theme';
import type { DialogProps } from '../dialog/types';
import type { ButtonProps } from '../button/types';

export type AlertDialogType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface AlertDialogProps extends Omit<DialogProps, 'modal' | 'closable'> {
  type?: AlertDialogType;
}

export type AlertDialogEmits = AlertDialogRootEmits;

export interface AlertDialogCancelProps extends ButtonProps {
  /**
   * The text of the cancel button.
   *
   * @defaultValue 'Cancel'
   */
  text?: string;
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   * @returns A boolean or a promise that resolves to a boolean. if returns `false`, the dialog will not close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}

export interface AlertDialogActionProps extends ButtonProps {
  /**
   * The text of the action button.
   *
   * @defaultValue 'Confirm'
   */
  text?: string;
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   * @returns A boolean or a promise that resolves to a boolean. if returns `false`, the dialog will not close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}
