import type { ButtonProps as _ButtonProps } from '../button/types';
import type { IconValue } from '../_icon/types';

/**
 * State values for the clipboard component.
 */
export type ClipboardState = 'ready' | 'copied' | 'unsupported';

/**
 * Properties for the clipboard component.
 */
export interface ClipboardProps extends _ButtonProps {
  /**
   * The text value to copy.
   */
  value: string;
  /**
   * The duration in milliseconds to keep the copied state.
   *
   * @defaultValue 2000
   */
  copiedDuration?: number;
  /**
   * Whether to enable the legacy `execCommand` fallback.
   *
   * @defaultValue true
   */
  legacy?: boolean;
  /**
   * The icon to display before copying.
   *
   * @defaultValue 'lucide:copy'
   */
  copyIcon?: IconValue;
  /**
   * The icon to display after copying.
   *
   * @defaultValue 'lucide:check'
   */
  copiedIcon?: IconValue;
  /**
   * The text to display before copying.
   *
   * @defaultValue 'Copy'
   */
  copyText?: string;
  /**
   * The text to display after copying.
   *
   * @defaultValue 'Copied'
   */
  copiedText?: string;
}

/**
 * Slot properties for the clipboard component.
 */
export interface ClipboardSlotProps {
  /**
   * Whether copied.
   */
  copied: boolean;
  /**
   * Whether the component is disabled.
   */
  disabled: boolean;
  /**
   * Icon rendered by the component.
   */
  icon: IconValue;
  /**
   * Whether supported.
   */
  supported: boolean;
  /**
   * State exposed in the slot scope.
   */
  state: ClipboardState;
  /**
   * Text exposed in the slot scope.
   */
  text: string;
  /**
   * Copy exposed in the slot scope.
   */
  copy: () => Promise<void>;
}

/**
 * Events for the clipboard component.
 */
export type ClipboardEmits = {
  /**
   * Emitted when click occurs.
   */
  click: [event: PointerEvent];
  /**
   * Emitted when copied occurs.
   */
  copied: [value: string];
  /**
   * Emitted when copy error occurs.
   */
  copyError: [error: unknown];
};
