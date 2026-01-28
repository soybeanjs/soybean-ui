import type { TreeMenuBaseOptionData, TreeMenuOptionData } from './types';

export const treeMenuCssVars = {
  collapsedWidth: '--soybean-tree-menu-collapsed-width',
  indent: '--soybean-tree-menu-indent'
};

export function isChildActive(item: TreeMenuOptionData, activeValue: string, isRoot = true): boolean {
  const match = !isRoot && item.value === activeValue;

  if (match) return true;

  return item?.children?.some(child => isChildActive(child, activeValue, false)) ?? false;
}

export function filterHiddenMenus<T extends TreeMenuBaseOptionData>(menus?: TreeMenuOptionData<T>[]) {
  if (!menus) return [];

  return menus
    ?.filter(menu => !menu.hidden)
    .map(menu => {
      const newMenu = menu;
      if (newMenu.children && newMenu.children.length > 0) {
        newMenu.children = filterHiddenMenus(newMenu.children);
      }
      return newMenu;
    });
}
