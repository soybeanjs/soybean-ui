import type { ComputedRef, ButtonHTMLAttributes, HTMLAttributes, Ref, ShallowRef, VNode } from 'vue';
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  PropsToContext,
  TrapFocusProps,
  UiClass
} from '../../types';
import type { ButtonProps } from '../button/types';
import type { IconValue } from '../_icon/types';
import type { PortalProps as DialogPortalProps } from '../portal/types';
import type { PrimitiveProps } from '../primitive/types';

export type DialogAlertType = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface DialogRootProps {
  /**
   * The controlled open state of the dialog. Can be bound with `v-model:open`.
   *
   * @defaultValue undefined
   */
  open?: boolean;
  /**
   * The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.
   *
   * @defaultValue false
   */
  defaultOpen?: boolean;
  /**
   * The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog
   * content will be visible to screen readers.
   *
   * @defaultValue true
   */
  modal?: boolean;
  /**
   * Whether the dialog is an alert dialog. An alert dialog is a dialog that interrupts the user's workflow to communicate an important message and requires a response.
   *
   * When set to `true`, the dialog will have `role="alertdialog"` and will require a `DialogTitle` to be provided. This is used for accessibility purposes.
   *
   * @defaultValue false
   */
  isAlert?: boolean;
  /**
   * The alert type of the dialog, which determines the default icon and styles when the dialog is an alert dialog.
   */
  alertType?: DialogAlertType;
}
export type DialogRootEmits = {
  /** Event handler called when the open state of the dialog changes. */
  'update:open': [value: boolean];
};

export interface DialogTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface DialogOverlayProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

export interface DialogPopupImplProps
  extends PrimitiveProps, TrapFocusProps, DismissableLayerProps, /** @vue-ignore */ HTMLAttributes {}
export type DialogPopupImplEmits = DismissableLayerEmits & FocusScopeEmits;

export interface DialogPopupProps
  extends Omit<DialogPopupImplProps, 'trapFocus' | 'disableOutsidePointerEvents'>, ForceMountProps {}
export type DialogPopupEmits = DialogPopupImplEmits;

export interface DialogTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogCloseProps extends ButtonProps {}
export type DialogCloseEmits = {
  /** Event handler called when the dialog is requested to be closed. */
  close: [event: MouseEvent];
};

export interface DialogCancelProps extends ButtonProps {}
export type DialogCancelEmits = {
  /** Event handler called when the dialog is requested to be canceled. */
  cancel: [event: MouseEvent];
};

export interface DialogConfirmProps extends ButtonProps {}
export type DialogConfirmEmits = {
  /** Event handler called when the dialog is requested to be closed by confirming. */
  confirm: [event: MouseEvent];
};

export interface DialogHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogCompactProps extends DialogRootProps {
  /**
   * The title of the dialog. This is used for accessibility purposes and will be rendered in the header of the dialog if the `title` slot is not provided.
   */
  title?: string;
  /**
   * The description of the dialog. This is used for accessibility purposes and will be rendered in the content of the dialog if the `description` slot is not provided.
   */
  description?: string;
  /**
   * The icon of the dialog. This is used for accessibility purposes and will be rendered in the header of the dialog if the `icon` slot is not provided.
   */
  icon?: IconValue;
  /**
   * Whether show the close button in the header of the dialog.
   *
   * @defaultValue true
   */
  showClose?: boolean;
  /**
   * Whether to use the pure version of the dialog, which does not include the header and footer.
   * This is useful when you want to fully control the content of the dialog and do not need the built-in header and footer.
   *
   * @defaultValue false
   */
  pure?: boolean;
  /**
   * Whether to show the cancel button.
   *
   * When set to `onlyWarning`, the cancel button will only be shown when the dialog is an alert dialog with `alertType="warning"`.
   * When set to `true`, the cancel button will always be shown.
   *
   * @defaultValue 'onlyWarning'
   */
  showCancel?: 'onlyWarning' | boolean;
  /**
   * The text of the cancel button. This is used for accessibility purposes and will be rendered in the footer of the dialog if the `cancel` slot is not provided.
   *
   * @defaultValue 'Cancel'
   */
  cancelText?: string;
  /**
   * Whether to show the confirm button when the dialog is an alert dialog.
   *
   * The default value is `true` when the dialog is an alert dialog.
   */
  showConfirm?: boolean;
  /**
   * The text of the confirm button. This is used for accessibility purposes and will be rendered in the footer of the dialog if the `confirm` slot is not provided.
   *
   * @defaultValue 'Confirm'
   */
  confirmText?: string;
  triggerProps?: DialogTriggerProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
  popupProps?: DialogPopupProps;
  headerProps?: DialogHeaderProps;
  contentProps?: DialogContentProps;
  footerProps?: DialogFooterProps;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  closeProps?: DialogCloseProps;
  cancelProps?: DialogCancelProps;
  confirmProps?: DialogConfirmProps;
}

export type DialogCompactEmits = DialogRootEmits &
  DialogPopupEmits &
  DialogCloseEmits &
  DialogConfirmEmits &
  DialogCancelEmits;

export interface DialogCompactBaseSlotProps {
  open: boolean;
  close: () => void;
}

export type DialogCompactSlots = {
  default: (props: DialogCompactBaseSlotProps) => any;
  trigger?: (props: DialogCompactBaseSlotProps) => any;
  title?: (props: DialogCompactBaseSlotProps) => any;
  description?: (props: DialogCompactBaseSlotProps) => any;
  close?: (props: DialogCompactBaseSlotProps) => any;
  footer?: (props: DialogCompactBaseSlotProps) => any;
  cancel?: (props: DialogCompactBaseSlotProps) => any;
  confirm?: (props: DialogCompactBaseSlotProps) => any;
};

export interface DialogRootContextParams extends PropsToContext<DialogRootProps, 'modal' | 'isAlert' | 'alertType'> {
  open: Ref<boolean | undefined>;
}

export interface DialogProviderContext {
  dialogs: ShallowRef<DialogT[]>;
}

export interface DialogCompactContext {
  dialog: ComputedRef<DialogT | undefined>;
}

export type DialogUiSlot =
  | 'overlay'
  | 'popup'
  | 'header'
  | 'content'
  | 'footer'
  | 'title'
  | 'icon'
  | 'description'
  | 'close'
  | 'cancel'
  | 'confirm';

export type DialogUi = UiClass<DialogUiSlot>;

export type { DialogPortalProps };

export interface DialogT extends Pick<DialogCompactProps, 'open' | 'icon' | 'showCancel' | 'showConfirm'> {
  id: number | string;
  type?: DialogAlertType;
  ui?: Partial<DialogUi>;
  title?: VNode | string;
  description?: VNode | string;
  content?: VNode;
  footer?: VNode;
  cancelText?: VNode | string;
  confirmText?: VNode | string;
  onCancel?: (event: MouseEvent) => void;
  onConfirm?: (event: MouseEvent) => void;
  onDismiss?: (dialog: DialogT) => void;
}

export interface DialogExternal extends Omit<DialogT, 'id' | 'type' | 'title'> {
  id?: number | string;
}

export interface DialogCreateOptions extends Omit<DialogT, 'id'> {
  id?: number | string;
}

export type DialogSubscriber = (dialog: DialogT) => void;
