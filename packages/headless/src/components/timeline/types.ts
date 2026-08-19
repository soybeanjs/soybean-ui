import type { ComputedRef } from 'vue';
import type { BaseProps, Direction, UiClass } from '../../types';

/**
 * The layout orientation of a timeline.
 */
export type TimelineOrientation = 'vertical' | 'horizontal';

/**
 * The item placement mode of a vertical timeline.
 */
export type TimelineMode = 'left' | 'right' | 'alternate';

/**
 * The resolved side of an item in a vertical timeline.
 */
export type TimelinePosition = 'left' | 'right';

/**
 * Properties for the TimelineRoot component.
 */
export interface TimelineRootProps extends BaseProps {
  /**
   * The layout orientation of the timeline.
   *
   * @default 'vertical'
   */
  orientation?: TimelineOrientation;
  /**
   * The item placement mode. Only applies to the vertical orientation.
   *
   * @default 'left'
   */
  mode?: TimelineMode;
  /**
   * Reverse the visual order of the items.
   */
  reverse?: boolean;
  /**
   * The reading direction of the timeline.
   */
  dir?: Direction;
}

/**
 * Properties for the TimelineItem component.
 */
export interface TimelineItemProps extends BaseProps {
  /**
   * The color of the dot marker. Accepts a theme color key or any CSS color.
   */
  color?: string;
  /**
   * Timestamp or label text rendered in the label column.
   */
  label?: string;
}

/**
 * Properties for the TimelineSeparator component.
 */
export interface TimelineSeparatorProps extends BaseProps {}

/**
 * Properties for the TimelineDot component.
 */
export interface TimelineDotProps extends BaseProps {}

/**
 * Properties for the TimelineContent component.
 */
export interface TimelineContentProps extends BaseProps {}

/**
 * Context for the TimelineRoot component.
 */
export interface TimelineRootContext {
  /** The layout orientation. */
  orientation: ComputedRef<TimelineOrientation>;
  /** The item placement mode. */
  mode: ComputedRef<TimelineMode>;
  /** Whether the items are reversed. */
  reverse: ComputedRef<boolean>;
  /** The reading direction. */
  dir: ComputedRef<Direction>;
  /** Register a child item and return its zero-based index. */
  registerItem: () => number;
}

/**
 * Available UI slots for the Timeline component.
 */
export type TimelineUiSlot = 'root' | 'item' | 'label' | 'separator' | 'dot' | 'content';

/**
 * UI class overrides for the Timeline component.
 */
export type TimelineUi = UiClass<TimelineUiSlot>;
