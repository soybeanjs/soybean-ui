import { getTreePaths } from '../../shared';
import type { TreeNavigationNode } from '../../shared';
import type { TreeMenuBaseOptionData, TreeMenuOptionData } from './types';

export const treeMenuCssVars = {
  collapsedWidth: '--soybean-tree-menu-collapsed-width',
  indent: '--soybean-tree-menu-indent'
};

function collectGroupValues<T extends TreeMenuBaseOptionData>(items: TreeMenuOptionData<T>[]): string[] {
  return items.flatMap(item => [
    ...(item.isGroup ? [item.value] : []),
    ...(item.children ? collectGroupValues(item.children) : [])
  ]);
}

/**
 * Returns the values that should be kept expanded for the given active value:
 * the active value plus every collapsible ancestor. Group nodes are excluded
 * because they are pure visual containers and never expand or collapse.
 */
export function getActiveExpandValues<T extends TreeMenuBaseOptionData>(
  targetValue: string,
  items: TreeMenuOptionData<T>[]
): string[] {
  const paths = getTreePaths(targetValue, items);

  if (paths.length === 0) {
    return paths;
  }

  const groupValues = new Set(collectGroupValues(items));

  return paths.filter(value => !groupValues.has(value));
}

export function filterHiddenTreeMenuOptions<T extends TreeMenuBaseOptionData>(
  items?: TreeMenuOptionData<T>[]
): TreeMenuOptionData<T>[] {
  if (!items) {
    return [];
  }

  return items
    ?.filter(item => !item.hidden)
    .map(item => {
      const newItem = { ...item };
      if (newItem.children && newItem.children.length > 0) {
        newItem.children = filterHiddenTreeMenuOptions(newItem.children);
      }
      return newItem;
    });
}

/**
 * Flatten the visible tree into keyboard navigation nodes.
 *
 * Hidden items are skipped, group containers stay transparent (their children
 * keep the group's level), and a branch's children are only emitted while the
 * branch is expanded — so the result matches the rendered DOM order exactly.
 */
export function flattenTreeMenuNavigationNodes<T extends TreeMenuBaseOptionData>(
  items: TreeMenuOptionData<T>[],
  isExpanded: (value: string) => boolean
): TreeNavigationNode[] {
  const nodes: TreeNavigationNode[] = [];

  const walk = (list: TreeMenuOptionData<T>[], level: number) => {
    for (const item of list) {
      if (item.hidden) continue;

      // Group containers never receive focus; only their children do.
      if (item.isGroup) {
        walk(item.children ?? [], level);
        continue;
      }

      const children = item.children ?? [];
      const hasChildren = children.some(child => !child.hidden);
      const expanded = hasChildren && isExpanded(item.value);

      nodes.push({ value: item.value, level, hasChildren, expanded, disabled: item.disabled });

      if (expanded) {
        walk(children, level + 1);
      }
    }
  };

  walk(items, 0);

  return nodes;
}
