import type { HTMLAttributes } from 'vue';

/**
 * Props for the tag component.
 */
export interface TagProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is open.
   */
  open?: boolean;
}

/**
 * Emits for the tag component.
 */
export type TagEmits = {
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};
