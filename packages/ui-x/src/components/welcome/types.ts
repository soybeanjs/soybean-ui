import type { Prompt } from '../../types';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxWelcome component.
 */
export interface WelcomeProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Greeting title.
   */
  title?: string;
  /**
   * Description text.
   */
  description?: string;
  /**
   * Recommended prompts to show below the copy.
   */
  prompts?: Prompt[];
  /**
   * Emitted when a prompt is clicked.
   */
  onSelectPrompt?: (prompt: Prompt) => void;
}
