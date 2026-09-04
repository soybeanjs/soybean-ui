import type { DataOrientation, Direction } from '../../types';
import type { TreeMenuOptionData } from '../tree-menu/types';
import type { TreeNavOptionData } from '../tree-nav/types';
import type { SplitNavBaseOptionData, SplitNavMode, SplitNavOptionData } from './types';

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
 * Whether an expand key moves INTO the nested pane (the forward direction).
 *
 * Horizontal rails move into the pane with ArrowDown regardless of direction.
 * Vertical rails move right with ArrowRight in LTR and left with ArrowLeft in RTL.
 */
export function isFirstLevelForwardExpandKey(key: string, orientation: DataOrientation, dir?: Direction): boolean {
  if (orientation === 'horizontal') {
    return key === 'ArrowDown';
  }

  return key === (dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
}

/** Nested pane selectors, resolved per rail orientation and nav mode. */
const SUB_VERTICAL_SELECTOR = '[data-soybean-split-nav-sub-vertical]';
const SUB_HORIZONTAL_SELECTOR = '[data-soybean-split-nav-sub-horizontal]';
const VERTICAL_FIRST_LEVEL_SELECTOR = '[data-soybean-split-nav-vertical-first-level]';

/**
 * Locates the pane a first-level branch opens, per rail orientation and nav mode.
 *
 * `mountedIdKey` names the root prop whose mount target hosts the pane when the
 * consumer renders SplitNav through mounted elements.
 *
 * The horizontal rail of `horizontal-dual-vertical` opens the nested dual-vertical
 * pane whose first level is a vertical rail, while the vertical rail of the same
 * mode opens the regular sub-vertical tree pane.
 */
const FIRST_LEVEL_PANE_QUERY: Record<
  DataOrientation,
  Partial<
    Record<
      SplitNavMode,
      {
        mountedIdKey: 'horizontalMountedId' | 'verticalMountedId';
        paneSelector: string;
      }
    >
  >
> = {
  vertical: {
    'dual-vertical': { mountedIdKey: 'verticalMountedId', paneSelector: SUB_VERTICAL_SELECTOR },
    'vertical-horizontal': { mountedIdKey: 'horizontalMountedId', paneSelector: SUB_HORIZONTAL_SELECTOR },
    'horizontal-dual-vertical': { mountedIdKey: 'verticalMountedId', paneSelector: SUB_VERTICAL_SELECTOR }
  },
  horizontal: {
    'vertical-horizontal': { mountedIdKey: 'horizontalMountedId', paneSelector: SUB_HORIZONTAL_SELECTOR },
    'horizontal-vertical': { mountedIdKey: 'verticalMountedId', paneSelector: SUB_VERTICAL_SELECTOR },
    'horizontal-dual-vertical': { mountedIdKey: 'verticalMountedId', paneSelector: VERTICAL_FIRST_LEVEL_SELECTOR }
  }
};

/**
 * Focus the first focusable item of the pane opened by the active first-level branch.
 *
 * The pane lives inside the mount target for the mode when provided, otherwise it
 * renders in place: inside the enclosing dual-vertical pane, or next to the rail.
 */
export function focusFirstLevelPaneItem(options: {
  itemElement: HTMLElement;
  orientation: DataOrientation;
  mode?: SplitNavMode;
  horizontalMountedId?: string;
  verticalMountedId?: string;
}): void {
  const { itemElement, orientation, mode, horizontalMountedId, verticalMountedId } = options;

  const query = mode ? FIRST_LEVEL_PANE_QUERY[orientation][mode] : undefined;

  if (!query) {
    return;
  }

  const mountedId = query.mountedIdKey === 'verticalMountedId' ? verticalMountedId : horizontalMountedId;
  const mountedElement = mountedId ? document.getElementById(mountedId) : null;
  const rail = itemElement.closest<HTMLElement>('[data-soybean-split-nav-first-level]');
  const scope = mountedElement ?? rail?.closest('[data-soybean-split-nav-dual-vertical]') ?? rail?.parentElement;

  const pane = scope?.querySelector(query.paneSelector);
  const item = pane?.querySelector<HTMLElement>('[data-soybean-roving-focus-item]:not([data-disabled])');

  item?.focus();
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
