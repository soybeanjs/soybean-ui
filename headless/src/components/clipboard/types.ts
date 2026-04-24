import type { ButtonProps as _ButtonProps } from '../button/types';
import type { IconValue } from '../_icon/types';

export type ClipboardState = 'ready' | 'copied' | 'unsupported';

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

export interface ClipboardSlotProps {
  copied: boolean;
  disabled: boolean;
  icon: IconValue;
  supported: boolean;
  state: ClipboardState;
  text: string;
  copy: () => Promise<void>;
}

export type ClipboardEmits = {
  click: [event: MouseEvent];
  copied: [value: string];
  copyError: [error: unknown];
};
