/**
 * A referenced source / citation.
 */
export interface Source {
  /** Unique key. */
  key: string;
  /** Display title. */
  title: string;
  /** Optional URL. */
  url?: string;
  /** Optional publisher / author. */
  author?: string;
}
