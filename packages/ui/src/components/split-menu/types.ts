import type {
  SplitMenuCompactEmits,
  SplitMenuCompactProps,
  SplitMenuCompactSlots,
  SplitMenuUiSlot,
  SplitMenuBaseOptionData
} from '@soybeanjs/headless/split-menu';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the SplitMenu component.
 */
export interface SplitMenuProps<
  T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData
> extends SplitMenuCompactProps<T> {
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
  ui?: Partial<Record<SplitMenuUiSlot, ClassValue>>;
}

/**
 * Events for the SplitMenu component.
 */
export type SplitMenuEmits = SplitMenuCompactEmits;

/**
 * Slots for the SplitMenu component.
 */
export type SplitMenuSlots<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData> = SplitMenuCompactSlots<T>;
