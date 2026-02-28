import {
  TableRootProps,
  TableContentProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableHeadProps,
  TableRowProps,
  TableCellProps,
  TableCaptionProps,
  TableUi
} from '@soybeanjs/headless';
import type { Path, PathValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type BaseTableData = Record<string, any>;

export type TableAlign = 'left' | 'center' | 'right' | 'justify' | 'char';

type TableColumnType = 'index' | 'selection' | 'expand';

export interface TableColumn<T extends BaseTableData = BaseTableData> {
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
>
  extends TableRootProps, TableSelectionProps<R, M> {
  /**
   * Additional class names to apply to the table.
   */
  class?: string;
  ui?: Partial<TableUi>;
  size?: ThemeSize;
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
  captionProps?: TableCaptionProps;
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
  'header-selection'?: (props: { column: TableColumn<T>; multiple: boolean }) => any;
  'header-expand'?: (props: { column: TableColumn<T> }) => any;
  index?: (props: { index: number; column: TableColumn<T>; row: T }) => any;
  selection?: (props: { index: number; column: TableColumn<T>; row: T; multiple: boolean }) => any;
  expand?: (props: {
    index: number;
    column: TableColumn<T>;
    row: T;
    expanded: boolean;
    toggleExpand: () => void;
  }) => any;
  'expanded-row'?: (props: { index: number; row: T }) => any;
  footer?: () => any;
};

export interface TableRadioProps {
  size?: ThemeSize;
  checked?: boolean;
}
