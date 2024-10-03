import type { TabsRootEmits as SegmentRootEmits, TabsListProps, TabsRootProps, TabsTriggerProps } from 'radix-vue';
import type { ClassValue, ClassValueProp, StringOrNumber } from '../../types';

export type SegmentRootProps<T extends StringOrNumber = StringOrNumber> = ClassValueProp &
  Omit<TabsRootProps<T>, 'as' | 'asChild'>;

export type SegmentTriggerRootProps = ClassValueProp & Pick<TabsListProps, 'loop'>;

export type SegmentTriggerProps = ClassValueProp & Pick<TabsTriggerProps, 'value' | 'disabled'>;

export type SegmentIndicatorRootProps = ClassValueProp;

export type SegmentIndicatorProps = ClassValueProp;

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

export type SegmentEmits<T extends StringOrNumber = StringOrNumber> = SegmentRootEmits<T>;

export type { SegmentRootEmits };
