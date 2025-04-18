import type { Component, Ref } from 'vue';
import type { AcceptableValue, ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { SidebarMenuSlots, ThemeSize } from '@soybean-ui/variants';
import type { LinkProps } from '../link';

export interface SidebarMenuRootContext<T extends AcceptableValue = AcceptableValue> {
  modelValue: Ref<T | undefined>;
  onModelValueChange: (value?: T | undefined) => void;
  expandedKeys: Ref<T[]>;
  onExpandedKeysChange: (keys: T[]) => void;
  collapsible: Ref<boolean>;
  onCollapsibleChange: (collapsible: boolean) => void;
}

export type SidebarMenuUi = Partial<Record<SidebarMenuSlots, ClassValue>>;

export interface SidebarMenuOptionData<T extends AcceptableValue = AcceptableValue> {
  /** The label to display in the menu. */
  label: string;
  /** The identifier for the option. */
  value: T;
  /** Whether the option is disabled. */
  disabled?: boolean;
  /**
   * whether is group label
   *
   * if true, the option will be a group label. It only works when it is first level of the sidebar menu.
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
  children?: SidebarMenuOptionData<T>[];
}

// Group Label
export interface SidebarMenuGroupLabelProps extends ClassValueProp, Pick<SidebarMenuOptionData, 'label' | 'icon'> {
  size?: ThemeSize;
  ui?: Pick<SidebarMenuUi, 'groupLabel' | 'itemIcon'>;
}

export interface SidebarMenuItemProps
  extends ClassValueProp,
    Pick<SidebarMenuOptionData, 'value' | 'label' | 'icon' | 'disabled'> {
  size?: ThemeSize;
  ui?: Pick<SidebarMenuUi, 'item' | 'itemIcon' | 'label'>;
  checked?: boolean;
  tooltip?: string;
}

// ItemLink
export interface SidebarMenuItemLinkProps
  extends ClassValueProp,
    Pick<SidebarMenuOptionData, 'value' | 'label' | 'icon' | 'disabled' | 'linkProps'> {
  size?: ThemeSize;
  ui?: Pick<SidebarMenuUi, 'itemLink' | 'itemIcon' | 'itemLinkIcon' | 'label'>;
  checked?: boolean;
  tooltip?: string;
}

export interface SidebarMenuGroupProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface SidebarMenuChildGroupProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface SidebarMenuCollapsibleIconProps extends ClassValueProp {
  open?: boolean;
}

export interface SidebarMenuOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  ui?: SidebarMenuUi;
  item: SidebarMenuOptionData<T>;
  /**
   * Whether the option is the root option.
   *
   * @default false
   */
  root?: boolean;
}

export interface SidebarMenuRootProps<T extends AcceptableValue = AcceptableValue> extends ClassValueProp {
  size?: ThemeSize;
  modelValue?: T | null;
  defaultValue?: T | null;
  expandedKeys?: T[];
  defaultExpandedKeys?: T[];
  collapsible?: boolean;
  /**
   * The width of the sidebar menu.
   *
   * @default 240
   */
  width?: number;
}

export type SidebarMenuRootEmits<T extends AcceptableValue = AcceptableValue> = {
  'update:modelValue': [value: T];
  'update:expandedKeys': [keys: T[]];
  'update:collapsible': [collapsible: boolean];
};

export interface SidebarMenuProps<T extends AcceptableValue = AcceptableValue> extends SidebarMenuRootProps<T> {
  ui?: SidebarMenuUi;
  items?: SidebarMenuOptionData<T>[];
}

export type SidebarMenuEmits<T extends AcceptableValue = AcceptableValue> = SidebarMenuRootEmits<T>;
