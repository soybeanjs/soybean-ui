import type {
  TabsContentProps as $TabsContentProps,
  TabsListProps as $TabsListProps,
  TabsRootProps as $TabsRootProps,
  TabsTriggerProps as $TabsTriggerProps
} from 'radix-vue';
import type { ClassValue, StringOrNumber } from '../../types';

export type TabsRootProps<T extends StringOrNumber = StringOrNumber> = Omit<$TabsRootProps<T>, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type TabsListProps = Omit<$TabsListProps, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type TabsTriggerProps = Omit<$TabsTriggerProps, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type TabsIndicatorProps = {
  class?: ClassValue;
};

export type TabsIndicatorSlotProps = {
  class?: ClassValue;
};

export type TabsContentProps = Omit<$TabsContentProps, 'as' | 'asChild'> & {
  class?: ClassValue;
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
    indicatorClass?: ClassValue;
    indicatorSlotClass?: ClassValue;
    forceMountContent?: boolean;
    contentClass?: ClassValue;
  };
