import type {
  ClassValue,
  ClassValueProp,
  TabsRootEmits as SegmentRootEmits,
  TabsRootProps as SegmentRootProps,
  TabsTriggerProps as SegmentTriggerProps,
  TabsListProps as SegmentTriggerRootProps,
  StringOrNumber
} from '@soybean-ui/primitive';

export type SegmentIndicatorRootProps = ClassValueProp;

export type SegmentIndicatorProps = ClassValueProp;

export type SegmentOption<T extends StringOrNumber = StringOrNumber> = Pick<SegmentTriggerProps, 'disabled'> & {
  value: T;
  label: string;
};

export type SegmentProps<T extends SegmentOption> = SegmentRootProps<T['value']> &
  SegmentTriggerRootProps & {
    items: T[];
    triggerRootClass?: ClassValue;
    triggerClass?: ClassValue;
    indicatorRootClass?: ClassValue;
    indicatorClass?: ClassValue;
  };

export type SegmentEmits<T extends StringOrNumber = StringOrNumber> = SegmentRootEmits<T>;

export type { SegmentRootProps, SegmentRootEmits, SegmentTriggerRootProps, SegmentTriggerProps };
