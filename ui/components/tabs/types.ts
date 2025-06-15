import type {
  AcceptableValue,
  ClassValue,
  TabsActivationMode,
  TabsContentProps,
  TabsRootEmits as TabsEmits,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootEmits,
  TabsRootProps,
  TabsSlot,
  TabsTriggerProps
} from '@headless';
import type { ThemeSize } from '@theme';
import type { TabsFill } from '@variants/tabs';

export interface TabsOptionData<T extends NonNullable<AcceptableValue> = NonNullable<AcceptableValue>> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type TabsUi = Partial<Record<TabsSlot | 'indicatorContent', ClassValue>>;

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

export type {
  TabsEmits,
  TabsRootProps,
  TabsRootEmits,
  TabsContentProps,
  TabsIndicatorProps,
  TabsListProps,
  TabsTriggerProps,
  TabsSlot,
  TabsActivationMode
};
