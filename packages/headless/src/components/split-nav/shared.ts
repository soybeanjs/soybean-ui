import type { DataOrientation } from '../../types';
import type { TreeMenuOptionData } from '../tree-menu/types';
import type { TreeNavOptionData } from '../tree-nav/types';
import type { SplitNavBaseOptionData, SplitNavOptionData } from './types';

/**
 * Build a CSS selector for a mounted element id, or `undefined` when the id is empty.
 */
export function toMountedTarget(id?: string): string | undefined {
  if (!id) {
    return undefined;
  }

  return `#${id}`;
}

/**
 * Whether a node has at least one visible child.
 */
export function hasVisibleChildren<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  item: SplitNavOptionData<T>
): boolean {
  return Boolean(item.children?.some(child => !child.hidden));
}

/**
 * Recursively drop `hidden` nodes from a menu tree.
 */
export function toVisibleOptions<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  items: SplitNavOptionData<T>[]
): SplitNavOptionData<T>[] {
  return items
    .filter(item => !item.hidden)
    .map(item => {
      const children = item.children?.length ? toVisibleOptions(item.children as SplitNavOptionData<T>[]) : undefined;

      return {
        ...item,
        children: children?.length ? children : undefined
      };
    });
}

/**
 * Flatten first-level group nodes so the roving list only contains selectable items.
 *
 * A top-level `isGroup` node is not itself a first-level item; its visible children are.
 */
export function flattenFirstLevelItems<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  items: SplitNavOptionData<T>[]
): SplitNavOptionData<T>[] {
  return toVisibleOptions(items).flatMap(item => {
    if (item.isGroup) {
      return item.children?.length ? (item.children as SplitNavOptionData<T>[]) : [];
    }

    return [item];
  });
}

/**
 * Resolve the ancestor path from the tree root to `modelValue`.
 *
 * Returns an array where `values[0]` is the active level-1 value. Empty when
 * `modelValue` is missing or not found.
 */
export function findActivePath<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  items: SplitNavOptionData<T>[],
  modelValue: string,
  path: string[] = []
): string[] {
  if (!modelValue) {
    return [];
  }

  for (const item of items) {
    const currentPath = [...path, item.value];

    if (item.value === modelValue) {
      return currentPath;
    }

    if (item.children?.length) {
      const nested = findActivePath(item.children as SplitNavOptionData<T>[], modelValue, currentPath);

      if (nested.length) {
        return nested;
      }
    }
  }

  return [];
}

/**
 * Derive the open-pane path from a selected value.
 *
 * Parents stay on the path so their nested pane can open without becoming the
 * selected leaf. Leaves are dropped so only ancestor panes remain open.
 */
export function toOpenPath<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  items: SplitNavOptionData<T>[],
  value: string
): string[] {
  const path = findActivePath(items, value);

  if (!path.length) {
    return [];
  }

  const last = findNode(items, path[path.length - 1]);

  if (last && hasVisibleChildren(last)) {
    return path;
  }

  return path.slice(0, -1);
}

/**
 * Whether a first-level keyboard event should open the nested pane.
 *
 * Horizontal rails use ArrowDown (the unused vertical axis). Vertical rails
 * use ArrowLeft / ArrowRight (the unused horizontal axis).
 */
export function isFirstLevelExpandKey(key: string, orientation: DataOrientation): boolean {
  if (orientation === 'horizontal') {
    return key === 'ArrowDown';
  }

  return key === 'ArrowLeft' || key === 'ArrowRight';
}

/**
 * Find the item in a level list that sits on the active path.
 */
export function findActiveInLevel<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  levelItems: SplitNavOptionData<T>[],
  activePath: string[]
): SplitNavOptionData<T> | undefined {
  return levelItems.find(item => activePath.includes(item.value));
}

/**
 * Find a node by value in a menu tree.
 */
export function findNode<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  items: SplitNavOptionData<T>[],
  value: string
): SplitNavOptionData<T> | undefined {
  for (const item of items) {
    if (item.value === value) {
      return item;
    }

    if (item.children?.length) {
      const found = findNode(item.children as SplitNavOptionData<T>[], value);

      if (found) {
        return found;
      }
    }
  }

  return undefined;
}

/**
 * Map SplitNav options to `TreeMenuOptionData[]` for nested vertical menus.
 */
export function toTreeMenuOptions<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  data: SplitNavOptionData<T>[]
): TreeMenuOptionData[] {
  return toVisibleOptions(data).map(item => {
    const children = item.children?.length ? toTreeMenuOptions(item.children as SplitNavOptionData<T>[]) : undefined;

    return {
      value: item.value,
      label: item.label,
      icon: item.icon,
      disabled: item.disabled,
      hidden: item.hidden,
      isGroup: item.isGroup,
      badge: item.badge,
      badgeProps: item.badgeProps,
      tag: item.tag,
      tagProps: item.tagProps,
      tooltipProps: item.tooltipProps,
      dropdownMenuProps: item.dropdownMenuProps,
      actions: item.actions,
      actionMenuProps: item.actionMenuProps,
      onActionSelect: item.onActionSelect,
      to: item.to,
      href: item.href,
      target: item.target,
      external: item.external,
      children: children?.length ? children : undefined
    };
  });
}

/**
 * Map SplitNav options to `TreeNavOptionData[]` for nested horizontal menus.
 */
export function toTreeNavOptions<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  data: SplitNavOptionData<T>[]
): TreeNavOptionData[] {
  return toVisibleOptions(data).map(item => {
    const children = item.children?.length ? toTreeNavOptions(item.children as SplitNavOptionData<T>[]) : undefined;

    return {
      value: item.value,
      label: item.label,
      icon: item.icon,
      disabled: item.disabled,
      hidden: item.hidden,
      isGroup: item.isGroup,
      shortcut: item.shortcut,
      separator: item.separator,
      to: item.to,
      href: item.href,
      target: item.target,
      external: item.external,
      children: children?.length ? children : undefined
    };
  });
}
