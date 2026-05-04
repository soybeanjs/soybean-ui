import type { CardCompactProps, CardUi } from '@soybeanjs/headless/card';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Card component.
 */
export interface CardProps extends CardCompactProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CardUi>;
  /**
   * If true, the content will be scrollable when the root has height and content is taller than the root
   *
   * @default false
   */
  scrollable?: boolean;
  /**
   * If true, the card will add divider between title and content and footer
   *
   * @default false
   */
  split?: boolean;
}
