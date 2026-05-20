import type {
  TreeMenuBaseOptionData,
  TreeMenuCompactEmits,
  TreeMenuCompactProps,
  TreeMenuCompactSlots,
  TreeMenuUiSlot
} from '@soybeanjs/headless/tree-menu';
import type { BaseProps, ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the TreeMenu component.
 */
export interface TreeMenuProps<
  T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData
> extends TreeMenuCompactProps<T> {
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
  ui?: Partial<Record<TreeMenuUiSlot, ClassValue>>;
}

/**
 * Events for the TreeMenu component.
 */
export type TreeMenuEmits = TreeMenuCompactEmits;

/**
 * Slots for the TreeMenu component.
 */
export type TreeMenuSlots<T extends TreeMenuBaseOptionData = TreeMenuBaseOptionData> = TreeMenuCompactSlots<T>;

/**
 * Properties for the TreeMenuStyledItem component.
 */
export interface TreeMenuStyledItemProps extends BaseProps {
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
  ui?: Partial<Record<'button' | 'item', ClassValue>>;
}
