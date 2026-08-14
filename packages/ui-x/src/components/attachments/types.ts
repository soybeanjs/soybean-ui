import type { Attachment } from '../../types';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxAttachments component.
 */
export interface AttachmentsProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The attachments to render.
   */
  attachments: Attachment[];
  /**
   * Whether to render the icon column. Defaults to `true`.
   */
  showIcons?: boolean;
  /**
   * Emitted when the user requests to remove an attachment.
   */
  onRemove?: (attachment: Attachment) => void;
  /**
   * Emitted when an attachment is clicked.
   */
  onSelect?: (attachment: Attachment) => void;
}
