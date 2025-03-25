import type { Component, VNode } from 'vue';
import type {
  ClassValue,
  ClassValueProp,
  NavigationMenuContentEmits,
  NavigationMenuContentProps,
  NavigationMenuItemProps,
  NavigationMenuRootEmits,
  NavigationMenuRootProps,
  NavigationMenuIndicatorProps as _NavigationMenuIndicatorProps,
  NavigationMenuLinkProps as _NavigationMenuLinkProps,
  NavigationMenuListProps as _NavigationMenuListProps,
  NavigationMenuTriggerProps as _NavigationMenuTriggerProps,
  NavigationMenuViewportProps as _NavigationMenuViewportProps
} from '@soybean-ui/primitives';
import type { NavigationMenuSlots, ThemeSize } from '@soybean-ui/variants';
import type { LinkProps } from '../link';

export interface NavigationMenuViewportProps extends _NavigationMenuViewportProps {
  size?: ThemeSize;
}

export interface NavigationMenuListProps extends _NavigationMenuListProps {
  size?: ThemeSize;
}

export interface NavigationMenuTriggerProps extends _NavigationMenuTriggerProps {
  size?: ThemeSize;
  iconClass?: ClassValue;
}

export interface NavigationMenuViewportRootProps extends ClassValueProp {}

export interface NavigationMenuLinkProps extends _NavigationMenuLinkProps, LinkProps {
  size?: ThemeSize;
}

export interface NavigationMenuIndicatorProps extends _NavigationMenuIndicatorProps {
  size?: ThemeSize;
  arrowClass?: ClassValue;
}

export interface NavigationMenuChildLinkProps extends NavigationMenuLinkProps {
  size?: ThemeSize;
}

export interface NavigationMenuChildLinkLabelProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface NavigationMenuChildLinkDescriptionProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface NavigationMenuChildListProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface NavigationMenuChildListItemProps extends ClassValueProp {}

export interface NavigationMenuItemBaseOption extends Pick<NavigationMenuItemProps, 'value'>, LinkProps {
  label: string;
  icon?: Component | VNode;
  description?: string;
}

export type NavigationMenuItemOption<T extends NavigationMenuItemBaseOption = NavigationMenuItemBaseOption> = T & {
  items?: T[];
};

export type NavigationMenuUi = Partial<Record<NavigationMenuSlots, ClassValue>>;

export interface NavigationMenuProps<T extends NavigationMenuItemBaseOption = NavigationMenuItemBaseOption>
  extends NavigationMenuRootProps {
  size?: ThemeSize;
  ui?: NavigationMenuUi;
  items: NavigationMenuItemOption<T>[];
  showArrow?: boolean;
  forceMountContent?: boolean;
}

export type NavigationMenuLinkEmits<T extends NavigationMenuItemOption = NavigationMenuItemOption> = {
  select: [item: T, payload: CustomEvent<{ originalEvent: Event }>];
};

export type NavigationMenuEmits<T extends NavigationMenuItemOption = NavigationMenuItemOption> =
  NavigationMenuRootEmits & NavigationMenuContentEmits & NavigationMenuLinkEmits<T>;

export type {
  NavigationMenuContentProps,
  NavigationMenuRootProps,
  NavigationMenuItemProps,
  NavigationMenuRootEmits,
  NavigationMenuContentEmits
};
