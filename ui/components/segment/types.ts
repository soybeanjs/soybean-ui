import type {
  AcceptableValue,
  ClassValue,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootProps,
  TabsSlot,
  TabsTriggerProps
} from '@headless';
import type { ThemeSize } from '@theme';
import type { TabsFill as SegmentFill, TabsShape as SegmentShape } from '@variants/tabs';

export interface SegmentOptionData<T extends NonNullable<AcceptableValue> = NonNullable<AcceptableValue>> {
  value: T;
  label: string;
  disabled?: boolean;
}

type SegmentUi = Partial<Record<TabsSlot | 'indicatorContent', ClassValue>>;

export interface SegmentProps<
  T extends AcceptableValue,
  S extends SegmentOptionData<NonNullable<T>> = SegmentOptionData<NonNullable<T>>
> extends TabsRootProps<T> {
  ui?: SegmentUi;
  size?: ThemeSize;
  shape?: SegmentShape;
  items: S[];
  fill?: SegmentFill;
  enableIndicator?: boolean;
  listProps?: TabsListProps;
  triggerProps?: TabsTriggerProps;
  indicatorProps?: TabsIndicatorProps;
}
