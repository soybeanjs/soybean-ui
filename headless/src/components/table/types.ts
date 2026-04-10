import { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type { CheckedState, Path, PathValue } from '../../types';

export interface TableRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableContentProps extends /** @vue-ignore */ TableHTMLAttributes {}

export interface TableHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableBodyProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableRowProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableHeadProps extends /** @vue-ignore */ ThHTMLAttributes {}

export interface TableCellProps extends /** @vue-ignore */ TdHTMLAttributes {}

export type TableUiSlot = 'root' | 'content' | 'header' | 'body' | 'footer' | 'row' | 'head' | 'cell';

export type TableUi = UiClass<TableUiSlot>;

export type BaseTableData = Record<string, any>;

export type TableAlign = 'left' | 'center' | 'right';

export type TableColumnType = 'index' | 'selection' | 'expand';

export interface TableColumn<T = BaseTableData> {
  type?: TableColumnType;
  dataIndex?: Path<T>;
  title?: string;
  align?: TableAlign;
  width?: string;
  hidden?: boolean;
}

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
  'update:expanded': [expanded: R[]];
  'update:selected': [selected: M extends true ? R[] : R | undefined];
};

export type TableSlots<T extends BaseTableData> = {
  [K in `header-${Path<T>}`]?: (props: { column: TableColumn<T> }) => any;
} & {
  [K in Path<T>]?: (props: { index: number; column: TableColumn<T>; row: T; value: PathValue<T, K> }) => any;
} & {
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
