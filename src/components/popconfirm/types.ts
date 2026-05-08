import type {
  PopconfirmCompactEmits,
  PopconfirmCompactProps,
  PopconfirmCompactSlots,
  PopconfirmType as _PopconfirmType,
  PopconfirmUi as _PopconfirmUi
} from '@soybeanjs/headless/popconfirm';
import type { ClassValue, MaybePromise, PropsToContext } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
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
 * Supported popconfirm values.
 */
export type PopconfirmType = _PopconfirmType;

/**
 * UI class overrides for the Popconfirm component.
 */
export type PopconfirmUi = _PopconfirmUi;

/**
 * Properties for the Popconfirm component.
 */
export interface PopconfirmProps extends Omit<PopconfirmCompactProps, 'confirmProps' | 'cancelProps'> {
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
   * Properties forwarded to the confirm element.
   */
  confirmProps?: PopconfirmConfirmProps;
  /**
   * Properties forwarded to the cancel element.
   */
  cancelProps?: PopconfirmCancelProps;
}

/**
 * Events for the Popconfirm component.
 */
export type PopconfirmEmits = PopconfirmCompactEmits;

/**
 * Slots for the Popconfirm component.
 */
export type PopconfirmSlots = PopconfirmCompactSlots;

/**
 * Context for the Popconfirm component.
 */
export interface PopconfirmContext extends PropsToContext<
  PopconfirmProps,
  'size'
> {}
