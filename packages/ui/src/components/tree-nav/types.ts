import type {
  TreeNavCompactProps,
  TreeNavCompactEmits,
  TreeNavCompactSlots,
  TreeNavUi
} from '@soybeanjs/headless/tree-nav';
import type { ClassValue, DefinedValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the TreeNav component.
 */
export interface TreeNavProps<T extends DefinedValue = DefinedValue> extends TreeNavCompactProps<T> {
  /**
   * class of tree-nav root.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Visual variant of the component.
   */
  variant?: 'default' | 'nav';
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<TreeNavUi>;
}

/**
 * Events for the TreeNav component.
 */
export type TreeNavEmits<T extends DefinedValue = DefinedValue> = TreeNavCompactEmits<T>;

/**
 * Slots for the TreeNav component.
 */
export type TreeNavSlots<T extends DefinedValue = DefinedValue> = TreeNavCompactSlots<T>;
