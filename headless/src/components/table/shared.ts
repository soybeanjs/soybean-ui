import type { Path, PathValue } from '../../types';
import type {
  BaseTableData,
  TableColumn,
  TableDataColumn,
  TableFilterState,
  TableGroupColumn,
  TableSortOrder,
  TableSortState
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

export function getTableRowValueByDataIndex<T extends BaseTableData, K extends Path<T>>(row: T, dataIndex: K): PathValue<T, K> {
  const keys = dataIndex.split('.');
  let value: any = row;

  for (const key of keys) {
    if (value == null) {
      return undefined as PathValue<T, K>;
    }

    value = value[key];
  }

  return value as PathValue<T, K>;
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
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

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
