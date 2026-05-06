import type { BaseProps, DataOrientation, Direction, EmitsToHookProps, PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the RovingFocusGroup component.
 */
export interface RovingFocusGroupProps extends PrimitiveProps, BaseProps {
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

/**
 * Events for the RovingFocusGroup component.
 */
export type RovingFocusGroupEmits = {
  /**
   * Emitted when entry focus occurs.
   */
  entryFocus: [event: Event];
  /**
   * Emitted when the current tab stop id value changes.
   */
  'update:currentTabStopId': [value: string | null | undefined];
};

/**
 * Properties for the RovingFocusItem component.
 */
export interface RovingFocusItemProps extends PrimitiveProps, BaseProps {
  /**
   * Tab stop id.
   */
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

/**
 * Parameters used to create the RovingFocusGroup context.
 */
export type RovingFocusGroupContextParams = PropsToContext<
  RovingFocusGroupProps,
  'orientation' | 'dir' | 'loop' | 'currentTabStopId' | 'defaultCurrentTabStopId' | 'preventScrollOnEntryFocus'
> &
  EmitsToHookProps<RovingFocusGroupEmits>;

/**
 * Type information for UseRovingFocusItemOptions.
 */
export type UseRovingFocusItemOptions = Partial<
  PropsToContext<RovingFocusItemProps, 'tabStopId' | 'focusable' | 'active' | 'allowShiftKey' | 'itemData'>
>;
