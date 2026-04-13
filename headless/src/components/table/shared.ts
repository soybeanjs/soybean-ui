import type { Path, PathValue } from '../../types';
import type {
  BaseTableData,
  TableColumn,
  TableColumnWidthState,
  TableDataColumn,
  TableFilterState,
  TableGroupColumn,
  TableRowChildrenResolver,
  TableRowValue,
  TableSortOrder,
  TableSortState,
  TableTreeNode,
  TableTreeRow
} from './types';

const tableColumnFallbackKeys = new WeakMap<object, string>();

let tableColumnFallbackKeyCount = 0;

/**
 * Get a human-readable row label for built-in table a11y text.
 *
 * Falls back to common display fields (`name`, `title`, `label`) before using the row key.
 */
export function getTableRowLabel<T extends BaseTableData, R extends string | number>(row: T, rowKey: (row: T) => R) {
  const candidate = row.name ?? row.title ?? row.label;

  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate;
  }

  return String(rowKey(row));
}

export function getTableRowChildren<T extends BaseTableData>(row: T, getChildren?: TableRowChildrenResolver<T>) {
  if (getChildren) {
    return getChildren(row) ?? [];
  }

  return Array.isArray(row.children) ? (row.children as T[]) : [];
}

export function buildTableTree<T extends BaseTableData, R extends string | number>(
  rows: T[],
  rowKey: (row: T) => R,
  getChildren?: TableRowChildrenResolver<T>,
  level: number = 1,
  parentKey?: R
): TableTreeNode<T, R>[] {
  return rows.map(row => {
    const key = rowKey(row);
    const children = buildTableTree(getTableRowChildren(row, getChildren), rowKey, getChildren, level + 1, key);

    return {
      key,
      row,
      level,
      parentKey,
      children,
      hasChildren: children.length > 0
    };
  });
}

export function flattenTableTree<T extends BaseTableData, R extends string | number>(
  nodes: TableTreeNode<T, R>[],
  expandedKeys: R[]
): TableTreeRow<T, R>[] {
  const expandedKeySet = new Set(expandedKeys);
  const rows: TableTreeRow<T, R>[] = [];

  function walk(items: TableTreeNode<T, R>[]) {
    items.forEach(item => {
      rows.push({
        key: item.key,
        row: item.row,
        level: item.level,
        parentKey: item.parentKey,
        hasChildren: item.hasChildren
      });

      if (item.hasChildren && expandedKeySet.has(item.key)) {
        walk(item.children);
      }
    });
  }

  walk(nodes);

  return rows;
}

export function filterTableTree<T extends BaseTableData, R extends string | number>(
  nodes: TableTreeNode<T, R>[],
  predicate: (row: T) => boolean
): TableTreeNode<T, R>[] {
  return nodes.reduce<TableTreeNode<T, R>[]>((acc, node) => {
    const children = filterTableTree(node.children, predicate);
    const matched = predicate(node.row);

    if (!matched && children.length === 0) {
      return acc;
    }

    acc.push({
      ...node,
      children,
      hasChildren: children.length > 0
    });

    return acc;
  }, []);
}

export function sortTableTree<T extends BaseTableData, R extends string | number>(
  nodes: TableTreeNode<T, R>[],
  column: TableDataColumn<T>,
  sortState: TableSortState | undefined
): TableTreeNode<T, R>[] {
  const sorted = [...nodes].sort((current, next) => {
    const compareResult =
      typeof column.sorter === 'function'
        ? column.sorter(current.row, next.row)
        : getTableDefaultSortCompare(
            getTableRowValueByDataIndex(current.row, column.dataIndex),
            getTableRowValueByDataIndex(next.row, column.dataIndex)
          );

    return sortState?.order === 'desc' ? compareResult * -1 : compareResult;
  });

  return sorted.map(node => ({
    ...node,
    children: sortTableTree(node.children, column, sortState)
  }));
}

