import type { BaseProps } from '../../types';

/**
 * Properties for the Tag component.
 */
export interface TagProps extends BaseProps {
  /**
   * Whether the component is open.
   */
  open?: boolean;
}

/**
 * Events for the Tag component.
 */
export type TagEmits = {
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};
