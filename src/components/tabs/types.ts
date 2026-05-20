import type {
  TabsCompactEmits,
  TabsCompactProps,
  TabsCompactSlots,
  TabsOptionData,
  TabsUi
} from '@soybeanjs/headless/tabs';
import type { AcceptableValue, ClassValue } from '@soybeanjs/headless/types';
import type { TabsFill } from '@/styles/tabs';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Tabs component.
 */
export interface TabsProps<T extends TabsOptionData = TabsOptionData> extends TabsCompactProps<T> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /** Styled tabs ui slots, including `indicatorContent` for the compact indicator body. */
  ui?: Partial<TabsUi>;
  /**
   * Fill.
   */
  fill?: TabsFill;
}

/**
 * Events for the Tabs component.
 */
export type TabsEmits<T extends AcceptableValue = AcceptableValue> = TabsCompactEmits<T>;

/**
 * Slots for the Tabs component.
 */
export type TabsSlots<T extends TabsOptionData = TabsOptionData> = TabsCompactSlots<T>;

export type { TabsOptionData } from '@soybeanjs/headless/tabs';
