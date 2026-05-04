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

/**
 * Properties for the segment compact component.
 */
export interface SegmentCompactProps<T extends SegmentOptionData> extends SegmentRootProps<T['value'] | null> {
  /**
   * Items rendered by the component.
   */
  items: T[];
  /**
   * Whether to enable indicator.
   */
  enableIndicator?: boolean;
  /**
   * Properties forwarded to the list element.
   */
  listProps?: SegmentListProps;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: SegmentTriggerProps;
  /**
   * Properties forwarded to the indicator element.
   */
  indicatorProps?: SegmentIndicatorProps;
}

/**
 * Events for the segment compact component.
 */
export type SegmentCompactEmits<T extends AcceptableValue = AcceptableValue> = SegmentRootEmits<T>;

/**
 * Slots for the segment compact component.
 */
export type SegmentCompactSlots<T extends SegmentOptionData = SegmentOptionData> = {
  /**
   * Custom content for the item slot.
   */
  item?: (props: T & { active: boolean }) => any;
  /**
   * Custom content for the indicator slot.
   */
  indicator?: () => any;
};

/**
 * Available UI slots for the segment component.
 */
export type SegmentUiSlot = Exclude<TabsUiSlot, 'content'>;

/**
 * UI class overrides for the segment component.
 */
export type SegmentUi = UiClass<SegmentUiSlot>;

export type {
  SegmentIndicatorProps,
  SegmentListProps,
  SegmentOptionData,
  SegmentRootEmits,
  SegmentRootProps,
  SegmentTriggerProps
};
