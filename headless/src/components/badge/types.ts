import type { HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';

/**
 * Props for the badge root component.
 */
export interface BadgeRootProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is open.
   */
  open?: boolean;
}

/**
 * Emits for the badge root component.
 */
export type BadgeRootEmits = {
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Props for the badge content component.
 */
export interface BadgeContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the badge root component.
 */
export interface BadgeRootContext {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}

/**
 * Available UI slots for the badge component.
 */
export type BadgeUiSlot = 'root' | 'content';

/**
 * UI class overrides for the badge component.
 */
export type BadgeUi = UiClass<BadgeUiSlot>;
