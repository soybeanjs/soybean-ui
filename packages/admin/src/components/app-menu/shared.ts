import type { MenuOptionData } from '@soybeanjs/headless/menu';
import type { NavigationMenuOptionData } from '@soybeanjs/headless/navigation-menu';
import type { TreeMenuOptionData } from '@soybeanjs/headless/tree-menu';
import type { AppMenuData } from '../../types';

/**
 * Map a single {@link AppMenuData} node to a `TreeMenuOptionData` for `STreeMenu`.
 *
 * Pure function: hidden nodes are pruned, children are mapped recursively.
 */
export function toTreeMenuOption(data: AppMenuData): TreeMenuOptionData | null {
  if (data.hideInMenu) {
    return null;
  }

  const children = data.children?.map(toTreeMenuOption).filter((child): child is TreeMenuOptionData => child !== null);

  return {
    value: data.key,
    label: data.label,
    icon: data.icon,
    disabled: data.disabled,
    badge: data.badge === undefined ? undefined : String(data.badge),
    children: children?.length ? children : undefined
  };
}

/**
 * Map a tree of {@link AppMenuData} to `TreeMenuOptionData[]`, pruning hidden
 * nodes and entries with no visible descendants.
 */
export function toTreeMenuOptions(data: AppMenuData[]): TreeMenuOptionData[] {
  return data.map(toTreeMenuOption).filter((option): option is TreeMenuOptionData => option !== null);
}

/**
 * Map a single {@link AppMenuData} node to a `NavigationMenuOptionData` for
 * `SNavigationMenu` (horizontal / top menu). Hidden nodes are pruned and
 * children are mapped recursively.
 */
export function toNavigationMenuOption(data: AppMenuData): NavigationMenuOptionData | null {
  if (data.hideInMenu) {
    return null;
  }

  const children = data.children
    ?.map(toNavigationMenuOption)
    .filter((child): child is NavigationMenuOptionData => child !== null);

  return {
    value: data.key,
    label: data.label,
    icon: data.icon,
    disabled: data.disabled,
    children: children?.length ? children : undefined
  };
}

/**
 * Map a tree of {@link AppMenuData} to `NavigationMenuOptionData[]`, pruning
 * hidden nodes and entries with no visible descendants.
 */
export function toNavigationMenuOptions(data: AppMenuData[]): NavigationMenuOptionData[] {
  return data.map(toNavigationMenuOption).filter((option): option is NavigationMenuOptionData => option !== null);
}

/**
 * Find the first leaf node reachable by always descending into the first child.
 *
 * Used by mix modes to auto-select the deepest menu under a parent.
 */
export function findDeepestLeafMenu(menus: AppMenuData[]): AppMenuData | null {
  if (!menus.length) {
    return null;
  }

  const first = menus[0];
  return first.children?.length ? findDeepestLeafMenu(first.children) : first;
}

/**
 * Whether a menu node equals `key` or contains a descendant with that key.
 *
 * Used to highlight the top-level branch holding the selected key (对齐
 * soybean-admin horizontal 菜单的 active 计算).
 */
export function menuContainsKey(menu: AppMenuData, key?: string): boolean {
  if (!key) {
    return false;
  }

  if (menu.key === key) {
    return true;
  }

  return Boolean(menu.children?.some(child => menuContainsKey(child, key)));
}

/**
 * Map a single {@link AppMenuData} node to a `MenuOptionData` for `SMenubar`.
 *
 * Pure function: hidden nodes are pruned, children are mapped recursively.
 */
export function toMenuOption(data: AppMenuData): MenuOptionData | null {
  if (data.hideInMenu) {
    return null;
  }

  const children = data.children?.map(toMenuOption).filter((child): child is MenuOptionData => child !== null);

  return {
    value: data.key,
    label: data.label,
    icon: data.icon,
    disabled: data.disabled,
    children: children?.length ? children : undefined
  };
}

/**
 * Map a tree of {@link AppMenuData} to `MenuOptionData[]`, pruning hidden
 * nodes and entries with no visible descendants.
 */
export function toMenuOptions(data: AppMenuData[]): MenuOptionData[] {
  return data.map(toMenuOption).filter((option): option is MenuOptionData => option !== null);
}
