import type {
  ClassValue,
  ClassValueProp,
  StringOrNumber,
  TabsRootEmits,
  TabsRootProps,
  TabsContentProps as _TabsContentProps,
  TabsListProps as _TabsListProps,
  TabsTriggerProps as _TabsTriggerProps
} from '@soybean-ui/primitives';
import type { TabsSlots, ThemeOrientation } from '@soybean-ui/variants';

export interface TabsListProps extends _TabsListProps {
  orientation?: ThemeOrientation;
}

export interface TabsTriggerProps extends _TabsTriggerProps {
  orientation?: ThemeOrientation;
  enableIndicator?: boolean;
}

export interface TabsIndicatorRootProps extends ClassValueProp {
  orientation?: ThemeOrientation;
}

export interface TabsIndicatorProps extends ClassValueProp {
  orientation?: ThemeOrientation;
}

export interface TabsContentProps extends _TabsContentProps {
  orientation?: ThemeOrientation;
}

export type TabsOption<T extends StringOrNumber = StringOrNumber> = Pick<TabsTriggerProps, 'disabled'> & {
  value: T;
  label: string;
};

export type TabsUi = Partial<Record<TabsSlots, ClassValue>>;

export type TabsProps<T extends TabsOption> = TabsRootProps<T['value']> &
  TabsListProps & {
    ui?: TabsUi;
    items: T[];
    enableIndicator?: boolean;
    forceMountContent?: boolean;
  };

export type TabsEmits<T extends StringOrNumber = StringOrNumber> = TabsRootEmits<T>;

export type { TabsRootProps, TabsRootEmits };
