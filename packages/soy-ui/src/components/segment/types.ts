import type {
  ClassValue,
  ClassValueProp,
  TabsRootEmits as SegmentRootEmits,
  TabsRootProps as SegmentRootProps,
  StringOrNumber,
  TabsListProps,
  TabsTriggerProps
} from '@soybean-ui/primitives';
import type { SegmentSlots, ThemeOrientation, ThemeSize } from '@soybean-ui/variants';

export interface SegmentListProps extends TabsListProps {
  size?: ThemeSize;
  orientation?: ThemeOrientation;
}

export interface SegmentTriggerProps extends TabsTriggerProps {
  size?: ThemeSize;
  enableIndicator?: boolean;
}

export interface SegmentIndicatorRootProps extends ClassValueProp {
  size?: ThemeSize;
  orientation?: ThemeOrientation;
}

export interface SegmentIndicatorProps extends ClassValueProp {
  orientation?: ThemeOrientation;
}

export type SegmentOptionData<T extends StringOrNumber = StringOrNumber> = Pick<SegmentTriggerProps, 'disabled'> & {
  value: T;
  label: string;
};

export type SegmentUi = Partial<Record<SegmentSlots, ClassValue>>;

export type SegmentProps<T extends SegmentOptionData> = SegmentRootProps<T['value']> &
  SegmentListProps & {
    ui?: SegmentUi;
    items: T[];
    enableIndicator?: boolean;
  };

export type SegmentEmits<T extends StringOrNumber = StringOrNumber> = SegmentRootEmits<T>;

export type { SegmentRootProps, SegmentRootEmits };
