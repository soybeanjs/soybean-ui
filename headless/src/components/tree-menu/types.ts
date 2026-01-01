import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { ClassValue } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type TreeMenuCollapsedState = 'expanded' | 'collapsed';

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

export type TreeMenuRootEmits = {
  'update:modelValue': [value: string];
  'update:expanded': [value: string[]];
  'update:collapsed': [value: boolean];
};

export interface TreeMenuGroupRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TreeMenuGroupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface TreeMenuGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

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

export interface TreeMenuItemProps extends TreeMenuBaseItemProps, PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface TreeMenuButtonProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * When `true`, prevents the user from activating the item.
   *
   * @default false
   */
  disabledActive?: boolean;
}

export interface TreeMenuCollapsibleProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * When `true`, prevents the user from activating the collapsible trigger.
   */
  disabledCollapsible?: boolean;
}

export interface TreeMenuSubProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface TreeMenuRootContextParams {
  modelValue: ShallowRef<string>;
  expanded: ShallowRef<string[]>;
  collapsed: ShallowRef<boolean>;
}

export interface TreeMenuItemContextParams {
  value: string;
  isActive: ComputedRef<boolean>;
  isExpanded: ComputedRef<boolean>;
  onExpandedToggle: () => void;
  onActive: () => void;
}

export interface TreeMenuSubContextParams {
  isSub: boolean;
}

export type TreeMenuThemeSlot =
  | 'root'
  | 'groupRoot'
  | 'groupLabel'
  | 'group'
  | 'item'
  | 'button'
  | 'sub'
  | 'subItem'
  | 'subButton'
  | 'collapsibleContent';

export type TreeMenuUi = Record<TreeMenuThemeSlot, ClassValue>;

export type TreeMenuThemeContextParams = ComputedRef<Partial<TreeMenuUi>>;
