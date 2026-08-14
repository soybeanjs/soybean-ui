import type { MessageStatus } from './message-status';

/**
 * The role of a chat message. Any custom string is allowed; the common roles are
 * `ai`, `user`, `system` and `divider`.
 */
export type ChatRole = 'ai' | 'user' | 'system' | 'divider' | (string & {});

/**
 * The canonical message model shared across @soybeanjs/ui-x components.
 *
 * `content` is mutated in place while a streaming assistant message is
 * receiving tokens, and `status` tracks the request lifecycle.
 */
export interface ChatMessage {
  /** Unique message identifier. */
  id: string;
  /** The authoring role. */
  role: ChatRole;
  /** Text content. */
  content: string;
  /** The current lifecycle status. */
  status?: MessageStatus;
  /** Arbitrary extra metadata (token usage, reasoning, source citations...). */
  extraInfo?: Record<string, unknown>;
}
