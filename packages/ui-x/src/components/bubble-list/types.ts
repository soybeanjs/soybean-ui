import type { ChatMessage } from '../../types';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxBubbleList component.
 */
export interface BubbleListProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The message list to render.
   */
  items: ChatMessage[];
  /**
   * Whether the container has a constrained height and should be scrollable.
   * When `false`, the list grows to fit its content.
   */
  scrollable?: boolean;
  /**
   * Distance (px) from the bottom considered "at bottom". Defaults to `40`.
   */
  scrollThreshold?: number;
  /**
   * Whether to show the "back to bottom" button. Defaults to `true`.
   */
  showBackToBottom?: boolean;
}
