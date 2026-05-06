import type { ComputedRef, ShallowRef } from 'vue';
import type { BaseProps, UiClass } from '../../types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * State values for TreeMenuCollapsedState.
 */
export type TreeMenuCollapsedState = 'expanded' | 'collapsed';

/**
 * Properties for the TreeMenuRoot component.
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
 * Events for the TreeMenuRoot component.
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
 * Properties for the TreeMenuGroupRoot component.
 */
export interface TreeMenuGroupRootProps extends BaseProps {}

/**
 * Properties for the TreeMenuGroup component.
 */
export interface TreeMenuGroupProps extends PrimitiveWithBaseProps {}

/**
 * Properties for the TreeMenuGroupLabel component.
 */
export interface TreeMenuGroupLabelProps extends BaseProps {}

/**
 * Properties for the TreeMenuBaseItem component.
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
 * Properties for the TreeMenuItem component.
 */
export interface TreeMenuItemProps extends TreeMenuBaseItemProps, PrimitiveWithBaseProps {}

/**
 * Properties for the TreeMenuButton component.
 */
export interface TreeMenuButtonProps extends PrimitiveWithBaseProps {
  /**
   * When `true`, prevents the user from activating the item.
   *
   * @default false
   */
  disabledActive?: boolean;
}

/**
 * Properties for the TreeMenuCollapsible component.
 */
export interface TreeMenuCollapsibleProps extends PrimitiveWithBaseProps {
  /**
   * When `true`, prevents the user from activating the collapsible trigger.
   */
  disabledCollapsible?: boolean;
}

/**
 * Properties for the TreeMenuSub component.
 */
export interface TreeMenuSubProps extends PrimitiveWithBaseProps {}

/**
 * Parameters used to create the TreeMenuRoot context.
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
 * Context for the TreeMenuItem component.
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
 * Parameters used to create the TreeMenuSub context.
 */
export interface TreeMenuSubContextParams {
  /**
   * Whether the current context is nested.
   */
  isSub: boolean;
}

/**
 * Available UI slots for the TreeMenu component.
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
 * UI class overrides for the TreeMenu component.
 */
export type TreeMenuUi = UiClass<TreeMenuUiSlot>;
