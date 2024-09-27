import type { TabsRootEmits as SegmentRootEmits, TabsListProps, TabsRootProps, TabsTriggerProps } from 'radix-vue';
import type { ClassValue, StringOrNumber } from '../../types';

export type SegmentRootProps<T extends StringOrNumber = StringOrNumber> = Omit<TabsRootProps<T>, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type SegmentTriggerRootProps = Omit<TabsListProps, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type SegmentTriggerProps = Omit<TabsTriggerProps, 'as' | 'asChild'> & {
  class?: ClassValue;
};

export type SegmentIndicatorRootProps = {
  class?: ClassValue;
};

export type SegmentIndicatorProps = {
  class?: ClassValue;
};

export type SegmentOption<T extends StringOrNumber = StringOrNumber> = Pick<SegmentTriggerProps, 'disabled'> & {
  value: T;
  label: string;
};

export type SegmentProps<T extends SegmentOption> = SegmentRootProps<T['value']> &
  SegmentTriggerRootProps & {
    options: T[];
    triggerRootClass?: ClassValue;
    triggerClass?: ClassValue;
    indicatorRootClass?: ClassValue;
    indicatorClass?: ClassValue;
  };

export type { SegmentRootEmits };
