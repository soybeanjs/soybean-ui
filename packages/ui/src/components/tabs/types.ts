import type {
  TabsRootEmits,
  TabsContentProps as _TabsContentProps,
  TabsListProps as _TabsListProps,
  TabsRootProps as _TabsRootProps,
  TabsTriggerProps as _TabsTriggerProps
} from 'radix-vue';
import type { ClassValue, ClassValueProp, StringOrNumber, ThemeOrientation } from '../../types';

export type TabsRootProps<T extends StringOrNumber = StringOrNumber> = ClassValueProp &
  Omit<_TabsRootProps<T>, 'as' | 'asChild'>;

export type TabsListProps = ClassValueProp &
  Pick<_TabsListProps, 'loop'> & {
    orientation?: ThemeOrientation;
  };

export type TabsTriggerProps = ClassValueProp &
  Pick<_TabsTriggerProps, 'value' | 'disabled'> & {
    orientation?: ThemeOrientation;
    enableIndicator?: boolean;
  };

export type TabsIndicatorRootProps = ClassValueProp & {
  orientation?: ThemeOrientation;
};

export type TabsIndicatorProps = ClassValueProp & {
  orientation?: ThemeOrientation;
};

export type TabsContentProps = ClassValueProp &
  Pick<_TabsContentProps, 'value' | 'forceMount'> & {
    orientation?: ThemeOrientation;
  };

export type TabsOption<T extends StringOrNumber = StringOrNumber> = Pick<TabsTriggerProps, 'disabled'> & {
  value: T;
  label: string;
};

export type TabsProps<T extends TabsOption> = TabsRootProps<T['value']> &
  TabsListProps & {
    options: T[];
    listClass?: ClassValue;
    triggerClass?: ClassValue;
    enableIndicator?: boolean;
    indicatorRootClass?: ClassValue;
    indicatorClass?: ClassValue;
    forceMountContent?: boolean;
    contentClass?: ClassValue;
  };

export type TabsEmits<T extends StringOrNumber = StringOrNumber> = TabsRootEmits<T>;

export type { TabsRootEmits };
