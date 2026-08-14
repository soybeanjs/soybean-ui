import type { ThoughtChainItem } from '../../types';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxThoughtChain component.
 */
export interface ThoughtChainProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The reasoning steps to display.
   */
  items: ThoughtChainItem[];
  /**
   * Whether expandable steps are expanded by default.
   */
  defaultExpand?: boolean;
}
