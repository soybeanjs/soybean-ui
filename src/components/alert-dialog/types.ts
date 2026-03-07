import type { VNode } from 'vue';
import type {
  AlertDialogRootEmits,
  AlertDialogCloseEmits,
  MaybePromise,
  PropsToContext,
  DialogUi
} from '@soybeanjs/headless';
import type { ThemeColor } from '@/theme';
import type { DialogProps } from '../dialog/types';
import type { ButtonProps } from '../button/types';

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
export type AlertDialogCancelEmits = AlertDialogCloseEmits;

export interface AlertDialogConfirmProps extends ButtonProps {
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
export type AlertDialogConfirmEmits = AlertDialogCloseEmits;

export type AlertDialogType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface AlertDialogProps extends Omit<DialogProps, 'modal' | 'closable'> {
  /**
   * The type of the alert dialog, which determines the default icon and styles.
   */
  type?: AlertDialogType;
  /**
   * Determines whether to show the default icon.
   */
  showIcon?: boolean;
  /**
   * The text of the confirm button.
   *
   * @defaultValue 'Confirm'
   */
  confirmText?: string;
  /**
   * The text of the cancel button.
   *
   * @defaultValue 'Cancel'
   */
  cancelText?: string;
  /**
   * Determines whether the cancel button is shown.
   *
   * @default 'onlyWarning'
   */
  showCancel?: 'onlyWarning' | boolean;
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   */
  beforeCancel?: () => MaybePromise<boolean | void>;
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   */
  beforeConfirm?: () => MaybePromise<boolean | void>;
  confirmProps?: AlertDialogConfirmProps;
  cancelProps?: AlertDialogCancelProps;
}

export type AlertDialogEmits = AlertDialogRootEmits & {
  /**
   * Emitted when the dialog is requested to be closed, regardless of the reason.
   */
  close: [];
};

export interface AlertDialogContext extends PropsToContext<
  AlertDialogProps,
  'size' | 'confirmText' | 'cancelText' | 'showCancel' | 'confirmProps' | 'cancelProps'
> {
  beforeConfirm?: () => MaybePromise<boolean | void>;
  beforeCancel?: () => MaybePromise<boolean | void>;
  onClose: () => void;
}

export interface UseDialogOptions extends Pick<
  AlertDialogProps,
  | 'class'
  | 'size'
  | 'type'
  | 'showIcon'
  | 'confirmText'
  | 'cancelText'
  | 'showCancel'
  | 'beforeConfirm'
  | 'beforeCancel'
  | 'confirmProps'
  | 'cancelProps'
> {
  ui?: Partial<DialogUi>;
  title?: string | VNode;
  description?: string | VNode;
  content?: VNode;
  footer?: VNode;
  onClose?: () => void;
}

export interface UseDialogState extends Omit<UseDialogOptions, 'onClose'> {
  id: number;
  onClose: (open?: boolean) => void;
}

export interface UseDialogReturn extends Record<AlertDialogType, (options: Omit<UseDialogOptions, 'type'>) => void> {
  (options: UseDialogOptions): void;
  clear: () => void;
}
