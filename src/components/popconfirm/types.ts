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
 * Props for the popconfirm confirm component.
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
 * Emits for the popconfirm confirm component.
 */
export type PopconfirmConfirmEmits = {
  /**
   * Emitted when close occurs.
   */
  close: [];
};

/**
 * Props for the popconfirm cancel component.
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
 * Emits for the popconfirm cancel component.
 */
export type PopconfirmCancelEmits = {
  /**
   * Emitted when close occurs.
   */
  close: [];
};

/**
 * Props for the popconfirm header component.
 */
export interface PopconfirmHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the popconfirm title component.
 */
export interface PopconfirmTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the popconfirm description component.
 */
export interface PopconfirmDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the popconfirm content component.
 */
export interface PopconfirmContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the popconfirm footer component.
 */
export interface PopconfirmFooterProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Supported popconfirm values.
 */
export type PopconfirmType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

type PopconfirmUiSlot = PopoverUiSlot | 'header' | 'icon' | 'header' | 'title' | 'description' | 'content' | 'footer';

/**
 * UI class overrides for the popconfirm component.
 */
export type PopconfirmUi = UiClass<PopconfirmUiSlot>;

/**
 * Props for the popconfirm component.
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
   * Props forwarded to the confirm element.
   */
  confirmProps?: PopconfirmConfirmProps;
  /**
   * Props forwarded to the cancel element.
   */
  cancelProps?: PopconfirmCancelProps;
  /**
   * Props forwarded to the positioner element.
   */
  positionerProps?: PopoverPositionerProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: PopoverPopupProps;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: PopoverTriggerProps;
  /**
   * Props forwarded to the close element.
   */
  closeProps?: PopoverCloseProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: PopoverPortalProps;
  /**
   * Props forwarded to the arrow element.
   */
  arrowProps?: PopoverArrowProps;
  /**
   * Props forwarded to the header element.
   */
  headerProps?: PopconfirmHeaderProps;
  /**
   * Props forwarded to the title element.
   */
  titleProps?: PopconfirmTitleProps;
  /**
   * Props forwarded to the description element.
   */
  descriptionProps?: PopconfirmDescriptionProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: PopconfirmContentProps;
  /**
   * Props forwarded to the footer element.
   */
  footerProps?: PopconfirmFooterProps;
}

/**
 * Emits for the popconfirm component.
 */
export type PopconfirmEmits = PopoverRootEmits &
  PopoverPositionerEmits & {
    /**
     * Emitted when close occurs.
     */
    close: [];
  };

/**
 * Context for the popconfirm component.
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
