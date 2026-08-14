import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the SxThink component.
 */
export interface ThinkProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The collapsed / expanded header title.
   */
  title?: string;
  /**
   * Whether the panel is expanded by default.
   */
  defaultOpen?: boolean;
  /**
   * Emitted when the panel is toggled, with the new open state.
   */
  onToggleChange?: (open: boolean) => void;
}
