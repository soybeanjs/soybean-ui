import type { DefinedValue } from '../types';

interface BaseTree<T extends DefinedValue = DefinedValue> {
  value: T;
}

type Tree<T extends DefinedValue = DefinedValue, S extends BaseTree<T> = BaseTree<T>> = BaseTree<T> & {
  children?: S[];
};

export function getTreePaths<T extends DefinedValue = DefinedValue, S extends BaseTree<T> = BaseTree<T>>(
  targetValue: T,
  items: Tree<T, S>[]
) {
  const paths: T[] = [];

  if (!targetValue) {
    return paths;
  }

  function dfs(node: Tree<T, S>, path: T[]): T[] | null {
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
