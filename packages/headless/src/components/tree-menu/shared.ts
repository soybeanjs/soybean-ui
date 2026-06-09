import type { TreeMenuBaseOptionData, TreeMenuOptionData } from './types';

export const treeMenuCssVars = {
  collapsedWidth: '--soybean-tree-menu-collapsed-width',
  indent: '--soybean-tree-menu-indent'
};

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
