import {
  BaseTableData as HeadlessBaseTableData,
  TableColumn as HeadlessTableColumn,
  TableColumnType as HeadlessTableColumnType,
  TableEmits as HeadlessTableEmits,
  TableProps as HeadlessTableProps,
  TableSlots as HeadlessTableSlots,
  TableUi
} from '@soybeanjs/headless/table';
import type { ClassValue, UiClass } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type BaseTableData = HeadlessBaseTableData;

export type TableExtraUiSlot = 'selection';

export type TableExtendedUi = UiClass<keyof TableUi | TableExtraUiSlot>;

export type TableColumnType = HeadlessTableColumnType;

export type TableColumn<T = BaseTableData> = HeadlessTableColumn<T>;

export interface TableProps<
  T extends BaseTableData = BaseTableData,
  R extends string | number = string | number,
  M extends boolean = false
> extends HeadlessTableProps<T, R, M> {
  /**
   * Additional class names to apply to the table.
   */
  class?: ClassValue;
  ui?: Partial<TableExtendedUi>;
  size?: ThemeSize;
  bordered?: boolean | 'all';
  striped?: boolean;
}

export type TableEmits<R extends string | number, M extends boolean = false> = HeadlessTableEmits<R, M>;

export type TableSlots<T extends BaseTableData> = HeadlessTableSlots<T>;

export interface TableRadioProps {
  size?: ThemeSize;
  checked?: boolean;
}
