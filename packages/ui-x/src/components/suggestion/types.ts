import type { Prompt } from '../../types';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxSuggestion component.
 */
export interface SuggestionProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The suggestions to display.
   */
  suggestions: Prompt[];
  /**
   * Emitted when a suggestion is clicked.
   */
  onSelect?: (suggestion: Prompt) => void;
}
