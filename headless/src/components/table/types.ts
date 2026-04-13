import { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type { CheckedState, Path, PathValue } from '../../types';
import type { VirtualizerOptions } from '../virtualizer/types';

export interface TableRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableContentProps extends /** @vue-ignore */ TableHTMLAttributes {}

export interface TableHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableBodyProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableRowProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableHeadProps extends /** @vue-ignore */ ThHTMLAttributes {}

export interface TableCellProps extends /** @vue-ignore */ TdHTMLAttributes {}

export type TableUiSlot =
  | 'root'
  | 'content'
  | 'header'
  | 'body'
  | 'footer'
  | 'row'
  | 'head'
  | 'cell'
  | 'headContent'
  | 'fixed'
  | 'sortTrigger'
  | 'filterInput'
  | 'resizeHandle';

export type TableUi = UiClass<TableUiSlot>;

export type BaseTableData = Record<string, any>;

export type TableAlign = 'left' | 'center' | 'right';

export type TableColumnType = 'index' | 'selection' | 'expand';

export type TableSortOrder = 'asc' | 'desc';

export interface TableSortState {
  key: string;
  order: TableSortOrder;
}

export type TableFilterState = Record<string, string>;

export type TableColumnWidthState = Record<string, string>;

export interface TableVirtualMeasurement {
  index: number;
  start: number;
  end: number;
}

export interface TableColumnFilter<T = BaseTableData> {
  placeholder?: string;
  match?: (params: { keyword: string; row: T; value: unknown; column: TableDataColumn<T> }) => boolean;
}

export interface TableColumnBase {
  key?: string;
  title?: string;
  type?: TableColumnType;
  align?: TableAlign;
  width?: string;
  minWidth?: string;
  hidden?: boolean;
  fixed?: 'left' | 'right';
  resizable?: boolean;
}

export interface TableTypeColumn<_T = BaseTableData> extends TableColumnBase {
  type: TableColumnType;
  dataIndex?: never;
  children?: never;
  sorter?: never;
  filter?: never;
}

export interface TableDataColumn<T = BaseTableData> extends TableColumnBase {
  dataIndex: Path<T>;
  type?: never;
  children?: never;
  sorter?: boolean | ((a: T, b: T) => number);
  filter?: boolean | TableColumnFilter<T>;
}

export interface TableGroupColumn<T = BaseTableData> extends TableColumnBase {
  children: TableColumn<T>[];
  type?: never;
  dataIndex?: never;
  sorter?: never;
  filter?: never;
}

export type TableColumn<T = BaseTableData> = TableTypeColumn<T> | TableDataColumn<T> | TableGroupColumn<T>;

export interface TableSelectionProps<R extends string | number = string | number, M extends boolean = false> {
  defaultSelected?: M extends true ? R[] : R;
  selected?: M extends true ? R[] : R;
  multiple?: M;
}

export interface TableProps<
  T extends BaseTableData = BaseTableData,
  R extends string | number = string | number,
  M extends boolean = false
> extends TableRootProps,
    TableSelectionProps<R, M> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => R;
  defaultSortState?: TableSortState;
  sortState?: TableSortState;
  defaultFilterState?: TableFilterState;
  filterState?: TableFilterState;
  defaultColumnWidths?: TableColumnWidthState;
  columnWidths?: TableColumnWidthState;
  virtual?: boolean;
  height?: number | string;
  estimateSize?: number | ((index: number, row: T) => number);
  virtualizerOptions?: VirtualizerOptions;
  defaultExpanded?: R[];
  expanded?: R[];
  defaultExpandAll?: boolean;
  contentProps?: TableContentProps;
  headerProps?: TableHeaderProps;
  bodyProps?: TableBodyProps;
  footerProps?: TableFooterProps;
  headProps?: TableHeadProps;
  rowProps?: TableRowProps;
  cellProps?: TableCellProps;
}

export type TableEmits<R extends string | number, M extends boolean = false> = {
  'update:sortState': [state: TableSortState | undefined];
  'update:filterState': [state: TableFilterState];
  'update:columnWidths': [state: TableColumnWidthState];
  'update:expanded': [expanded: R[]];
  'update:selected': [selected: M extends true ? R[] : R | undefined];
};

export type TableSlots<T extends BaseTableData> = {
  [K in `header-${string}`]?: (props: TableHeaderSlotProps<T>) => any;
} & {
  [K in Path<T>]?: (props: { index: number; column: TableColumn<T>; row: T; value: PathValue<T, K> }) => any;
} & {
  header?: (props: TableHeaderSlotProps<T>) => any;
  'header-index'?: (props: { column: TableColumn<T> }) => any;
  'header-selection'?: (props: {
    column: TableColumn<T>;
    multiple: boolean;
    checked: CheckedState;
    disabled: boolean;
    updateChecked: (value: CheckedState | null) => void;
  }) => any;
  'header-expand'?: (props: { column: TableColumn<T> }) => any;
  index?: (props: { index: number; column: TableColumn<T>; row: T }) => any;
  selection?: (props: {
    index: number;
    column: TableColumn<T>;
    row: T;
    multiple: boolean;
    checked: boolean;
    toggleSelect: () => void;
  }) => any;
  expand?: (props: {
    index: number;
    column: TableColumn<T>;
    row: T;
    expanded: boolean;
    toggleExpand: () => void;
  }) => any;
  'expanded-row'?: (props: { index: number; row: T }) => any;
  footer?: (props: { columnSize: number }) => any;
};

export interface TableHeaderSlotProps<T extends BaseTableData> {
  column: TableColumn<T>;
  colSpan: number;
  rowSpan: number;
  sortable: boolean;
  resizable: boolean;
  sortOrder?: TableSortOrder;
  multiple?: boolean;
  checked?: CheckedState;
  disabled?: boolean;
  updateChecked?: (value: CheckedState | null) => void;
  toggleSort: () => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  clearFilter: () => void;
}
