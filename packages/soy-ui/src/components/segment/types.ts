import type {
  ClassValue,
  ClassValueProp,
  TabsRootEmits as SegmentRootEmits,
  StringOrNumber,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps
} from '@soybean-ui/primitives';
import type { TabsSlots, ThemeOrientation, ThemeSize } from '@soybean-ui/variants';

type SegmentSlots = Exclude<TabsSlots, 'content'>;

export interface SegmentRootProps<T extends StringOrNumber = StringOrNumber> extends TabsRootProps<T> {
  size?: ThemeSize;
}

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
  size?: ThemeSize;
  ui?: Pick<SegmentUi, 'indicator' | 'indicatorRoot'>;
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

export type { SegmentRootEmits };
