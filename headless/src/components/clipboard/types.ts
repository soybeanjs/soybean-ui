import type { ButtonProps as _ButtonProps } from '../button/types';

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
}

export interface ClipboardSlotProps {
  copied: boolean;
  disabled: boolean;
  supported: boolean;
  state: ClipboardState;
  copy: () => Promise<void>;
}

export type ClipboardEmits = {
  click: [event: MouseEvent];
  copied: [value: string];
  copyError: [error: unknown];
};
