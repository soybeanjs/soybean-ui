import type { Component } from 'vue';
import type { AcceptableValue, ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { ThemeSize, TreeMenuSlots } from '@soybean-ui/variants';
import type { LinkProps } from '../link';

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
  ui?: Pick<TreeMenuUi, 'item' | 'itemIcon'>;
}

// ItemLink
export interface TreeMenuItemLinkProps
  extends ClassValueProp,
    Pick<TreeMenuOptionData, 'value' | 'label' | 'icon' | 'disabled' | 'linkProps'> {
  size?: ThemeSize;
  ui?: Pick<TreeMenuUi, 'itemLink' | 'itemIcon' | 'itemLinkIcon'>;
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

export interface TreeMenuRootProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface TreeMenuProps<T extends AcceptableValue = AcceptableValue> extends ClassValueProp {
  size?: ThemeSize;
  ui?: TreeMenuUi;
  items?: TreeMenuOptionData<T>[];
}
