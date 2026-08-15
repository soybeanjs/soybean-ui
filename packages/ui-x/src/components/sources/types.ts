import type { ClassValue } from '@soybeanjs/headless/types';
import type { Source } from '../../types';

/**
 * Properties for the SxSources component.
 */
export interface SourcesProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The sources to display.
   */
  sources: Source[];
  /**
   * Emitted when a source is clicked.
   */
  onSelect?: (source: Source) => void;
}
