import type { HTMLAttributes } from 'vue';

/**
 * Properties for the tag component.
 */
export interface TagProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is open.
   */
  open?: boolean;
}

/**
 * Events for the tag component.
 */
export type TagEmits = {
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};
