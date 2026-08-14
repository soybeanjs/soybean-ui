import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxActionsCopy component.
 */
export interface ActionsCopyProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The text to copy. Falls back to the default slot content.
   */
  text?: string;
  /**
   * Accessible label.
   */
  label?: string;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Emitted after a copy attempt, with the copied text.
   */
  onCopy?: (text: string) => void;
}
