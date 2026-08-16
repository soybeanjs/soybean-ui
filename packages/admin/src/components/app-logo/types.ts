import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the AppLogo component.
 */
export interface AppLogoProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * The logo source. An iconify name (e.g. `lucide:command`) or an image URL.
   */
  logo?: string;
  /**
   * The title text shown next to the logo.
   */
  title?: string;
  /**
   * Whether to show the title.
   *
   * @default true
   */
  showTitle?: boolean;
  /**
   * Whether to use inverted (light-on-dark) styling.
   */
  inverted?: boolean;
}
