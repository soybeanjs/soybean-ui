import { getTreePaths } from '../../shared';
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
