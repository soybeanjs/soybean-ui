import type { TreeMenuBaseOptionData, TreeMenuOptionData } from './types';

export const treeMenuCssVars = {
  collapsedWidth: '--soybean-tree-menu-collapsed-width',
  indent: '--soybean-tree-menu-indent'
};

export function filterHiddenMenus<T extends TreeMenuBaseOptionData>(menus?: TreeMenuOptionData<T>[]) {
  if (!menus) return [];

  return menus
    ?.filter(menu => !menu.hidden)
    .map(menu => {
      const newMenu = { ...menu };
      if (newMenu.children && newMenu.children.length > 0) {
        newMenu.children = filterHiddenMenus(newMenu.children);
      }
      return newMenu;
    });
}
