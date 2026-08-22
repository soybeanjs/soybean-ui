import type { MenuOptionData } from '../menu/types';
import type { TreeMenuOptionData } from '../tree-menu/types';
import type { SplitMenuBaseOptionData, SplitMenuMode, SplitMenuOptionData, SplitMenuPanelDescriptor } from './types';

/**
 * Map a {@link SplitMenuMode} to its layout rows.
 *
 * The menu is split into one or more rows; each row is a horizontal group of
 * panels. Row 0 is rendered at the top. This mirrors the visual layout:
 *
 * - `dual-vertical`: one row of two vertical columns.
 * - `vertical-horizontal`: one row of a vertical rail + a horizontal bar.
 * - `horizontal-vertical`: a top horizontal bar, then a vertical column.
 * - `horizontal-dual-vertical`: a top horizontal bar, then two vertical columns.
 */
export function getSplitMenuRows(mode: SplitMenuMode): SplitMenuPanelDescriptor[][] {
  const rows: Record<SplitMenuMode, SplitMenuPanelDescriptor[][]> = {
    'dual-vertical': [
      [
        { depth: 1, orientation: 'vertical' },
        { depth: 2, orientation: 'vertical' }
      ]
    ],
    'vertical-horizontal': [
      [
        { depth: 1, orientation: 'vertical' },
        { depth: 2, orientation: 'horizontal' }
      ]
    ],
    'horizontal-vertical': [[{ depth: 1, orientation: 'horizontal' }], [{ depth: 2, orientation: 'vertical' }]],
    'horizontal-dual-vertical': [
      [{ depth: 1, orientation: 'horizontal' }],
      [
        { depth: 2, orientation: 'vertical' },
        { depth: 3, orientation: 'vertical' }
      ]
    ]
  };

  return rows[mode];
}

/**
 * Resolve the active value at each depth of the menu tree for a given value.
 *
 * Returns an array where `values[0]` is the active level-1 value, `values[1]`
 * the active level-2 value, and so on. Values are derived by walking the tree
 * toward `modelValue`; only depths containing a matched value are present.
 */
export function getSplitMenuActiveValues<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  items: SplitMenuOptionData<T>[],
  modelValue: string
): string[] {
  if (!modelValue) {
    return [];
  }

  return findActivePath(items, modelValue);
}

function findActivePath<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  items: SplitMenuOptionData<T>[],
  target: string,
  path: string[] = []
): string[] {
  for (const item of items) {
    const currentPath = [...path, item.value];

    if (item.value === target) {
      return currentPath;
    }

    if (item.children?.length) {
      const result = findActivePath(item.children as SplitMenuOptionData<T>[], target, currentPath);

      if (result.length) {
        return result;
      }
    }
  }

  return [];
}

/**
 * Slice the full menu tree to the items a panel at `depth` should render.
 *
 * - depth 1 renders the top-level items.
 * - depth 2 renders the children of the active level-1 item.
 * - depth 3 renders the children of the active level-2 item.
 */
export function sliceSplitMenuItems<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  items: SplitMenuOptionData<T>[],
  activeValues: string[],
  depth: number
): SplitMenuOptionData<T>[] {
  if (depth === 1) {
    return items;
  }

  let current = items;
  let active = activeValues[0];

  for (let level = 1; level < depth; level += 1) {
    const parent = current.find((item: SplitMenuOptionData<T>) => item.value === active);

    if (!parent?.children?.length) {
      return [];
    }

    current = parent.children as SplitMenuOptionData<T>[];
    active = activeValues[level];
  }

  return current;
}

/**
 * Whether a menu node with `value` contains visible children.
 */
export function hasSplitMenuChildren<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  items: SplitMenuOptionData<T>[],
  value: string
): boolean {
  return Boolean(findNode(items, value)?.children?.length);
}

function findNode<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  items: SplitMenuOptionData<T>[],
  value: string
): SplitMenuOptionData<T> | undefined {
  for (const item of items) {
    if (item.value === value) {
      return item;
    }

    if (item.children?.length) {
      const found = findNode(item.children as SplitMenuOptionData<T>[], value);

      if (found) {
        return found;
      }
    }
  }

  return undefined;
}

/**
 * Map a list of {@link SplitMenuOptionData} to `TreeMenuOptionData[]`, pruning
 * hidden nodes, for the vertical `TreeMenuCompact`.
 */
export function toSplitMenuTreeOptions<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  data: SplitMenuOptionData<T>[]
): TreeMenuOptionData[] {
  return data.filter(item => !item.hidden).map(toSplitMenuTreeOption);
}

function toSplitMenuTreeOption<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  data: SplitMenuOptionData<T>
): TreeMenuOptionData {
  const children = data.children?.length ? toSplitMenuTreeOptions(data.children) : undefined;

  return {
    value: data.value,
    label: data.label,
    icon: data.icon,
    disabled: data.disabled,
    badge: data.badge,
    tag: data.tag,
    children: children?.length ? children : undefined
  };
}

/**
 * Map a list of {@link SplitMenuOptionData} to `MenuOptionData[]`, pruning
 * hidden nodes, for the horizontal `MenubarCompact`.
 */
export function toSplitMenuOptionData<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  data: SplitMenuOptionData<T>[]
): MenuOptionData[] {
  return data.filter(item => !item.hidden).map(toMenuOption);
}

function toMenuOption<T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData>(
  data: SplitMenuOptionData<T>
): MenuOptionData {
  const children = data.children?.length ? toSplitMenuOptionData(data.children) : undefined;

  return {
    value: data.value,
    label: data.label,
    icon: data.icon,
    disabled: data.disabled,
    shortcut: data.shortcut,
    separator: data.separator,
    children: children?.length ? children : undefined
  };
}
