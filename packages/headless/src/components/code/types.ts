import type { BaseProps, UiClass } from '../../types';

/**
 * Properties for the CodeRoot component.
 */
export interface CodeRootProps extends BaseProps {
  /**
   * The source code to display.
   */
  code?: string;
  /**
   * The language of the code, passed to the highlighter.
   */
  language?: string;
  /**
   * Whether to render line numbers.
   */
  lineNumbers?: boolean;
  /**
   * Whether a copy button is available.
   */
  copyable?: boolean;
  /**
   * The text to copy when `copyable`. Defaults to `code`.
   */
  copyText?: string;
  /**
   * A syntax-highlighting function returning HTML. When omitted the code is
   * rendered as escaped plain text.
   */
  highlight?: (code: string, language?: string) => string;
}

/**
 * Events for the CodeRoot component.
 */
export type CodeRootEmits = {
  /**
   * Emitted when the code has been copied.
   */
  copied: [text: string];
};

/**
 * Slot props exposed by the CodeRoot copy button slot.
 */
export interface CodeCopySlotProps {
  /** Whether the code was just copied. */
  copied: boolean;
  /** Copies the code to the clipboard. */
  copy: () => Promise<void>;
}

/**
 * Available UI slots for the Code component.
 */
export type CodeUiSlot = 'root' | 'code' | 'lineNumbers' | 'copyButton';

/**
 * UI class overrides for the Code component.
 */
export type CodeUi = UiClass<CodeUiSlot>;
