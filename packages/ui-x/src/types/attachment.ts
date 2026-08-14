/**
 * The kind of an attached file, used to pick a representative icon.
 */
export type AttachmentKind = 'file' | 'image' | 'video' | 'audio' | 'link' | 'database' | 'unknown';

/**
 * A single attachment (file / image / link) associated with a chat message.
 */
export interface Attachment {
  /** Unique identifier. */
  id: string;
  /** Display name. */
  name: string;
  /** The kind used for icon selection. */
  kind?: AttachmentKind;
  /** Human-readable size, e.g. `"1.2 MB"`. */
  size?: string;
  /** Source URL (for images / links). */
  url?: string;
  /** MIME type, when known. */
  mimeType?: string;
  /** Arbitrary extra metadata. */
  extraInfo?: Record<string, unknown>;
}
