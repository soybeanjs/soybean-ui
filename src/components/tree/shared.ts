import type { FlattenedItem, TreeItemData } from './types';

export const TREE_SELECT = 'tree.select';
export const TREE_TOGGLE = 'tree.toggle';

export function flattenItems<T extends TreeItemData>(
  items?: T[],
  expandedValues?: string[],
  level: number = 1,
  parent?: T
): FlattenedItem<T>[] {
  if (!items) return [];

  return items.reduce((acc: FlattenedItem<T>[], item: T, index: number) => {
    const children = item.children as T[];
    const isExpanded = expandedValues?.includes(item.value);

    const flattenedItem: FlattenedItem<T> = {
      _id: item.value,
      value: item.value,
      data: item,
      index,
      level,
      parent,
      hasChildren: Boolean(children),
      bind: {
        data: item,
        level,
        'aria-setsize': items.length,
        'aria-posinset': index + 1
      }
    };
    acc.push(flattenedItem);

    if (children && isExpanded) {
      acc.push(...flattenItems(children, expandedValues, level + 1, item));
    }

    return acc;
  }, []);
}
