import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxCodeBlock component.
 */
export interface CodeBlockProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The code to display.
   */
  code: string;
  /**
   * The language of the code (used for highlighting + label). Defaults to `text`.
   */
  language?: string;
  /**
   * Whether to show the header (language + copy). Defaults to `true`.
   */
  showHeader?: boolean;
  /**
   * Whether to enable shiki syntax highlighting. Defaults to `false`.
   */
  highlight?: boolean;
  /**
   * Copy text override (defaults to the code itself).
   */
  copyText?: string;
  /**
   * Emitted when a copy is performed.
   */
  onCopy?: (text: string) => void;
}
