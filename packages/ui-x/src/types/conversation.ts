/**
 * A conversation entry in the sidebar list.
 */
export interface ConversationItem {
  /** Unique identifier. */
  id: string;
  /** Display title. */
  title: string;
  /** Optional grouping key. */
  group?: string;
  /** Optional last-updated timestamp (ms). */
  updatedAt?: number;
}
