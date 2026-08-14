import type { Attachment } from '../../types';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxFileCard component.
 */
export interface FileCardProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The attachment to render.
   */
  attachment: Attachment;
  /**
   * Optional click handler (e.g. open preview).
   */
  onClick?: () => void;
}
