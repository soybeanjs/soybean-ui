import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { DataOrientation, Direction } from '../../types';

// RovingFocusGroup
export interface RovingFocusGroupProps {
  /** The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: DataOrientation;
  /** The direction of navigation between items. */
  dir?: Direction;
  /**
   * Whether keyboard navigation should loop around
   *
   * @defaultValue false
   */
  loop?: boolean;
  currentTabStopId?: string | null;
  defaultCurrentTabStopId?: string;
  preventScrollOnEntryFocus?: boolean;
}

export type RovingFocusGroupPropsWithPrimitive = RovingFocusGroupProps & PrimitiveProps;

export interface RovingFocusGroupEmits {
  entryFocus: [event: Event];
  'update:currentTabStopId': [value: string | null | undefined];
}

// RovingFocusGroup Context
export interface RovingFocusGroupContextParams {
  orientation: Ref<DataOrientation | undefined>;
  dir: Ref<Direction>;
  loop: Ref<boolean>;
  currentTabStopId: Ref<string | null | undefined>;
  focusableItemsCount: Ref<number>;
  isTabbingBackOut: Ref<boolean>;
}

export interface RovingFocusGroupContext extends RovingFocusGroupContextParams {
  onItemFocus: (tabStopId: string) => void;
  onItemShiftTab: () => void;
  onFocusableItemAdd: () => void;
  onFocusableItemRemove: () => void;
}

// RovingFocusItem
export interface RovingFocusItemProps {
  tabStopId?: string;
  focusable?: boolean;
  active?: boolean;
  allowShiftKey?: boolean;
}

export type RovingFocusItemPropsWithPrimitive = RovingFocusItemProps & PrimitiveProps;
