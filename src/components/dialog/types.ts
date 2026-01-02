import type { VNode } from 'vue';
import type {
  DialogContentEmits,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
  DialogUiSlot,
  EmitsToHookProps,
  MaybePromise,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export type DialogExtraUiSlot = 'closable';

export type DialogExtendedUi = UiClass<DialogUiSlot | DialogExtraUiSlot>;

export interface DialogProps extends DialogRootProps {
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  title?: string;
  description?: string;
  closable?: boolean;
  triggerProps?: DialogTriggerProps;
  contentProps?: DialogContentProps;
  headerProps?: DialogHeaderProps;
  footerProps?: DialogFooterProps;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type DialogEmits = DialogRootEmits & DialogContentEmits;

export interface DialogPureProps extends DialogRootProps {
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  closable?: boolean;
  triggerProps?: DialogTriggerProps;
  contentProps?: DialogContentProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type DialogPureEmits = DialogEmits;

export type UseDialogType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface UseDialogOptions extends Partial<EmitsToHookProps<DialogContentEmits>> {
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  type: UseDialogType;
  title?: string | VNode;
  showIcon?: boolean;
  description?: string | VNode;
  content?: VNode;
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
