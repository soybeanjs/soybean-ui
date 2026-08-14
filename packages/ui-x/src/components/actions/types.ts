import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * A single action shown in the SxActions toolbar.
 */
export interface ActionItem {
  /** Unique key. */
  key: string;
  /** Accessible label / tooltip text. */
  label: string;
  /** Optional icon hint. */
  icon?: string;
  /** Whether the action is disabled. */
  disabled?: boolean;
}

/**
 * Properties for the SxActions component.
 */
export interface ActionsProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The actions to display.
   */
  items?: ActionItem[];
}
