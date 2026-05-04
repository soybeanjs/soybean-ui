import type { HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';

/**
 * Properties for the badge root component.
 */
export interface BadgeRootProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is open.
   */
  open?: boolean;
}

/**
 * Events for the badge root component.
 */
export type BadgeRootEmits = {
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Properties for the badge content component.
 */
export interface BadgeContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the badge compact component.
 */
export interface BadgeCompactProps extends BadgeRootProps {
  /** Content rendered inside the badge bubble when no content slot is provided. */
  content?: string;
  /** Properties forwarded to the content element. */
  contentProps?: BadgeContentProps;
}

/**
 * Events for the badge compact component.
 */
export type BadgeCompactEmits = BadgeRootEmits;

/**
 * Slots for the badge compact component.
 */
export type BadgeCompactSlots = {
  /** Custom content for the default slot. */
  default?: () => any;
  /** Custom content for the badge content slot. */
  content?: () => any;
};

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
