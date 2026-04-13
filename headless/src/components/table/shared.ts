import type { CSSProperties } from 'vue';
import type { CheckedState, Path, PathValue } from '../../types';
import type {
  TableBaseData,
  TableColumn,
  TableColumnFilterOption,
  TableColumnWidthState,
  TableDataColumn,
  TableFixedColumnOffsets,
  TableFixedState,
  TableFilterState,
  TableFilterValue,
  TableGroupColumn,
  TableHeaderCell,
  TableRowChildrenResolver,
  TableRowValue,
  TableSortOrder,
  TableSortState,
  TableTreeNode,
  TableTreeRow,
  TableVirtualRange,
  TableVisibleRow,
  TableVirtualMeasurement
} from './types';

const tableColumnFallbackKeys = new WeakMap<object, string>();

let tableColumnFallbackKeyCount = 0;

/**
 * Get a human-readable row label for built-in table a11y text.
 *
 * Falls back to common display fields (`name`, `title`, `label`) before using the row key.
 */
export function getTableRowLabel<T extends TableBaseData, R extends string | number>(row: T, rowKey: (row: T) => R) {
  const candidate = row.name ?? row.title ?? row.label;

  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate;
  }

  return String(rowKey(row));
}

export function getTableRowChildren<T extends TableBaseData>(row: T, getChildren?: TableRowChildrenResolver<T>) {
  if (getChildren) {
    return getChildren(row) ?? [];
  }

  return Array.isArray(row.children) ? (row.children as T[]) : [];
}

