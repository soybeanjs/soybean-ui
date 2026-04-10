import type { CheckedState } from '../../types';
import type { Path, PathValue } from '../../types';
import type {
  TableBodyProps,
  TableCellProps,
  TableContentProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableRootProps,
  TableRowProps
} from '../table';

export type BaseDataTableRow = Record<string, any>;

export type DataTableAlign = 'left' | 'center' | 'right';

export type DataTableColumnType = 'index' | 'selection' | 'expand';

export interface DataTableColumn<T = BaseDataTableRow> {
  type?: DataTableColumnType;
  dataIndex?: Path<T>;
  title?: string;
  align?: DataTableAlign;
  width?: string;
  hidden?: boolean;
}

export interface DataTableSelectionProps<R extends string | number = string | number, M extends boolean = false> {
  defaultSelected?: M extends true ? R[] : R;
  selected?: M extends true ? R[] : R;
  multiple?: M;
}

export interface DataTableRootProps<
  T extends BaseDataTableRow = BaseDataTableRow,
  R extends string | number = string | number,
  M extends boolean = false
> extends TableRootProps,
    DataTableSelectionProps<R, M> {
  columns: DataTableColumn<T>[];
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

export type DataTableRootEmits<R extends string | number, M extends boolean = false> = {
  'update:expanded': [expanded: R[]];
  'update:selected': [selected: M extends true ? R[] : R | undefined];
};

export type DataTableRootSlots<T extends BaseDataTableRow> = {
  [K in `header-${Path<T>}`]?: (props: { column: DataTableColumn<T> }) => any;
} & {
  [K in Path<T>]?: (props: { index: number; column: DataTableColumn<T>; row: T; value: PathValue<T, K> }) => any;
} & {
  'header-index'?: (props: { column: DataTableColumn<T> }) => any;
  'header-selection'?: (props: {
    column: DataTableColumn<T>;
    multiple: boolean;
    checked: CheckedState;
    updateChecked: (value: CheckedState | null) => void;
  }) => any;
  'header-expand'?: (props: { column: DataTableColumn<T> }) => any;
  index?: (props: { index: number; column: DataTableColumn<T>; row: T }) => any;
  selection?: (props: {
    index: number;
    column: DataTableColumn<T>;
    row: T;
    multiple: boolean;
    checked: boolean;
    toggleSelect: () => void;
  }) => any;
  expand?: (props: {
    index: number;
    column: DataTableColumn<T>;
    row: T;
    expanded: boolean;
    toggleExpand: () => void;
  }) => any;
  'expanded-row'?: (props: { index: number; row: T }) => any;
  footer?: (props: { columnSize: number }) => any;
};
