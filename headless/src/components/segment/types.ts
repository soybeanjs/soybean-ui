import type { AcceptableValue, UiClass } from '../../types';
import type {
  TabsIndicatorProps as SegmentIndicatorProps,
  TabsListProps as SegmentListProps,
  TabsOptionData as SegmentOptionData,
  TabsRootEmits as SegmentRootEmits,
  TabsRootProps as SegmentRootProps,
  TabsTriggerProps as SegmentTriggerProps,
  TabsUiSlot
} from '../tabs/types';

export interface SegmentCompactProps<T extends SegmentOptionData> extends SegmentRootProps<T['value'] | null> {
  items: T[];
  enableIndicator?: boolean;
  listProps?: SegmentListProps;
  triggerProps?: SegmentTriggerProps;
  indicatorProps?: SegmentIndicatorProps;
}

export type SegmentCompactEmits<T extends AcceptableValue = AcceptableValue> = SegmentRootEmits<T>;

export type SegmentCompactSlots<T extends SegmentOptionData = SegmentOptionData> = {
  item?: (props: T & { active: boolean }) => any;
  indicator?: () => any;
};

export type SegmentUiSlot = Exclude<TabsUiSlot, 'content'>;

export type SegmentUi = UiClass<SegmentUiSlot>;

export type {
  SegmentIndicatorProps,
  SegmentListProps,
  SegmentOptionData,
  SegmentRootEmits,
  SegmentRootProps,
  SegmentTriggerProps
};
