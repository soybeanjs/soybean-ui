import type {
  TimelineRootProps,
  TimelineUi,
  TimelineItemProps as _TimelineItemProps
} from '@soybeanjs/headless/timeline';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the Timeline component.
 */
export interface TimelineProps extends TimelineRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<TimelineUi>;
}

/**
 * Properties for the TimelineItem component.
 */
export interface TimelineItemProps extends _TimelineItemProps {}
