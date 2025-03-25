import type {
  ClassValue,
  ClassValueProp,
  StringOrNumber,
  TabsRootEmits,
  TabsContentProps as _TabsContentProps,
  TabsListProps as _TabsListProps,
  TabsRootProps as _TabsRootProps,
  TabsTriggerProps as _TabsTriggerProps
} from '@soybean-ui/primitives';
import type { TabsFill, TabsSlots, ThemeOrientation, ThemeSize } from '@soybean-ui/variants';

export interface TabsRootProps<T extends StringOrNumber = StringOrNumber> extends _TabsRootProps<T> {
  fill?: TabsFill;
}

export interface TabsListProps extends _TabsListProps {
  size?: ThemeSize;
  orientation?: ThemeOrientation;
}

export interface TabsTriggerProps extends _TabsTriggerProps {
  size?: ThemeSize;
  enableIndicator?: boolean;
}

export interface TabsIndicatorRootProps extends ClassValueProp {
  size?: ThemeSize;
  orientation?: ThemeOrientation;
}

export interface TabsIndicatorProps extends ClassValueProp {
  orientation?: ThemeOrientation;
}

export interface TabsContentProps extends _TabsContentProps {
  size?: ThemeSize;
  orientation?: ThemeOrientation;
}

export type TabsOptionData<T extends StringOrNumber = StringOrNumber> = Pick<TabsTriggerProps, 'disabled'> & {
  value: T;
  label: string;
};

export type TabsUi = Partial<Record<TabsSlots, ClassValue>>;

export type TabsProps<T extends TabsOptionData> = TabsRootProps<T['value']> &
  TabsListProps & {
    ui?: TabsUi;
    items: T[];
    enableIndicator?: boolean;
    forceMountContent?: boolean;
  };

export type TabsEmits<T extends StringOrNumber = StringOrNumber> = TabsRootEmits<T>;

export type { TabsRootEmits };
