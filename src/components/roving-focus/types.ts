import type { HTMLAttributes } from 'vue';
import type { DataOrientation, Direction, EmitsToHookProps, PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface RovingFocusGroupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
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
  /** The controlled value of the current stop item. Can be bound as `v-model`. */
  currentTabStopId?: string | null;
  /**
   * The value of the current stop item.
   *
   * Use when you do not need to control the state of the stop item.
   */
  defaultCurrentTabStopId?: string;
  /** When `true`, will prevent scrolling to the focus item when focused. */
  preventScrollOnEntryFocus?: boolean;
}

export type RovingFocusGroupEmits = {
  entryFocus: [event: Event];
  'update:currentTabStopId': [value: string | null | undefined];
};

export interface RovingFocusItemProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  tabStopId?: string;
  /**
   * When `false`, item will not be focusable.
   *
   * @defaultValue `true`
   */
  focusable?: boolean;
  /** When `true`, item will be initially focused. */
  active?: boolean;
  /** When `true`, shift + arrow key will allow focusing on next/previous item. */
  allowShiftKey?: boolean;
  /** Additional data to be passed to the collection item. */
  itemData?: Record<string, any>;
}

export type RovingFocusGroupContextParams = PropsToContext<
  RovingFocusGroupProps,
  'orientation' | 'dir' | 'loop' | 'currentTabStopId' | 'defaultCurrentTabStopId' | 'preventScrollOnEntryFocus'
> &
  EmitsToHookProps<RovingFocusGroupEmits>;

export type RovingFocusItemOptions = Partial<
  PropsToContext<RovingFocusItemProps, 'tabStopId' | 'focusable' | 'active' | 'allowShiftKey' | 'itemData'>
>;
