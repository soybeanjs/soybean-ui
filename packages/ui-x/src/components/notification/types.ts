import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * The visual tone of an SxNotification.
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * Properties for the SxNotification component.
 */
export interface NotificationProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The notification title.
   */
  title?: string;
  /**
   * Optional longer description.
   */
  description?: string;
  /**
   * The visual tone.
   */
  type?: NotificationType;
  /**
   * Whether the close button is shown.
   */
  closable?: boolean;
  /**
   * Emitted when the close button is clicked.
   */
  onClose?: () => void;
}
