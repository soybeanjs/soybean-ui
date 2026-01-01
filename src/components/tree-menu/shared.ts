import type { TreeMenuGroupOptionData, TreeMenuOptionData } from './types';

export const treeMenuCssVars = {
  collapsedWidth: '--soybean-tree-menu-collapsed-width',
  indent: '--soybean-tree-menu-indent'
};

export function isGroupTreeMenu(item: TreeMenuOptionData): item is TreeMenuGroupOptionData {
  return 'isGroup' in item && item.isGroup;
}

export function isChildActive(item: TreeMenuOptionData, activeValue: string, isRoot = true): boolean {
  const match = !isRoot && item.value === activeValue;

  if (match) return true;

  return item?.children?.some(child => isChildActive(child, activeValue, false)) ?? false;
}
