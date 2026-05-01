import type { ClassValue, ToolbarRootProps as HeadlessToolbarRootProps, ToolbarUi } from '@soybeanjs/headless';

/**
 * Props for the toolbar component.
 */
export interface ToolbarProps extends HeadlessToolbarRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ToolbarUi>;
}
