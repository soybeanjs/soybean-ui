/**
 * A suggested prompt / question shown on welcome or suggestion surfaces.
 */
export interface Prompt {
  /** Unique key. */
  key: string;
  /** Display label / question text. */
  label: string;
  /** Optional icon hint. */
  icon?: string;
  /** Optional description. */
  description?: string;
}
