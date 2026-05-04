import type { HTMLAttributes } from 'vue';
import type {
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverPopupProps,
  PopoverPortalProps,
  PopoverPositionerEmits,
  PopoverPositionerProps,
  PopoverRootEmits,
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverUiSlot
} from '@soybeanjs/headless/popover';
import type { ClassValue, MaybePromise, Placement, PropsToContext, UiClass } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { ButtonProps } from '../button/types';

/**
 * Properties for the PopconfirmConfirm component.
 */
export interface PopconfirmConfirmProps extends ButtonProps {
  /**
   * Text.
   */
  text?: string;
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   * @returns A boolean or a promise that resolves to a boolean. if returns `false`, the dialog will not close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}
/**
 * Events for the PopconfirmConfirm component.
 */
export type PopconfirmConfirmEmits = {
  /**
   * Emitted when close occurs.
   */
  close: [];
};

/**
 * Properties for the PopconfirmCancel component.
 */
export interface PopconfirmCancelProps extends ButtonProps {
  /**
   * Text.
   */
  text?: string;
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   * @returns A boolean or a promise that resolves to a boolean. if returns `false`, the dialog will not close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}
/**
 * Events for the PopconfirmCancel component.
 */
export type PopconfirmCancelEmits = {
  /**
   * Emitted when close occurs.
   */
  close: [];
};

/**
 * Properties for the PopconfirmHeader component.
 */
export interface PopconfirmHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the PopconfirmTitle component.
 */
export interface PopconfirmTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the PopconfirmDescription component.
 */
export interface PopconfirmDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the PopconfirmContent component.
 */
export interface PopconfirmContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the PopconfirmFooter component.
 */
export interface PopconfirmFooterProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Supported popconfirm values.
 */
export type PopconfirmType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

type PopconfirmUiSlot = PopoverUiSlot | 'header' | 'icon' | 'header' | 'title' | 'description' | 'content' | 'footer';

/**
 * UI class overrides for the Popconfirm component.
 */
export type PopconfirmUi = UiClass<PopconfirmUiSlot>;

/**
 * Properties for the Popconfirm component.
 */
export interface PopconfirmProps extends PopoverRootProps {
  /**
   * class of popup
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<PopconfirmUi>;
  /**
   * Type.
   */
  type?: PopconfirmType;
  /**
   * Placement.
   */
  placement?: Placement;
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Content.
   */
  content?: string;
  /**
   * Whether to show an arrow.
   */
  showArrow?: boolean;
  /**
   * Whether to show an icon.
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
   * Before cancel.
   */
  beforeCancel?: () => MaybePromise<boolean | void>;
  /**
   * Before confirm.
   */
  beforeConfirm?: () => MaybePromise<boolean | void>;
  /**
   * Properties forwarded to the confirm element.
   */
  confirmProps?: PopconfirmConfirmProps;
  /**
   * Properties forwarded to the cancel element.
   */
  cancelProps?: PopconfirmCancelProps;
  /**
   * Properties forwarded to the positioner element.
   */
  positionerProps?: PopoverPositionerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: PopoverPopupProps;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: PopoverTriggerProps;
  /**
   * Properties forwarded to the close element.
   */
  closeProps?: PopoverCloseProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: PopoverPortalProps;
  /**
   * Properties forwarded to the arrow element.
   */
  arrowProps?: PopoverArrowProps;
  /**
   * Properties forwarded to the header element.
   */
  headerProps?: PopconfirmHeaderProps;
  /**
   * Properties forwarded to the title element.
   */
  titleProps?: PopconfirmTitleProps;
  /**
   * Properties forwarded to the description element.
   */
  descriptionProps?: PopconfirmDescriptionProps;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: PopconfirmContentProps;
  /**
   * Properties forwarded to the footer element.
   */
  footerProps?: PopconfirmFooterProps;
}

/**
 * Events for the Popconfirm component.
 */
export type PopconfirmEmits = PopoverRootEmits &
  PopoverPositionerEmits & {
    /**
     * Emitted when close occurs.
     */
    close: [];
  };

/**
 * Context for the Popconfirm component.
 */
export interface PopconfirmContext extends PropsToContext<
  PopconfirmProps,
  'size' | 'confirmText' | 'cancelText' | 'showCancel' | 'confirmProps' | 'cancelProps'
> {
  /**
   * Before confirm used by the component context.
   */
  beforeConfirm?: () => MaybePromise<boolean | void>;
  /**
   * Before cancel used by the component context.
   */
  beforeCancel?: () => MaybePromise<boolean | void>;
  /**
   * Callback invoked when the close event fires.
   */
  onClose: () => void;
}
