import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxFolder component.
 */
export interface FolderProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The folder name.
   */
  name: string;
  /**
   * Number of items to show as a badge.
   */
  count?: number;
  /**
   * Whether the folder is expanded by default.
   */
  defaultOpen?: boolean;
}
