import type {
  ClassValue,
  ClassValueProp,
  TabsRootEmits as SegmentRootEmits,
  TabsRootProps as SegmentRootProps,
  TabsTriggerProps as SegmentTriggerProps,
  TabsListProps as SegmentTriggerRootProps,
  StringOrNumber
} from '@soybean-ui/primitives';
import type { SegmentSlots } from '@soybean-ui/variants';

export type SegmentIndicatorRootProps = ClassValueProp;

export type SegmentIndicatorProps = ClassValueProp;

export type SegmentOptionData<T extends StringOrNumber = StringOrNumber> = Pick<SegmentTriggerProps, 'disabled'> & {
  value: T;
  label: string;
};

export type SegmentUi = Partial<Record<SegmentSlots, ClassValue>>;

export type SegmentProps<T extends SegmentOptionData> = SegmentRootProps<T['value']> &
  SegmentTriggerRootProps & {
    ui?: SegmentUi;
    items: T[];
  };

export type SegmentEmits<T extends StringOrNumber = StringOrNumber> = SegmentRootEmits<T>;

export type { SegmentRootProps, SegmentRootEmits, SegmentTriggerRootProps, SegmentTriggerProps };
