import type { ClassValue, AlignSide, MenuUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface MenuUiBaseProps {
  /**
   * class of menu popup
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<MenuUi>;
  indicatorPosition?: AlignSide;
}
