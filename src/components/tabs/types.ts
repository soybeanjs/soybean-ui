import type {
  AcceptableValue,
  ClassValue
} from '@soybeanjs/headless';
import type { TabsCompactEmits, TabsCompactProps, TabsCompactSlots, TabsOptionData, TabsUi } from '@soybeanjs/headless/tabs';
import type { ThemeSize } from '@/theme';
import type { TabsFill } from './variants';

export interface TabsProps<
  T extends AcceptableValue,
  S extends TabsOptionData<NonNullable<T>> = TabsOptionData<NonNullable<T>>
> extends TabsCompactProps<T, S> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TabsUi>;
  fill?: TabsFill;
}

export type TabsEmits<T = AcceptableValue> = TabsCompactEmits<T>;

export type TabsSlots<S extends TabsOptionData = TabsOptionData> = TabsCompactSlots<S>;

export type { TabsOptionData } from '@soybeanjs/headless/tabs';
