import type {
  CardCompactProps,
  CardUi,
  ClassValue
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface CardProps extends CardCompactProps {
  /**
   * root class
   */
  class?: ClassValue;
  size?: ThemeSize;
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
