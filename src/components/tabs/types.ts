import type {
  AcceptableValue,
  ClassValue,
  DefinedValue,
  TabsContentProps,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootEmits,
  TabsRootProps,
  TabsTriggerProps,
  TabsUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { TabsFill } from './variants';

export interface TabsOptionData<T extends DefinedValue = DefinedValue> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type TabsExtraUiSlot = 'indicatorContent';

export type TabsExtendedUi = TabsUi & Record<TabsExtraUiSlot, ClassValue>;

export interface TabsProps<
  T extends AcceptableValue,
  S extends TabsOptionData<NonNullable<T>> = TabsOptionData<NonNullable<T>>
> extends TabsRootProps<T> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TabsExtendedUi>;
  items: S[];
  fill?: TabsFill;
  enableIndicator?: boolean;
  listProps?: TabsListProps;
  triggerProps?: TabsTriggerProps;
  contentProps?: TabsContentProps;
  indicatorProps?: TabsIndicatorProps;
}

export type TabsEmits<T = AcceptableValue> = TabsRootEmits<T>;
