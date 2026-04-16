import type {
  ClassValue,
  AlignSide,
  DefinedValue,
  MenubarCompactProps,
  MenubarCompactEmits,
  MenubarCompactSlots,
  MenubarUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface MenubarProps<T extends DefinedValue = DefinedValue> extends MenubarCompactProps<T> {
  /**
   * class of menubar root
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<MenubarUi>;
  indicatorPosition?: AlignSide;
}

export type MenubarEmits<T extends DefinedValue = DefinedValue> = MenubarCompactEmits<T>;

export type MenubarSlots<T extends DefinedValue = DefinedValue> = MenubarCompactSlots<T>;
