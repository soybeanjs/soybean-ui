import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the AppFooter component.
 */
export interface AppFooterProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * The footer text block.
   */
  text?: string;
  /**
   * Whether to show a built-in copyright line.
   */
  showCopyright?: boolean;
}
