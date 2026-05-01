import type { CollapsibleRootEmits, CollapsibleRootProps, CollapsibleUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the collapsible component.
 */
export interface CollapsibleProps extends CollapsibleRootProps {
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CollapsibleUi>;
}

/**
 * Emits for the collapsible component.
 */
export type CollapsibleEmits = CollapsibleRootEmits;
