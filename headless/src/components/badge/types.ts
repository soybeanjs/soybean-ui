import type { HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';

/**
 * Properties for the BadgeRoot component.
 */
export interface BadgeRootProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the component is open.
   */
  open?: boolean;
}

/**
 * Events for the BadgeRoot component.
 */
export type BadgeRootEmits = {
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Properties for the BadgeContent component.
 */
export interface BadgeContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the BadgeCompact component.
 */
export interface BadgeCompactProps extends BadgeRootProps {
  /** Content rendered inside the badge bubble when no content slot is provided. */
  content?: string;
  /** Properties forwarded to the content element. */
  contentProps?: BadgeContentProps;
}

/**
 * Events for the BadgeCompact component.
 */
export type BadgeCompactEmits = BadgeRootEmits;

/**
 * Slots for the BadgeCompact component.
 */
export type BadgeCompactSlots = {
  /** Custom content for the default slot. */
  default?: () => any;
  /** Custom content for the badge content slot. */
  content?: () => any;
};

/**
 * Context for the BadgeRoot component.
 */
export interface BadgeRootContext {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean>;
}

/**
 * Available UI slots for the Badge component.
 */
export type BadgeUiSlot = 'root' | 'content';

/**
 * UI class overrides for the Badge component.
 */
export type BadgeUi = UiClass<BadgeUiSlot>;
