import type { TreeMenuGroupOptionData, TreeMenuOptionData } from './types';

export const treeMenuCssVars = {
  collapsedWidth: '--soybean-tree-menu-collapsed-width',
  indent: '--soybean-tree-menu-indent'
};

export function isTreeMenuGroupOption<T extends TreeMenuOptionData = TreeMenuOptionData>(
  data: T
): data is T & TreeMenuGroupOptionData {
  return 'isGroup' in data && data.isGroup;
}

export function transformTreeMenuItems<T extends TreeMenuOptionData = TreeMenuOptionData>(items: T[]) {
  const result: T[] = [];

  for (const item of items) {
    if (isTreeMenuGroupOption(item)) {
      const { children, ...rest } = item;

      result.push(rest as T, ...((children ?? []) as T[]));
    } else {
      result.push(item);
    }
  }
  return result;
}
