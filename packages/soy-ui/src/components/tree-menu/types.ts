import type { Component, Ref } from 'vue';
import type { AcceptableValue, ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { ThemeSize, TreeMenuSlots } from '@soybean-ui/variants';
import type { LinkProps } from '../link';

export interface TreeMenuRootContext<T extends AcceptableValue = AcceptableValue> {
  modelValue: Ref<T | undefined>;
  onModelValueChange: (value?: T | undefined) => void;
  expandedKeys: Ref<T[]>;
  onExpandedKeysChange: (keys: T[]) => void;
  collapsible: Ref<boolean>;
  onCollapsibleChange: (collapsible: boolean) => void;
}

export type TreeMenuUi = Partial<Record<TreeMenuSlots, ClassValue>>;

export interface TreeMenuOptionData<T extends AcceptableValue = AcceptableValue> {
  /** The label to display in the menu. */
  label: string;
  /** The identifier for the option. */
  value: T;
  /** Whether the option is disabled. */
  disabled?: boolean;
  /**
   * whether is group label
   *
   * if true, the option will be a group label. It only works when it is first level of the tree menu.
   */
  isGroupLabel?: boolean;
  /** The icon to display prepended to the label. */
  icon?: Component;
  /**
   * The link props
   *
   * if provided, the option will be a link.
   */
  linkProps?: LinkProps;
  /** The children of the option. */
  children?: TreeMenuOptionData<T>[];
}

// Group Label
export interface TreeMenuGroupLabelProps extends ClassValueProp, Pick<TreeMenuOptionData, 'label' | 'icon'> {
  size?: ThemeSize;
  ui?: Pick<TreeMenuUi, 'groupLabel' | 'itemIcon'>;
}

export interface TreeMenuItemProps
  extends ClassValueProp,
    Pick<TreeMenuOptionData, 'value' | 'label' | 'icon' | 'disabled'> {
  size?: ThemeSize;
  ui?: Pick<TreeMenuUi, 'item' | 'itemIcon' | 'label'>;
  checked?: boolean;
  tooltip?: string;
}

// ItemLink
export interface TreeMenuItemLinkProps
  extends ClassValueProp,
    Pick<TreeMenuOptionData, 'value' | 'label' | 'icon' | 'disabled' | 'linkProps'> {
  size?: ThemeSize;
  ui?: Pick<TreeMenuUi, 'itemLink' | 'itemIcon' | 'itemLinkIcon' | 'label'>;
  checked?: boolean;
  tooltip?: string;
}

export interface TreeMenuGroupProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface TreeMenuChildGroupProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface TreeMenuCollapsibleIconProps extends ClassValueProp {
  open?: boolean;
}

export interface TreeMenuOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  ui?: TreeMenuUi;
  item: TreeMenuOptionData<T>;
}

export interface TreeMenuRootProps<T extends AcceptableValue = AcceptableValue> extends ClassValueProp {
  size?: ThemeSize;
  modelValue?: T | null;
  defaultValue?: T | null;
  expandedKeys?: T[];
  defaultExpandedKeys?: T[];
  collapsible?: boolean;
  /**
   * The width of the tree menu.
   *
   * @default 240
   */
  width?: number;
}

export type TreeMenuRootEmits<T extends AcceptableValue = AcceptableValue> = {
  'update:modelValue': [value: T];
  'update:expandedKeys': [keys: T[]];
  'update:collapsible': [collapsible: boolean];
};

export interface TreeMenuProps<T extends AcceptableValue = AcceptableValue> extends TreeMenuRootProps<T> {
  ui?: TreeMenuUi;
  items?: TreeMenuOptionData<T>[];
}

export type TreeMenuEmits<T extends AcceptableValue = AcceptableValue> = TreeMenuRootEmits<T>;
