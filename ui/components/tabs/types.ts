import type {
  AcceptableValue,
  ClassValue,
  DefinedValue,
  TabsContentProps,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootEmits,
  TabsRootProps,
  TabsThemeSlot,
  TabsTriggerProps
} from '@headless';
import type { ThemeSize } from '@theme';
import type { TabsFill } from '@variants/tabs';

export interface TabsOptionData<T extends DefinedValue = DefinedValue> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type TabsUi = Partial<Record<TabsThemeSlot | 'indicatorContent', ClassValue>>;

export interface TabsProps<
  T extends AcceptableValue,
  S extends TabsOptionData<NonNullable<T>> = TabsOptionData<NonNullable<T>>
> extends TabsRootProps<T> {
  size?: ThemeSize;
  ui?: TabsUi;
  items: S[];
  fill?: TabsFill;
  enableIndicator?: boolean;
  listProps?: TabsListProps;
  triggerProps?: TabsTriggerProps;
  contentProps?: TabsContentProps;
  indicatorProps?: TabsIndicatorProps;
}

export type TabsEmits<T = AcceptableValue> = TabsRootEmits<T>;
