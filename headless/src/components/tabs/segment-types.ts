import type { AcceptableValue, DefinedValue } from '../../types';
import type { TabsIndicatorProps, TabsListProps, TabsOptionData, TabsRootEmits, TabsRootProps, TabsTriggerProps } from './types';

export type SegmentOptionData<T extends DefinedValue = DefinedValue> = TabsOptionData<T>;

export interface SegmentCompactProps<
  T extends AcceptableValue = AcceptableValue,
  S extends SegmentOptionData<NonNullable<T>> = SegmentOptionData<NonNullable<T>>
> extends TabsRootProps<T> {
  items: S[];
  enableIndicator?: boolean;
  listProps?: TabsListProps;
  triggerProps?: TabsTriggerProps;
  indicatorProps?: TabsIndicatorProps;
}

export type SegmentCompactEmits<T = AcceptableValue> = TabsRootEmits<T>;

export type SegmentCompactItemSlotProps<S extends SegmentOptionData = SegmentOptionData> = S & {
  active: boolean;
};

export type SegmentCompactSlots<S extends SegmentOptionData = SegmentOptionData> = {
  item?: (props: SegmentCompactItemSlotProps<S>) => any;
  indicator?: () => any;
};
