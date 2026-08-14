import type { SenderSuggestion } from '../../composables';
import type { Attachment } from '../../types';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxSender component.
 */
export interface SenderProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Placeholder text. Defaults to an empty string.
   */
  placeholder?: string;
  /**
   * Slash (`/`) command suggestions.
   */
  slashSuggestions?: SenderSuggestion[];
  /**
   * Mention (`@`) suggestions.
   */
  mentionSuggestions?: SenderSuggestion[];
  /**
   * Whether the send action is disabled (e.g. while a request is in flight).
   */
  loading?: boolean;
  /**
   * Whether to disable the whole input.
   */
  disabled?: boolean;
  /**
   * Attachments to show above the input.
   */
  attachments?: Attachment[];
  /**
   * Textarea rows. Defaults to `3`.
   */
  rows?: number;
  /**
   * Submit behavior. Defaults to `enter` (`shiftEnter` requires Shift+Enter).
   */
  submitType?: 'enter' | 'shiftEnter';
}
