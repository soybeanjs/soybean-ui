import type { ToolbarRootProps as HeadlessToolbarRootProps, ToolbarUi } from '@soybeanjs/headless/toolbar';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Toolbar component.
 */
export interface ToolbarProps extends HeadlessToolbarRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ToolbarUi>;
}
