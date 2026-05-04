import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * State values for the tree menu component.
 */
export type TreeMenuCollapsedState = 'expanded' | 'collapsed';

/**
 * Properties for the tree menu root component.
 */
export interface TreeMenuRootProps {
  /**
   * the active value of the tree menu. can be bound-with with `v-model`.
   */
  modelValue?: string;
  /**
   * the value of the tree menu when initially rendered. use when you do not need to control the state of the tree.
   */
  defaultValue?: string;
  /**
   * the expanded value of the tree menu. can be bound-with with `v-model`.
   */
  expanded?: string[];
  /**
   * the expanded value of the tree menu when initially rendered. use when you do not need to control the state of the tree.
   */
  defaultExpanded?: string[];
  /**
   * Whether the tree menu is collapsed.
   *
   * @default false
   */
  collapsed?: boolean;
  /**
   * The value of the tree menu when it's collapsed.
   */
  defaultCollapsed?: boolean;
}

/**
 * Events for the tree menu root component.
 */
export type TreeMenuRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when the expanded state changes.
   */
  'update:expanded': [value: string[]];
  /**
   * Emitted when the collapsed state changes.
   */
  'update:collapsed': [value: boolean];
};

/**
 * Properties for the tree menu group root component.
 */
export interface TreeMenuGroupRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the tree menu group component.
 */
export interface TreeMenuGroupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the tree menu group label component.
 */
export interface TreeMenuGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the tree menu base item component.
 */
export interface TreeMenuBaseItemProps {
  /**
   * The unique value of the item.
   */
  value: string;
  /**
   * When `true`, prevents the user from interacting with the item.
   */
  disabled?: boolean;
}

/**
 * Properties for the tree menu item component.
 */
export interface TreeMenuItemProps extends TreeMenuBaseItemProps, PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the tree menu button component.
 */
export interface TreeMenuButtonProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * When `true`, prevents the user from activating the item.
   *
   * @default false
   */
  disabledActive?: boolean;
}

/**
 * Properties for the tree menu collapsible component.
 */
export interface TreeMenuCollapsibleProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * When `true`, prevents the user from activating the collapsible trigger.
   */
  disabledCollapsible?: boolean;
}

/**
 * Properties for the tree menu sub component.
 */
export interface TreeMenuSubProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Parameters used to create the tree menu root context.
 */
export interface TreeMenuRootContextParams {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string>;
  /**
   * Expanded used by the component context.
   */
  expanded: ShallowRef<string[]>;
  /**
   * Whether the component is collapsed.
   */
  collapsed: ShallowRef<boolean>;
}

/**
 * Context for the tree menu item component.
 */
export interface TreeMenuItemContext {
  /**
   * Value associated with the current item.
   */
  value: string;
  /**
   * Whether the current item is active.
   */
  isActive: ComputedRef<boolean>;
  /**
   * Whether the current item is expanded.
   */
  isExpanded: ComputedRef<boolean>;
  /**
   * Callback invoked when the expanded toggles.
   */
  onExpandedToggle: () => void;
  /**
   * Callback invoked when the active event fires.
   */
  onActive: () => void;
}

/**
 * Parameters used to create the tree menu sub context.
 */
export interface TreeMenuSubContextParams {
  /**
   * Whether the current context is nested.
   */
  isSub: boolean;
}

/**
 * Available UI slots for the tree menu component.
 */
export type TreeMenuUiSlot =
  | 'root'
  | 'groupRoot'
  | 'groupLabel'
  | 'group'
  | 'item'
  | 'button'
  | 'sub'
  | 'subItem'
  | 'subButton'
  | 'collapsibleRoot'
  | 'collapsibleTrigger'
  | 'collapsibleContent';

/**
 * UI class overrides for the tree menu component.
 */
export type TreeMenuUi = UiClass<TreeMenuUiSlot>;
