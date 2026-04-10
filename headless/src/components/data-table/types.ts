import type {
  BaseTableData,
  TableAlign,
  TableColumn,
  TableColumnType,
  TableEmits,
  TableProps,
  TableSelectionProps,
  TableSlots
} from '../table/types';

export type BaseDataTableRow = BaseTableData;

export type DataTableAlign = TableAlign;

export type DataTableColumnType = TableColumnType;

export type DataTableColumn<T = BaseDataTableRow> = TableColumn<T>;

export type DataTableSelectionProps<R extends string | number = string | number, M extends boolean = false> = TableSelectionProps<
  R,
  M
>;

export type DataTableRootProps<
  T extends BaseDataTableRow = BaseDataTableRow,
  R extends string | number = string | number,
  M extends boolean = false
> = TableProps<T, R, M>;

export type DataTableRootEmits<R extends string | number, M extends boolean = false> = TableEmits<R, M>;

export type DataTableRootSlots<T extends BaseDataTableRow> = TableSlots<T>;
