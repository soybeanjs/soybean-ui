import type { CollapsibleRootEmits, CollapsibleRootProps, CollapsibleUi } from '@soybeanjs/headless/collapsible';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the collapsible component.
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
 * Events for the collapsible component.
 */
export type CollapsibleEmits = CollapsibleRootEmits;
