import type { ChatMessage, ChatRole } from '../../types';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@soybeanjs/ui';

/**
 * Properties for the SxBubble component.
 */
export interface BubbleProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The message to render. When omitted, `content` / `role` props are used.
   */
  message?: ChatMessage;
  /**
   * Message text content (used when `message` is not provided).
   */
  content?: string;
  /**
   * Message role (used when `message` is not provided).
   */
  role?: ChatRole;
  /**
   * Message placement.
   */
  placement?: 'start' | 'end';
  /**
   * Visual variant.
   */
  variant?: 'filled' | 'outlined' | 'shadow';
  /**
   * Avatar size.
   */
  avatarSize?: ThemeSize;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Enable a typewriter / fade-in effect on the content.
   */
  typing?: boolean;
}
