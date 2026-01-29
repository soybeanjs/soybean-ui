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

export function getActivePaths(targetValue: string, items: TreeMenuOptionData[]) {
  const paths: string[] = [];

  if (!targetValue) {
    return paths;
  }

  function dfs(node: TreeMenuOptionData, path: string[]): string[] | null {
    const currentPath = [...path, node.value];

    // if find the target value, return the path
    if (node.value === targetValue) {
      return currentPath;
    }

    // if there are child nodes, recursively search
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const result = dfs(child, currentPath);
        if (result) {
          return result;
        }
      }
    }

    // if not found, return null
    return null;
  }

  for (const item of items) {
    const result = dfs(item, []);
    if (result) {
      paths.push(...result);
      break; // exit loop once found
    }
  }

  return paths;
}
