import type { ClassValue } from '@soybeanjs/headless/types';
import type { ConversationItem } from '../../types';

/**
 * Properties for the SxConversations component.
 */
export interface ConversationsProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The conversation list to display.
   */
  items: ConversationItem[];
  /**
   * The currently active conversation id.
   */
  active?: string | null;
  /**
   * Emitted when a conversation is selected.
   */
  onChange?: (item: ConversationItem) => void;
}
