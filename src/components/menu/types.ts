import type { ClassValue, AlignSide, MenuUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the menu ui base component.
 */
export interface MenuUiBaseProps {
  /**
   * class of menu popup
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<MenuUi>;
  /**
   * Indicator position.
   */
  indicatorPosition?: AlignSide;
}
