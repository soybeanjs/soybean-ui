import type { BaseProps } from '../../types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * The semantic type (color) of a typography text.
 */
export type TypographyType = 'default' | 'secondary' | 'success' | 'warning' | 'danger';

/**
 * Properties for the TypographyTitle component.
 */
export interface TypographyTitleProps extends PrimitiveWithBaseProps {
  /**
   * The heading level to render (`h1`–`h6`).
   *
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Events for the TypographyTitle component.
 */
export type TypographyTitleEmits = Record<string, never>;

/**
 * Properties for the TypographyParagraph component.
 */
export interface TypographyParagraphProps extends BaseProps {
  /**
   * Whether a copy button is available for the paragraph text.
   */
  copyable?: boolean;
  /**
   * The text to copy when `copyable`. Defaults to the paragraph text content.
   */
  copyText?: string;
}

/**
 * Events for the TypographyParagraph component.
 */
export type TypographyParagraphEmits = {
  /**
   * Emitted when the paragraph text has been copied.
   */
  copied: [text: string];
};

/**
 * Slot props exposed by the TypographyParagraph default slot.
 */
export interface TypographyParagraphSlotProps {
  /** Whether the paragraph text was just copied. */
  copied: boolean;
  /** Copies the paragraph text to the clipboard. */
  copy: () => Promise<void>;
}

/**
 * Properties for the TypographyText component.
 */
export interface TypographyTextProps extends PrimitiveWithBaseProps {
  /**
   * The semantic type (color) of the text.
   *
   * @default 'default'
   */
  type?: TypographyType;
  /**
   * Render as inline `<code>`.
   */
  code?: boolean;
  /**
   * Render with a highlight `<mark>`.
   */
  mark?: boolean;
  /**
   * Render underlined `<u>`.
   */
  underline?: boolean;
  /**
   * Render deleted `<del>`.
   */
  delete?: boolean;
  /**
   * Render bold `<strong>`.
   */
  strong?: boolean;
  /**
   * Render italic `<em>`.
   */
  italic?: boolean;
}

/**
 * Events for the TypographyText component.
 */
export type TypographyTextEmits = Record<string, never>;
