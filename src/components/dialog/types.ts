import type { VNode } from 'vue';
import type {
  ClassValue,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPopupEmits,
  DialogPopupProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
  DialogUi,
  EmitsToHookProps,
  MaybePromise
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export type DialogExtraThemeSlot = 'closable';

export type DialogExtendedUi = DialogUi & Record<DialogExtraThemeSlot, ClassValue>;

export interface DialogProps extends DialogRootProps {
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  title?: string;
  description?: string;
  closable?: boolean;
  triggerProps?: DialogTriggerProps;
  popupProps?: DialogPopupProps;
  headerProps?: DialogHeaderProps;
  footerProps?: DialogFooterProps;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type DialogEmits = DialogRootEmits & DialogPopupEmits;

export interface DialogPureProps extends DialogRootProps {
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  closable?: boolean;
  triggerProps?: DialogTriggerProps;
  popupProps?: DialogPopupProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type DialogPureEmits = DialogEmits;

export type UseDialogType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface UseDialogOptions extends Partial<EmitsToHookProps<DialogPopupEmits>> {
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  type: UseDialogType;
  title?: string | VNode;
  showIcon?: boolean;
  description?: string | VNode;
  popup?: VNode;
  footer?: VNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => MaybePromise<boolean | void>;
  onCancel?: () => MaybePromise<boolean | void>;
}

export interface DialogState extends UseDialogOptions {
  id: number;
}

export interface UseDialogReturn extends Record<UseDialogType, (options: Omit<UseDialogOptions, 'type'>) => void> {
  (options: UseDialogOptions): void;
  clear: () => void;
}
