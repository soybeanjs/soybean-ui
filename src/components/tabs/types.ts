import type { AcceptableValue, ClassValue } from '@soybeanjs/headless';
import type {
  TabsCompactEmits,
  TabsCompactProps,
  TabsCompactSlots,
  TabsOptionData,
  TabsUi
} from '@soybeanjs/headless/tabs';
import type { ThemeSize } from '@/theme';
import type { TabsFill } from './variants';

export interface TabsProps<T extends TabsOptionData = TabsOptionData> extends TabsCompactProps<T> {
  class?: ClassValue;
  size?: ThemeSize;
  /** Styled tabs ui slots, including `indicatorContent` for the compact indicator body. */
  ui?: Partial<TabsUi>;
  fill?: TabsFill;
}

export type TabsEmits<T extends AcceptableValue = AcceptableValue> = TabsCompactEmits<T>;

export type TabsSlots<T extends TabsOptionData = TabsOptionData> = TabsCompactSlots<T>;

export type { TabsOptionData } from '@soybeanjs/headless/tabs';
