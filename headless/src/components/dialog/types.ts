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

/**
 * Supported dialog alert values.
 */
export type DialogAlertType = 'default' | 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the dialog base component.
 */
export interface DialogBaseProps {
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
}

/**
 * Props for the dialog root component.
 */
export interface DialogRootProps extends DialogBaseProps {
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
/**
 * Emits for the dialog root component.
 */
export type DialogRootEmits = {
  /** Event handler called when the open state of the dialog changes. */
  'update:open': [value: boolean];
};

/**
 * Props for the dialog trigger component.
 */
export interface DialogTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

/**
 * Props for the dialog overlay component.
 */
export interface DialogOverlayProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the dialog popup impl component.
 */
export interface DialogPopupImplProps
  extends PrimitiveProps, TrapFocusProps, DismissableLayerProps, /** @vue-ignore */ HTMLAttributes {}
/**
 * Emits for the dialog popup impl component.
 */
export type DialogPopupImplEmits = DismissableLayerEmits & FocusScopeEmits;

/**
 * Props for the dialog popup component.
 */
export interface DialogPopupProps
  extends Omit<DialogPopupImplProps, 'trapFocus' | 'disableOutsidePointerEvents'>, ForceMountProps {}
/**
 * Emits for the dialog popup component.
 */
export type DialogPopupEmits = DialogPopupImplEmits;

/**
 * Props for the dialog title component.
 */
export interface DialogTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the dialog description component.
 */
export interface DialogDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the dialog close component.
 */
export interface DialogCloseProps extends ButtonProps {}
/**
 * Emits for the dialog close component.
 */
export type DialogCloseEmits = {
  /** Event handler called when the dialog is requested to be closed. */
  close: [event: MouseEvent];
};

/**
 * Props for the dialog cancel component.
 */
export interface DialogCancelProps extends ButtonProps {}
/**
 * Emits for the dialog cancel component.
 */
export type DialogCancelEmits = {
  /** Event handler called when the dialog is requested to be canceled. */
  cancel: [event: MouseEvent];
};

/**
 * Props for the dialog confirm component.
 */
export interface DialogConfirmProps extends ButtonProps {}
/**
 * Emits for the dialog confirm component.
 */
export type DialogConfirmEmits = {
  /** Event handler called when the dialog is requested to be closed by confirming. */
  confirm: [event: MouseEvent];
};

/**
 * Props for the dialog header component.
 */
export interface DialogHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the dialog content component.
 */
export interface DialogContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the dialog footer component.
 */
export interface DialogFooterProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the dialog compact component.
 */
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
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: DialogTriggerProps;
  /**
   * Props forwarded to the overlay element.
   */
  overlayProps?: DialogOverlayProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: DialogPortalProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: DialogPopupProps;
  /**
   * Props forwarded to the header element.
   */
  headerProps?: DialogHeaderProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: DialogContentProps;
  /**
   * Props forwarded to the footer element.
   */
  footerProps?: DialogFooterProps;
  /**
   * Props forwarded to the title element.
   */
  titleProps?: DialogTitleProps;
  /**
   * Props forwarded to the description element.
   */
  descriptionProps?: DialogDescriptionProps;
  /**
   * Props forwarded to the close element.
   */
  closeProps?: DialogCloseProps;
  /**
   * Props forwarded to the cancel element.
   */
  cancelProps?: DialogCancelProps;
  /**
   * Props forwarded to the confirm element.
   */
  confirmProps?: DialogConfirmProps;
}

/**
 * Emits for the dialog compact component.
 */
export type DialogCompactEmits = DialogRootEmits &
  DialogPopupEmits &
  DialogCloseEmits &
  DialogConfirmEmits &
  DialogCancelEmits;

/**
 * Slot props for the dialog compact base component.
 */
export interface DialogCompactBaseSlotProps {
  /**
   * Whether the component is open.
   */
  open: boolean;
  /**
   * Close exposed in the slot scope.
   */
  close: () => void;
}

/**
 * Slots for the dialog compact component.
 */
export type DialogCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default: (props: DialogCompactBaseSlotProps) => any;
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: DialogCompactBaseSlotProps) => any;
  /**
   * Custom content for the title slot.
   */
  title?: (props: DialogCompactBaseSlotProps) => any;
  /**
   * Custom content for the description slot.
   */
  description?: (props: DialogCompactBaseSlotProps) => any;
  /**
   * Custom content for the close slot.
   */
  close?: (props: DialogCompactBaseSlotProps) => any;
  /**
   * Custom content for the footer slot.
   */
  footer?: (props: DialogCompactBaseSlotProps) => any;
  /**
   * Custom content for the cancel slot.
   */
  cancel?: (props: DialogCompactBaseSlotProps) => any;
  /**
   * Custom content for the confirm slot.
   */
  confirm?: (props: DialogCompactBaseSlotProps) => any;
};

/**
 * Parameters used to create the dialog root context.
 */
export interface DialogRootContextParams extends PropsToContext<DialogRootProps, 'modal' | 'isAlert' | 'alertType'> {
  /**
   * Whether the component is open.
   */
  open: Ref<boolean | undefined>;
}

/**
 * Context for the dialog provider component.
 */
export interface DialogProviderContext {
  /**
   * Dialogs used by the component context.
   */
  dialogs: ShallowRef<DialogT[]>;
}

/**
 * Context for the dialog compact component.
 */
export interface DialogCompactContext {
  /**
   * Dialog used by the component context.
   */
  dialog: ComputedRef<DialogT | undefined>;
}

/**
 * Available UI slots for the dialog component.
 */
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

/**
 * UI class overrides for the dialog component.
 */
export type DialogUi = UiClass<DialogUiSlot>;

export type { DialogPortalProps };

/**
 * Type information for the dialog t component.
 */
export interface DialogT extends Pick<DialogCompactProps, 'open' | 'icon' | 'showCancel' | 'showConfirm'> {
  /**
   * Id.
   */
  id: number | string;
  /**
   * Type.
   */
  type?: DialogAlertType;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<DialogUi>;
  /**
   * Title text rendered by the component.
   */
  title?: VNode | string;
  /**
   * Description text rendered by the component.
   */
  description?: VNode | string;
  /**
   * Content.
   */
  content?: VNode;
  /**
   * Footer.
   */
  footer?: VNode;
  /**
   * Whether the component can cel text.
   */
  cancelText?: VNode | string;
  /**
   * Confirm text.
   */
  confirmText?: VNode | string;
  /**
   * Callback invoked when the cancel event fires.
   */
  onCancel?: (event: MouseEvent) => void;
  /**
   * Callback invoked when the confirm event fires.
   */
  onConfirm?: (event: MouseEvent) => void;
  /**
   * Callback invoked when the dismiss event fires.
   */
  onDismiss?: (dialog: DialogT) => void;
}

/**
 * Type information for the dialog external component.
 */
export interface DialogExternal extends Omit<DialogT, 'id' | 'type' | 'title'> {
  /**
   * Id.
   */
  id?: number | string;
}

/**
 * Type information for the dialog create options component.
 */
export interface DialogCreateOptions extends Omit<DialogT, 'id'> {
  /**
   * Id.
   */
  id?: number | string;
}

/**
 * Type information for the dialog subscriber component.
 */
export type DialogSubscriber = (dialog: DialogT) => void;
