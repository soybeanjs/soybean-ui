import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the AppPageHeader component.
 */
export interface AppPageHeaderProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * The page title.
   */
  title?: string;
  /**
   * The page description shown under the title.
   */
  description?: string;
  /**
   * Whether to show a back button.
   */
  showBack?: boolean;
  /**
   * Whether the header is sticky on top of the content area.
   */
  sticky?: boolean;
}
