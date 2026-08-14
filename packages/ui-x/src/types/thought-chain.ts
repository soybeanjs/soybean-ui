/**
 * A single reasoning step in a thought chain.
 */
export interface ThoughtChainItem {
  /** Unique key. */
  key: string;
  /** Step title. */
  title: string;
  /** Lifecycle status. */
  status?: 'pending' | 'loading' | 'success' | 'error';
  /** Optional body / description. */
  content?: string;
  /** Optional icon hint. */
  icon?: string;
}
