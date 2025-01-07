import type { Component, VNode } from 'vue';
import type {
  ClassValue,
  ClassValueProp,
  NavigationMenuContentEmits,
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuListProps,
  NavigationMenuRootEmits,
  NavigationMenuRootProps,
  NavigationMenuViewportProps,
  NavigationMenuLinkProps as _NavigationMenuLinkProps,
  NavigationMenuTriggerProps as _NavigationMenuTriggerProps
} from '@soybean-ui/primitives';
import type { LinkProps } from '../link';

export interface NavigationMenuTriggerProps extends _NavigationMenuTriggerProps {
  iconClass?: ClassValue;
}

export interface NavigationMenuTriggerIconProps extends ClassValueProp {}

export interface NavigationMenuViewportRootProps extends ClassValueProp {}

export interface NavigationMenuLinkProps extends _NavigationMenuLinkProps, LinkProps {}

export interface NavigationMenuChildLinkProps extends NavigationMenuLinkProps {}

export interface NavigationMenuChildLinkLabelProps extends ClassValueProp {}

export interface NavigationMenuChildLinkDescriptionProps extends ClassValueProp {}

export interface NavigationMenuChildListProps extends ClassValueProp {}

export interface NavigationMenuChildListItemProps extends ClassValueProp {}

export interface NavigationMenuItemBaseOption extends Pick<NavigationMenuItemProps, 'value'>, LinkProps {
  label: string;
  icon?: Component | VNode;
  description?: string;
}

export type NavigationMenuItemOption<T extends NavigationMenuItemBaseOption = NavigationMenuItemBaseOption> = T & {
  items?: T[];
};

export interface NavigationMenuProps<T extends NavigationMenuItemBaseOption = NavigationMenuItemBaseOption>
  extends NavigationMenuRootProps {
  items: NavigationMenuItemOption<T>[];
  showArrow?: boolean;
  listClass?: ClassValue;
  itemClass?: ClassValue;
  linkClass?: ClassValue;
  triggerClass?: ClassValue;
  triggerIconClass?: ClassValue;
  contentClass?: ClassValue;
  forceMountContent?: boolean;
  childListClass?: ClassValue;
  childListItemClass?: ClassValue;
  childLinkClass?: ClassValue;
  childLinkLabelClass?: ClassValue;
  childLinkDescriptionClass?: ClassValue;
}

export type NavigationMenuLinkEmits<T extends NavigationMenuItemOption = NavigationMenuItemOption> = {
  select: [item: T, payload: CustomEvent<{ originalEvent: Event }>];
};

export type NavigationMenuEmits<T extends NavigationMenuItemOption = NavigationMenuItemOption> =
  NavigationMenuRootEmits & NavigationMenuContentEmits & NavigationMenuLinkEmits<T>;

export type {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuListProps,
  NavigationMenuRootProps,
  NavigationMenuViewportProps,
  NavigationMenuItemProps,
  NavigationMenuRootEmits,
  NavigationMenuContentEmits
};
