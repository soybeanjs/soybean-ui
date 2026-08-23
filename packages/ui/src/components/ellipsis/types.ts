import type { EllipsisRootProps, EllipsisRootEmits, EllipsisSlotProps } from '@soybeanjs/headless/ellipsis';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the Ellipsis component.
 */
export interface EllipsisProps extends EllipsisRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Text shown in the overflow tooltip. Defaults to the text content of the root.
   */
  tooltipContent?: string;
}

/**
 * Events for the Ellipsis component.
 */
export type EllipsisEmits = EllipsisRootEmits;

/**
 * Slots for the Ellipsis component.
 */
export type EllipsisSlots = {
  /**
   * Default slot. Receives the same slot props as the headless root.
   */
  default?: (props: EllipsisSlotProps) => any;
};
