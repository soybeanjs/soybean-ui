import type { ClassValue } from '@soybeanjs/headless/types';
import type { Prompt } from '../../types';

/**
 * Properties for the SxPrompts component.
 */
export interface PromptsProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The prompts to display.
   */
  prompts: Prompt[];
  /**
   * Emitted when a prompt is clicked.
   */
  onSelect?: (prompt: Prompt) => void;
}