export function collectTableTreeExpandableKeys<T extends BaseTableData, R extends string | number>(
  nodes: TableTreeNode<T, R>[],
  includeLeaves: boolean = false
): R[] {
  return nodes.flatMap(node => {
    const keys = includeLeaves || node.hasChildren ? [node.key] : [];

    return [...keys, ...collectTableTreeExpandableKeys(node.children, includeLeaves)];
  });
}

export function hasTableTreeChildren<T extends BaseTableData, R extends string | number>(
  nodes: TableTreeNode<T, R>[]
): boolean {
  return nodes.some(node => node.hasChildren || hasTableTreeChildren(node.children));
}

export function getTableRowValueByDataIndex<T extends BaseTableData, K extends Path<TableRowValue<T>>>(
  row: T,
  dataIndex: K
): PathValue<TableRowValue<T>, K> {
  const keys = dataIndex.split('.');
  let value: any = row;

  for (const key of keys) {
    if (value == null) {
      return undefined as PathValue<TableRowValue<T>, K>;
    }

    value = value[key];
  }

  return value as PathValue<TableRowValue<T>, K>;
}

export function getTableColumnKey<T extends BaseTableData>(column: TableColumn<T>) {
  if (column.key) {
    return column.key;
  }

  if (column.dataIndex) {
    return column.dataIndex;
  }

  if (column.type) {
    return `__${column.type}`;
  }

  const cachedKey = tableColumnFallbackKeys.get(column);

  if (cachedKey) {
    return cachedKey;
  }

  tableColumnFallbackKeyCount += 1;

  const fallbackKey = `__group-${tableColumnFallbackKeyCount}`;

  tableColumnFallbackKeys.set(column, fallbackKey);

  return fallbackKey;
}

export function isTableGroupColumn<T extends BaseTableData>(column: TableColumn<T>): column is TableGroupColumn<T> {
  return Array.isArray(column.children) && column.children.length > 0;
}

export function isTableDataColumn<T extends BaseTableData>(column: TableColumn<T>): column is TableDataColumn<T> {
  return typeof column.dataIndex === 'string';
}

export function filterTableColumns<T extends BaseTableData>(columns: TableColumn<T>[]): TableColumn<T>[] {
  return columns.reduce<TableColumn<T>[]>((acc, column) => {
    if (column.hidden) {
      return acc;
    }

    if (!isTableGroupColumn(column)) {
      acc.push(column);
      return acc;
    }

    const children = filterTableColumns(column.children);

    if (children.length > 0) {
      acc.push({
        ...column,
        children
      });
    }

    return acc;
  }, []);
}

export function getTableLeafColumns<T extends BaseTableData>(columns: TableColumn<T>[]): TableColumn<T>[] {
  return columns.flatMap(column => {
    if (isTableGroupColumn(column)) {
      return getTableLeafColumns(column.children);
    }

    return [column];
  });
}

export interface TableHeaderCell<T extends BaseTableData> {
  key: string;
  column: TableColumn<T>;
  colSpan: number;
  rowSpan: number;
}

export function getTableHeaderRows<T extends BaseTableData>(columns: TableColumn<T>[]) {
  const rows: TableHeaderCell<T>[][] = [];
  const maxDepth = getTableColumnMaxDepth(columns);

  walkHeaderRows(columns, rows, maxDepth, 0);

  return rows;
}

function walkHeaderRows<T extends BaseTableData>(
  columns: TableColumn<T>[],
  rows: TableHeaderCell<T>[][],
  maxDepth: number,
  depth: number
) {
  rows[depth] ??= [];

  columns.forEach(column => {
    const key = getTableColumnKey(column);

    if (isTableGroupColumn(column)) {
      rows[depth].push({
        key,
        column,
        colSpan: getTableLeafColumns(column.children).length,
        rowSpan: 1
      });

      walkHeaderRows(column.children, rows, maxDepth, depth + 1);
      return;
    }

    rows[depth].push({
      key,
      column,
      colSpan: 1,
      rowSpan: maxDepth - depth
    });
  });
}

