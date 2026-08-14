import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * The display mode of an SxMermaid diagram.
 */
export type MermaidMode = 'image' | 'code';

/**
 * Properties for the SxMermaid component.
 */
export interface MermaidProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The mermaid diagram source code.
   */
  code: string;
  /**
   * The initial display mode.
   */
  mode?: MermaidMode;
  /**
   * Whether the image / code toggle is shown.
   */
  showToggle?: boolean;
}
