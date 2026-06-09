import type {
  NavigationMenuCompactProps,
  NavigationMenuCompactEmits,
  NavigationMenuCompactSlots,
  NavigationMenuUi
} from '@soybeanjs/headless/navigation-menu';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the NavigationMenu component.
 */
export interface NavigationMenuProps extends NavigationMenuCompactProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<NavigationMenuUi>;
}

/**
 * Events for the NavigationMenu component.
 */
export type NavigationMenuEmits = NavigationMenuCompactEmits;

/**
 * Slots for the NavigationMenu component.
 */
export type NavigationMenuSlots = NavigationMenuCompactSlots;
