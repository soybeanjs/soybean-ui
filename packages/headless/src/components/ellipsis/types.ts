import type { ShallowRef } from 'vue';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * Properties for the EllipsisRoot component.
 */
export interface EllipsisRootProps extends PrimitiveWithBaseProps {
  /**
   * The maximum number of lines to display before truncation.
   *
   * @default 1
   */
  lines?: number;
  /**
   * Whether clicking the text toggles between collapsed and expanded.
   */
  expandable?: boolean;
  /**
   * The controlled expanded state of the content.
   */
  expanded?: boolean;
  /**
   * The initial expanded state when uncontrolled.
   */
  defaultExpanded?: boolean;
  /**
   * Whether a tooltip should reveal the full text when the content overflows.
   *
   * @default true
   */
  tooltip?: boolean;
}

/**
 * Events for the EllipsisRoot component.
 */
export type EllipsisRootEmits = {
  /**
   * Emitted when the expanded state changes.
   */
  'update:expanded': [value: boolean];
};

/**
 * Slot props exposed by the EllipsisRoot default slot.
 */
export interface EllipsisSlotProps {
  /**
   * Whether the content currently overflows the configured line clamp.
   */
  overflowed: boolean;
  /**
   * Whether the content is expanded.
   */
  expanded: boolean;
  /**
   * The plain text content of the root element.
   */
  text: string;
  /**
   * Toggles between expanded and collapsed.
   */
  toggle: () => void;
  /**
   * Whether tooltip display is enabled.
   */
  tooltip: boolean;
}

/**
 * Values exposed by the EllipsisRoot instance for wrapper access.
 */
export interface EllipsisExpose {
  /** Whether the content overflows the clamp. */
  overflowed: ShallowRef<boolean>;
  /** Whether the content is expanded. */
  expanded: ShallowRef<boolean>;
  /** The plain text content of the root. */
  text: ShallowRef<string>;
}