function getTableColumnMaxDepth<T extends BaseTableData>(columns: TableColumn<T>[]): number {
  return columns.reduce((maxDepth, column) => {
    if (!isTableGroupColumn(column)) {
      return maxDepth;
    }

    return Math.max(maxDepth, getTableColumnMaxDepth(column.children) + 1);
  }, 1);
}

export function getTableColumnByKey<T extends BaseTableData>(columns: TableColumn<T>[], key: string): TableColumn<T> | undefined {
  for (const column of columns) {
    if (getTableColumnKey(column) === key) {
      return column;
    }

    if (isTableGroupColumn(column)) {
      const childColumn = getTableColumnByKey(column.children, key);

      if (childColumn) {
        return childColumn;
      }
    }
  }

  return undefined;
}

export function toggleTableSortState(current: TableSortState | undefined, key: string): TableSortState | undefined {
  if (!current || current.key !== key) {
    return { key, order: 'asc' };
  }

  if (current.order === 'asc') {
    return { key, order: 'desc' };
  }

  return undefined;
}

export function getNextTableFilterState(state: TableFilterState, key: string, value: string): TableFilterState {
  const nextState = { ...state };

  if (value.trim().length === 0) {
    delete nextState[key];
    return nextState;
  }

  nextState[key] = value;

  return nextState;
}

export function getTableDefaultSortCompare(a: unknown, b: unknown) {
  if ((a === null || a === undefined) && (b === null || b === undefined)) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export function sortTableData<T extends BaseTableData>(
  data: T[],
  column: TableDataColumn<T>,
  sortState: TableSortState | undefined
) {
  if (!sortState) {
    return data;
  }

  const sorted = [...data].sort((current, next) => {
    const compareResult =
      typeof column.sorter === 'function'
        ? column.sorter(current, next)
        : getTableDefaultSortCompare(
            getTableRowValueByDataIndex(current, column.dataIndex),
            getTableRowValueByDataIndex(next, column.dataIndex)
          );

    return sortState.order === 'desc' ? compareResult * -1 : compareResult;
  });

  return sorted;
}

export function getTableFilterPlaceholder<T extends BaseTableData>(column: TableDataColumn<T>) {
  if (typeof column.filter === 'object') {
    return column.filter.placeholder;
  }

  return undefined;
}

export function matchesTableColumnFilter<T extends BaseTableData>(row: T, column: TableDataColumn<T>, keyword: string) {
  const value = getTableRowValueByDataIndex(row, column.dataIndex);

  if (typeof column.filter === 'object' && column.filter.match) {
    return column.filter.match({ keyword, row, value, column });
  }

  return String(value ?? '')
    .toLowerCase()
    .includes(keyword.toLowerCase());
}

export function getTableAriaSort(order?: TableSortOrder) {
  if (order === 'asc') return 'ascending';
  if (order === 'desc') return 'descending';

  return 'none';
}

export function parseTableColumnWidth(width?: string) {
  if (!width) {
    return undefined;
  }

  const normalizedWidth = width.trim();

  if (!normalizedWidth) {
    return undefined;
  }

  if (normalizedWidth.endsWith('px')) {
    const parsedWidth = Number.parseFloat(normalizedWidth.slice(0, -2));

    return Number.isFinite(parsedWidth) ? parsedWidth : undefined;
  }

  const parsedWidth = Number.parseFloat(normalizedWidth);

  return Number.isFinite(parsedWidth) ? parsedWidth : undefined;
}

export function getTableColumnWidthValue<T extends BaseTableData>(
  column: TableColumn<T>,
  columnWidths?: TableColumnWidthState
) {
  const key = getTableColumnKey(column);

  return columnWidths?.[key] ?? column.width;
}
