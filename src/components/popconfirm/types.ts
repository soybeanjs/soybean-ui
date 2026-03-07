import type { HTMLAttributes } from 'vue';
import type {
  ClassValue,
  MaybePromise,
  Placement,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverPopupProps,
  PopoverPortalProps,
  PopoverPositionerEmits,
  PopoverPositionerProps,
  PopoverRootEmits,
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverUiSlot,
  PropsToContext,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { ButtonProps } from '../button/types';

export interface PopconfirmConfirmProps extends ButtonProps {
  text?: string;
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   * @returns A boolean or a promise that resolves to a boolean. if returns `false`, the dialog will not close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}
export type PopconfirmConfirmEmits = {
  close: [];
};

export interface PopconfirmCancelProps extends ButtonProps {
  text?: string;
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   * @returns A boolean or a promise that resolves to a boolean. if returns `false`, the dialog will not close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}
export type PopconfirmCancelEmits = {
  close: [];
};

export interface PopconfirmHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface PopconfirmTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface PopconfirmDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export interface PopconfirmContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface PopconfirmFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export type PopconfirmType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

type PopconfirmUiSlot = PopoverUiSlot | 'header' | 'icon' | 'header' | 'title' | 'description' | 'content' | 'footer';

export type PopconfirmUi = UiClass<PopconfirmUiSlot>;

export interface PopconfirmProps extends PopoverRootProps {
  /**
   * class of popup
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<PopconfirmUi>;
  type?: PopconfirmType;
  placement?: Placement;
  title?: string;
  description?: string;
  content?: string;
  showArrow?: boolean;
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
  beforeCancel?: () => MaybePromise<boolean | void>;
  beforeConfirm?: () => MaybePromise<boolean | void>;
  confirmProps?: PopconfirmConfirmProps;
  cancelProps?: PopconfirmCancelProps;
  positionerProps?: PopoverPositionerProps;
  popupProps?: PopoverPopupProps;
  triggerProps?: PopoverTriggerProps;
  closeProps?: PopoverCloseProps;
  portalProps?: PopoverPortalProps;
  arrowProps?: PopoverArrowProps;
  headerProps?: PopconfirmHeaderProps;
  titleProps?: PopconfirmTitleProps;
  descriptionProps?: PopconfirmDescriptionProps;
  contentProps?: PopconfirmContentProps;
  footerProps?: PopconfirmFooterProps;
}

export type PopconfirmEmits = PopoverRootEmits &
  PopoverPositionerEmits & {
    close: [];
  };

export interface PopconfirmContext extends PropsToContext<
  PopconfirmProps,
  | 'size'
  | 'confirmText'
  | 'cancelText'
  | 'beforeCancel'
  | 'beforeConfirm'
  | 'showCancel'
  | 'cancelProps'
  | 'confirmProps'
> {
  onClose: () => void;
}