export function buildTableTree<T extends TableBaseData, R extends string | number>(
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

export function flattenTableTree<T extends TableBaseData, R extends string | number>(
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

export function filterTableTree<T extends TableBaseData, R extends string | number>(
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

export function sortTableTree<T extends TableBaseData, R extends string | number>(
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

export function collectTableTreeExpandableKeys<T extends TableBaseData, R extends string | number>(
  nodes: TableTreeNode<T, R>[],
  includeLeaves: boolean = false
): R[] {
  return nodes.flatMap(node => {
    const keys = includeLeaves || node.hasChildren ? [node.key] : [];

    return [...keys, ...collectTableTreeExpandableKeys(node.children, includeLeaves)];
  });
}

export function hasTableTreeChildren<T extends TableBaseData, R extends string | number>(
  nodes: TableTreeNode<T, R>[]
): boolean {
  return nodes.some(node => node.hasChildren || hasTableTreeChildren(node.children));
}

export function getTableTreeRows<T extends TableBaseData, R extends string | number>(
  nodes: TableTreeNode<T, R>[]
): T[] {
  return nodes.flatMap(node => [node.row, ...getTableTreeRows(node.children)]);
}

export function getTableRowValueByDataIndex<T extends TableBaseData, K extends Path<TableRowValue<T>>>(
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

export function getTableColumnKey<T extends TableBaseData>(column: TableColumn<T>) {
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

export function isTableGroupColumn<T extends TableBaseData>(column: TableColumn<T>): column is TableGroupColumn<T> {
  return Array.isArray(column.children) && column.children.length > 0;
}

export function isTableDataColumn<T extends TableBaseData>(column: TableColumn<T>): column is TableDataColumn<T> {
  return typeof column.dataIndex === 'string';
}

export function isTableColumnResizable<T extends TableBaseData>(column: TableColumn<T>): boolean {
  return !isTableGroupColumn(column) && Boolean(column.resizable);
}

export function isTableSortableColumn<T extends TableBaseData>(column: TableColumn<T>): column is TableDataColumn<T> {
  return isTableDataColumn(column) && Boolean(column.sorter);
}

export function isTableFilterableColumn<T extends TableBaseData>(column: TableColumn<T>): column is TableDataColumn<T> {
  return isTableDataColumn(column) && Boolean(column.filter);
}

export function filterTableColumns<T extends TableBaseData>(columns: TableColumn<T>[]): TableColumn<T>[] {
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

export function getTableLeafColumns<T extends TableBaseData>(columns: TableColumn<T>[]): TableColumn<T>[] {
  return columns.flatMap(column => {
    if (isTableGroupColumn(column)) {
      return getTableLeafColumns(column.children);
    }

    return [column];
  });
}

export function getTableHeaderRows<T extends TableBaseData>(columns: TableColumn<T>[]) {
  const rows: TableHeaderCell<T>[][] = [];
  const maxDepth = getTableColumnMaxDepth(columns);

  walkHeaderRows(columns, rows, maxDepth, 0);

  return rows;
}

function walkHeaderRows<T extends TableBaseData>(
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

function getTableColumnMaxDepth<T extends TableBaseData>(columns: TableColumn<T>[]): number {
  return columns.reduce((maxDepth, column) => {
    if (!isTableGroupColumn(column)) {
      return maxDepth;
    }

    return Math.max(maxDepth, getTableColumnMaxDepth(column.children) + 1);
  }, 1);
}

export function getTableColumnByKey<T extends TableBaseData>(
  columns: TableColumn<T>[],
  key: string
): TableColumn<T> | undefined {
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

export function getTableRootStyle(isVirtual: boolean, height?: number | string): CSSProperties {
  if (!isVirtual) {
    return {};
  }

  return {
    height: typeof height === 'number' ? `${height}px` : height
  };
}

export function getDefaultTableExpandedKeys<T extends TableBaseData, R extends string | number>(
  rows: T[],
  rowKey: (row: T) => R,
  options: {
    getChildren?: TableRowChildrenResolver<T>;
    defaultExpandAll?: boolean;
    defaultExpanded?: R[];
    includeLeaves?: boolean;
  }
): R[] {
  if (options.defaultExpandAll) {
    return collectTableTreeExpandableKeys(
      buildTableTree(rows, rowKey, options.getChildren),
      options.includeLeaves ?? false
    );
  }

  return options.defaultExpanded ?? [];
}

export function getProcessedTableTree<T extends TableBaseData, R extends string | number>(
  sourceTree: TableTreeNode<T, R>[],
  filterState: TableFilterState,
  columnMap: Map<string, TableColumn<T>>,
  sortState: TableSortState | undefined
): TableTreeNode<T, R>[] {
  const filtered = filterTableTree(sourceTree, row => {
    return Object.entries(filterState).every(([key, filterValue]) => {
      const column = columnMap.get(key);

      if (!column || !isTableDataColumn(column) || !column.filter) {
        return true;
      }

      return matchesTableColumnFilter(row, column, filterValue);
    });
  });

  if (!sortState) {
    return filtered;
  }

  const column = columnMap.get(sortState.key);

  if (!column || !isTableDataColumn(column) || !column.sorter) {
    return filtered;
  }

  return sortTableTree(filtered, column, sortState);
}

export function getTableVisibleExpandedKeys<T extends TableBaseData, R extends string | number>(
  hasTreeRows: boolean,
  isFiltering: boolean,
  expandedKeys: R[],
  processedTree: TableTreeNode<T, R>[]
): R[] {
  if (!hasTreeRows || !isFiltering) {
    return expandedKeys;
  }

  return [...new Set([...expandedKeys, ...collectTableTreeExpandableKeys(processedTree)])];
}

export function getTableTreeColumnKey<T extends TableBaseData>(leafColumns: TableColumn<T>[]) {
  const column = leafColumns.find(isTableDataColumn);

  return column ? getTableColumnKey(column) : undefined;
}

export function getTableResolvedHeight(viewportHeight: number, height?: number | string): number {
  if (viewportHeight > 0) {
    return viewportHeight;
  }

  if (typeof height === 'number') {
    return height;
  }

  const parsedHeight = Number.parseFloat(height ?? '');

  return Number.isFinite(parsedHeight) ? parsedHeight : 0;
}

export function getTableEstimatedRowSize<T extends TableBaseData>(
  estimateSize: number | ((index: number, row: T) => number) | undefined,
  index: number,
  row: T
): number {
  if (typeof estimateSize === 'function') {
    return estimateSize(index, row);
  }

  return estimateSize ?? 40;
}

export function findTableVirtualStartIndex(measurements: TableVirtualMeasurement[], scrollTop: number): number {
  let low = 0;
  let high = measurements.length - 1;
  let result = measurements.length - 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const measurement = measurements[middle];

    if (measurement.end > scrollTop) {
      result = middle;
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }

  return result;
}

export function getTableVirtualMeasurements<T extends TableBaseData, R extends string | number>(
  rows: TableTreeRow<T, R>[],
  estimateSize: number | ((index: number, row: T) => number) | undefined
): TableVirtualMeasurement[] {
  let start = 0;

  return rows.map((item, index) => {
    const size = getTableEstimatedRowSize(estimateSize, index, item.row);
    const measurement = {
      index,
      start,
      end: start + size
    };

    start += size;

    return measurement;
  });
}

export function getTableVirtualRange(params: {
  isVirtual: boolean;
  rowCount: number;
  viewportHeight: number;
  scrollTop: number;
  measurements: TableVirtualMeasurement[];
  overscan: number;
}): TableVirtualRange {
  if (!params.isVirtual) {
    return {
      startIndex: 0,
      endIndex: params.rowCount - 1
    };
  }

  if (params.measurements.length === 0) {
    return {
      startIndex: 0,
      endIndex: -1
    };
  }

  let startIndex = findTableVirtualStartIndex(params.measurements, params.scrollTop);
  let endIndex = startIndex;

  while (
    endIndex < params.measurements.length &&
    params.measurements[endIndex].start < params.scrollTop + params.viewportHeight
  ) {
    endIndex += 1;
  }

  startIndex = Math.max(0, startIndex - params.overscan);
  endIndex = Math.min(params.measurements.length - 1, endIndex + params.overscan);

  return {
    startIndex,
    endIndex
  };
}

export function getTableVirtualPaddingStart(
  isVirtual: boolean,
  range: TableVirtualRange,
  measurements: TableVirtualMeasurement[]
): number {
  if (!isVirtual || range.startIndex < 0) {
    return 0;
  }

  return measurements[range.startIndex]?.start ?? 0;
}

export function getTableVirtualPaddingEnd(
  isVirtual: boolean,
  range: TableVirtualRange,
  measurements: TableVirtualMeasurement[]
): number {
  if (!isVirtual || range.endIndex < 0) {
    return 0;
  }

  const totalSize = measurements.at(-1)?.end ?? 0;
  const end = measurements[range.endIndex]?.end ?? 0;

  return Math.max(totalSize - end, 0);
}

export function getTableVisibleRows<T extends TableBaseData, R extends string | number>(
  rows: TableTreeRow<T, R>[],
  isVirtual: boolean,
  range: TableVirtualRange
): TableVisibleRow<T, R>[] {
  if (!isVirtual) {
    return rows.map((item, index) => ({
      index,
      item
    }));
  }

  if (range.endIndex < range.startIndex) {
    return [];
  }

  return rows.slice(range.startIndex, range.endIndex + 1).map((item, offset) => ({
    index: range.startIndex + offset,
    item
  }));
}

export function getNextTableExpandedKeys<R extends string | number>(expandedKeys: R[], key: R): R[] {
  if (expandedKeys.includes(key)) {
    return expandedKeys.filter(expandedKey => expandedKey !== key);
  }

  return [...expandedKeys, key];
}

export function isTableRowExpanded<R extends string | number>(expandedKeys: R[], key: R): boolean {
  return expandedKeys.includes(key);
}

export function getTableHeaderSelectionState<R extends string | number>(
  selectedValues: R | R[] | undefined,
  visibleRowKeys: R[]
): CheckedState {
  if (!Array.isArray(selectedValues) || visibleRowKeys.length === 0) {
    return false;
  }

  const selectedValuesSet = new Set(selectedValues);
  const selectedCount = visibleRowKeys.filter(value => selectedValuesSet.has(value)).length;

  if (selectedCount === 0) {
    return false;
  }

  if (selectedCount === visibleRowKeys.length) {
    return true;
  }

  return 'indeterminate';
}

export function isTableTreeColumn<T extends TableBaseData>(
  column: TableColumn<T>,
  hasTreeRows: boolean,
  treeColumnKey: string | undefined
): boolean {
  return isTableDataColumn(column) && hasTreeRows && getTableColumnKey(column) === treeColumnKey;
}

export function shouldShowTableInlineTreeToggle<T extends TableBaseData>(
  column: TableColumn<T>,
  hasTreeRows: boolean,
  treeColumnKey: string | undefined,
  hasExpandColumn: boolean
): boolean {
  return isTableTreeColumn(column, hasTreeRows, treeColumnKey) && !hasExpandColumn;
}

export function getTableTreeCellStyle(hasTreeRows: boolean, level: number, indent: number): CSSProperties | undefined {
  if (!hasTreeRows) {
    return undefined;
  }

  return {
    paddingInlineStart: `${Math.max(level - 1, 0) * indent}px`
  };
}

export function canTableExpandRow<T extends TableBaseData, R extends string | number>(
  row: TableTreeRow<T, R>,
  hasExpandedRowSlot: boolean
): boolean {
  return row.hasChildren || hasExpandedRowSlot;
}

export function shouldRenderTableExpandedRow<T extends TableBaseData, R extends string | number>(
  row: TableTreeRow<T, R>,
  options: {
    hasExpandColumn: boolean;
    hasExpandedRowSlot: boolean;
    expandedKeys: R[];
  }
): boolean {
  return (
    options.hasExpandColumn &&
    options.hasExpandedRowSlot &&
    !row.hasChildren &&
    isTableRowExpanded(options.expandedKeys, row.key)
  );
}

export function getTableFixedColumnOffsets<T extends TableBaseData>(
  leafColumns: TableColumn<T>[],
  getWidth: (column: TableColumn<T>) => number
): TableFixedColumnOffsets {
  const leftOffsets: Record<string, number> = {};
  const rightOffsets: Record<string, number> = {};
  let accumulatedLeft = 0;
  let accumulatedRight = 0;

  leafColumns.forEach(column => {
    if (column.fixed !== 'left') {
      return;
    }

    const key = getTableColumnKey(column);
    leftOffsets[key] = accumulatedLeft;
    accumulatedLeft += getWidth(column);
  });

  [...leafColumns].reverse().forEach(column => {
    if (column.fixed !== 'right') {
      return;
    }

    const key = getTableColumnKey(column);
    rightOffsets[key] = accumulatedRight;
    accumulatedRight += getWidth(column);
  });

  return {
    leftOffsets,
    rightOffsets
  };
}

export function getTableLeafFixedState<T extends TableBaseData>(
  column: TableColumn<T>,
  offsets: TableFixedColumnOffsets
): TableFixedState | undefined {
  const key = getTableColumnKey(column);

  if (column.fixed === 'left') {
    return {
      side: 'left',
      offset: offsets.leftOffsets[key] ?? 0
    };
  }

  if (column.fixed === 'right') {
    return {
      side: 'right',
      offset: offsets.rightOffsets[key] ?? 0
    };
  }

  return undefined;
}

export function getTableHeaderFixedState<T extends TableBaseData>(
  column: TableColumn<T>,
  offsets: TableFixedColumnOffsets
): TableFixedState | undefined {
  if (!isTableGroupColumn(column)) {
    return getTableLeafFixedState(column, offsets);
  }

  const leaves = getTableLeafColumns([column]);
  const fixedSides = [
    ...new Set(leaves.map(leaf => leaf.fixed).filter((side): side is 'left' | 'right' => Boolean(side)))
  ];

  if (fixedSides.length !== 1) {
    return undefined;
  }

  const boundaryColumn = fixedSides[0] === 'left' ? leaves[0] : leaves.at(-1);

  if (!boundaryColumn) {
    return undefined;
  }

  return getTableLeafFixedState(boundaryColumn, offsets);
}

export function getTableCellStyle(params: {
  width?: string;
  minWidth?: string;
  fixedState?: TableFixedState;
  zIndex?: number;
}): CSSProperties {
  return {
    width: params.width,
    minWidth: params.minWidth,
    position: params.fixedState ? 'sticky' : undefined,
    left: params.fixedState?.side === 'left' ? `${params.fixedState.offset}px` : undefined,
    right: params.fixedState?.side === 'right' ? `${params.fixedState.offset}px` : undefined,
    zIndex: params.fixedState ? params.zIndex : undefined
  };
}

export function getTableSpacerCellStyle(height: number): CSSProperties {
  return {
    height: `${height}px`,
    padding: 0,
    border: 0
  };
}

export function getNextTableColumnWidths(
  state: TableColumnWidthState,
  key: string,
  width: number
): TableColumnWidthState {
  return {
    ...state,
    [key]: `${Math.round(width)}px`
  };
}

export function getTableColumnResizeMinWidth(minWidth?: string): number {
  return parseTableColumnWidth(minWidth) ?? 80;
}

export function getTableMeasuredColumnWidth<T extends TableBaseData>(
  column: TableColumn<T>,
  columnWidths: TableColumnWidthState,
  measuredColumnWidths: Record<string, number>,
  fallbackWidth: number = 160
): number {
  const key = getTableColumnKey(column);
  const parsedWidth = parseTableColumnWidth(getTableColumnWidthValue(column, columnWidths));
  const measuredWidth = measuredColumnWidths[key];

  return parsedWidth ?? measuredWidth ?? fallbackWidth;
}

export function getTableMeasuredColumnWidths<T extends TableBaseData>(
  leafColumns: TableColumn<T>[],
  params: {
    columnWidths: TableColumnWidthState;
    headCellElements: Record<string, HTMLElement | null>;
    measuredColumnWidths: Record<string, number>;
  }
): Record<string, number> {
  return leafColumns.reduce<Record<string, number>>((acc, column) => {
    const key = getTableColumnKey(column);
    const parsedWidth = parseTableColumnWidth(getTableColumnWidthValue(column, params.columnWidths));
    const measuredWidth = params.headCellElements[key]?.getBoundingClientRect().width;

    acc[key] =
      parsedWidth ??
      measuredWidth ??
      getTableMeasuredColumnWidth(column, params.columnWidths, params.measuredColumnWidths);

    return acc;
  }, {});
}

export function getTableColumnSortOrder<T extends TableBaseData>(
  column: TableColumn<T>,
  sortState: TableSortState | undefined
): TableSortOrder | undefined {
  if (!isTableSortableColumn(column)) {
    return undefined;
  }

  const key = getTableColumnKey(column);

  return sortState?.key === key ? sortState.order : undefined;
}

export function getTableSortIndicator(order: TableSortOrder | undefined): string {
  if (order === 'asc') return '↑';
  if (order === 'desc') return '↓';

  return '↕';
}

export function getTableColumnLabel<T extends TableBaseData>(column: TableColumn<T>): string {
  return column.title ?? getTableColumnKey(column);
}

export function getTableSortButtonLabel(columnLabel: string, order: TableSortOrder | undefined): string {
  if (order === 'asc') {
    return `Sort by ${columnLabel}, currently ascending`;
  }

  if (order === 'desc') {
    return `Sort by ${columnLabel}, currently descending`;
  }

  return `Sort by ${columnLabel}`;
}

export function getTableResizeHandleLabel(columnLabel: string): string {
  return `Resize ${columnLabel} column`;
}

export function getTableRowExpandLabel(rowLabel: string, expanded: boolean): string {
  return expanded ? `Collapse row ${rowLabel}` : `Expand row ${rowLabel}`;
}

export function getTableSelectRowLabel(rowLabel: string): string {
  return `Select row ${rowLabel}`;
}

export function getNextTablePointerResizeWidth(
  startWidth: number,
  startX: number,
  currentX: number,
  minWidth: number
): number {
  return Math.max(minWidth, startWidth + (currentX - startX));
}

export function getNextTableKeyboardResizeWidth(
  currentWidth: number,
  direction: 'decrease' | 'increase',
  minWidth: number,
  step: number = 16
): number {
  const delta = direction === 'increase' ? step : -step;

  return Math.max(minWidth, currentWidth + delta);
}

export function getTableColumnFilterValue(state: TableFilterState, key: string): string {
  return normalizeTableColumnFilterValue(state[key]).keyword ?? '';
}

export function getTableColumnFilterValues(state: TableFilterState, key: string): string[] {
  return normalizeTableColumnFilterValue(state[key]).values;
}

export function getTableColumnFilterStateValue(state: TableFilterState, key: string): TableFilterValue | undefined {
  return state[key];
}

export function isTableColumnFiltered(state: TableFilterState, key: string): boolean {
  const value = normalizeTableColumnFilterValue(state[key]);

  return value.keyword.length > 0 || value.values.length > 0;
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

export function getNextTableFilterState(
  state: TableFilterState,
  key: string,
  value: TableFilterValue | undefined
): TableFilterState {
  const nextState = { ...state };
  const normalizedValue = normalizeTableColumnFilterValue(value);

  if (normalizedValue.keyword.length === 0 && normalizedValue.values.length === 0) {
    delete nextState[key];
    return nextState;
  }

  nextState[key] = toTableFilterStateValue(normalizedValue);

  return nextState;
}

export function getNextTableFilterKeywordState(
  state: TableFilterState,
  key: string,
  keyword: string
): TableFilterState {
  return getNextTableFilterState(state, key, {
    ...normalizeTableColumnFilterValue(state[key]),
    keyword
  });
}

export function getNextTableFilterValuesState(
  state: TableFilterState,
  key: string,
  values: string[]
): TableFilterState {
  return getNextTableFilterState(state, key, {
    ...normalizeTableColumnFilterValue(state[key]),
    values
  });
}

export function toggleTableFilterOption(state: TableFilterState, key: string, value: string): TableFilterState {
  const currentValues = getTableColumnFilterValues(state, key);
  const nextValues = currentValues.includes(value)
    ? currentValues.filter(currentValue => currentValue !== value)
    : [...currentValues, value];

  return getNextTableFilterValuesState(state, key, nextValues);
}

export function isTableFilterOptionSelected(state: TableFilterState, key: string, value: string): boolean {
  return getTableColumnFilterValues(state, key).includes(value);
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

export function sortTableData<T extends TableBaseData>(
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

export function getTableFilterPlaceholder<T extends TableBaseData>(column: TableDataColumn<T>) {
  if (typeof column.filter === 'object') {
    return column.filter.placeholder;
  }

  return undefined;
}

export function getTableColumnFilterOptions<T extends TableBaseData>(
  rows: T[],
  column: TableDataColumn<T>
): TableColumnFilterOption[] {
  if (typeof column.filter === 'object' && column.filter.options) {
    return typeof column.filter.options === 'function'
      ? column.filter.options({ rows, column })
      : column.filter.options;
  }

  const seenValues = new Set<string>();

  return rows.reduce<TableColumnFilterOption[]>((acc, row) => {
    const optionValue = String(getTableRowValueByDataIndex(row, column.dataIndex) ?? '');

    if (!optionValue || seenValues.has(optionValue)) {
      return acc;
    }

    seenValues.add(optionValue);
    acc.push({
      label: optionValue,
      value: optionValue
    });

    return acc;
  }, []);
}

export function matchesTableColumnFilter<T extends TableBaseData>(
  row: T,
  column: TableDataColumn<T>,
  filterValue: TableFilterValue | undefined
) {
  const value = getTableRowValueByDataIndex(row, column.dataIndex);
  const normalizedValue = normalizeTableColumnFilterValue(filterValue);

  if (typeof column.filter === 'object' && column.filter.match) {
    return column.filter.match({
      filterValue: normalizedValue,
      keyword: normalizedValue.keyword,
      values: normalizedValue.values,
      row,
      value,
      column
    });
  }

  const normalizedRowValue = String(value ?? '');
  const matchesKeyword =
    normalizedValue.keyword.length === 0 ||
    normalizedRowValue.toLowerCase().includes(normalizedValue.keyword.toLowerCase());
  const matchesValues = normalizedValue.values.length === 0 || normalizedValue.values.includes(normalizedRowValue);

  return matchesKeyword && matchesValues;
}

export function normalizeTableColumnFilterValue(value: TableFilterValue | undefined): {
  keyword: string;
  values: string[];
} {
  if (typeof value === 'string') {
    return {
      keyword: value,
      values: []
    };
  }

  return {
    keyword: value?.keyword ?? '',
    values: Array.isArray(value?.values) ? [...new Set(value.values.filter(Boolean))] : []
  };
}

function toTableFilterStateValue(value: { keyword: string; values: string[] }): TableFilterValue {
  if (value.values.length === 0) {
    return value.keyword;
  }

  return {
    keyword: value.keyword || undefined,
    values: value.values
  };
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

export function getTableColumnWidthValue<T extends TableBaseData>(
  column: TableColumn<T>,
  columnWidths?: TableColumnWidthState
) {
  const key = getTableColumnKey(column);

  return columnWidths?.[key] ?? column.width;
}
