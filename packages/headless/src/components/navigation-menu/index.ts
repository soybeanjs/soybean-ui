/** @deprecated Use `NavMenuCompact` instead. Will be removed in v1.0. */
export { default as NavigationMenuCompact } from './navigation-menu-compact.vue';
/** @deprecated Use `NavMenuRoot` instead. Will be removed in v1.0. */
export { default as NavigationMenuRoot } from './navigation-menu-root.vue';
/** @deprecated Use `NavMenuList` instead. Will be removed in v1.0. */
export { default as NavigationMenuList } from './navigation-menu-list.vue';
/** @deprecated Use `NavMenuItem` instead. Will be removed in v1.0. */
export { default as NavigationMenuItem } from './navigation-menu-item.vue';
/** @deprecated Use `NavMenuTrigger` instead. Will be removed in v1.0. */
export { default as NavigationMenuTrigger } from './navigation-menu-trigger.vue';
/** @deprecated Use `NavMenuContent` instead. Will be removed in v1.0. */
export { default as NavigationMenuContent } from './navigation-menu-content.vue';
/** @deprecated Use `NavMenuLink` instead. Will be removed in v1.0. */
export { default as NavigationMenuLink } from './navigation-menu-link.vue';
/** @deprecated Use `NavMenuSubContent` instead. Will be removed in v1.0. */
export { default as NavigationMenuSubList } from './navigation-menu-sub-list.vue';
/** @deprecated Use `NavMenuViewport` instead. Will be removed in v1.0. */
export { default as NavigationMenuViewport } from './navigation-menu-viewport.vue';
/** @deprecated The `NavigationMenu` family is superseded by `NavMenu`; `NavMenu` has no indicator concept. Will be removed in v1.0. */
export { default as NavigationMenuIndicator } from './navigation-menu-indicator.vue';

/** @deprecated Use `provideNavMenuUi` instead. Will be removed in v1.0. */
export { provideNavigationMenuUi } from './context';

export type {
  NavigationMenuCompactProps,
  NavigationMenuCompactEmits,
  NavigationMenuCompactSlots,
  NavigationMenuRootProps,
  NavigationMenuRootEmits,
  NavigationMenuViewportProps,
  NavigationMenuContentProps,
  NavigationMenuContentEmits,
  NavigationMenuTriggerProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuLinkEmits,
  NavigationMenuIndicatorProps,
  NavigationMenuSubProps,
  NavigationMenuSubEmits,
  NavigationMenuSubListProps,
  NavigationMenuOptionData,
  NavigationMenuUiSlot,
  NavigationMenuUi
} from './types';
