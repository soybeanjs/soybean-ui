import type { AlertDialogRootEmits } from '@soybeanjs/headless';
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
}

export interface AlertDialogActionProps extends ButtonProps {
  /**
   * The text of the action button.
   *
   * @defaultValue 'Confirm'
   */
  text?: string;
}
