import type { Component, VNode } from 'vue';
import type {
  ClassValue,
  NavigationMenuContentEmits,
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkEmits,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuRootEmits,
  NavigationMenuRootProps,
  NavigationMenuSubEmits,
  NavigationMenuSubProps,
  NavigationMenuThemeSlot,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps
} from '@headless';
import type { ThemeSize } from '@theme';

export interface NavigationMenuOptionData {
  /** The value of the option. */
  value: string;
  /** The label to display in the option. */
  label: string;
  /** The description of the option. */
  description?: string;
  /**
   * The icon of the option.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: VNode | Component | string;
  /** Whether the option is disabled. */
  disabled?: boolean;
  /**
   * The link props
   *
   * if provided, the option will be a link.
   */
  linkProps?: NavigationMenuLinkProps;
  /** The children of the option. */
  children?: NavigationMenuOptionData[];
}

export type NavigationMenuExtraThemeSlot =
  | 'triggerIcon'
  | 'linkIcon'
  | 'arrow'
  | 'viewportRoot'
  | 'subLinkContent'
  | 'subLinkLabel'
  | 'subLinkDescription';
export type NavigationMenuExtraUi = Partial<Record<NavigationMenuExtraThemeSlot, ClassValue>>;

export type NavigationMenuUi = Partial<Record<NavigationMenuThemeSlot | NavigationMenuExtraThemeSlot, ClassValue>>;

export interface NavigationMenuSubOptionProps {
  ui?: NavigationMenuUi;
  subItem: NavigationMenuOptionData;
  subItemProps?: NavigationMenuItemProps;
  subProps?: NavigationMenuSubProps;
  subTriggerProps?: NavigationMenuTriggerProps;
  subContentProps?: NavigationMenuContentProps;
  subViewportProps?: NavigationMenuViewportProps;
  subIndicatorProps?: NavigationMenuIndicatorProps;
  subListProps?: NavigationMenuListProps;
}

export interface NavigationMenuOptionProps extends Omit<NavigationMenuSubOptionProps, 'subItem'> {
  ui?: NavigationMenuUi;
  item: NavigationMenuOptionData;
  itemProps?: NavigationMenuItemProps;
  triggerProps?: NavigationMenuTriggerProps;
  contentProps?: NavigationMenuContentProps;
  subProps?: NavigationMenuSubProps;
  viewportProps?: NavigationMenuViewportProps;
  indicatorProps?: NavigationMenuIndicatorProps;
  listProps?: NavigationMenuListProps;
}

export type NavigationMenuOptionEmits = NavigationMenuSubEmits & NavigationMenuContentEmits & NavigationMenuLinkEmits;

export interface NavigationMenuProps extends NavigationMenuRootProps, Omit<NavigationMenuOptionProps, 'item'> {
  size?: ThemeSize;
  items: NavigationMenuOptionData[];
}

export type NavigationMenuEmits = NavigationMenuRootEmits & NavigationMenuOptionEmits;
