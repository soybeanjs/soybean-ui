import type { TreeMenuOptionData } from './types';

export const treeMenuCssVars = {
  collapsedWidth: '--soybean-tree-menu-collapsed-width',
  indent: '--soybean-tree-menu-indent'
};

export function isChildActive(item: TreeMenuOptionData, activeValue: string, isRoot = true): boolean {
  const match = !isRoot && item.value === activeValue;

  if (match) return true;

  return item?.children?.some(child => isChildActive(child, activeValue, false)) ?? false;
}
