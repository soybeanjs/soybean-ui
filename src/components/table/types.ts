import {
  BaseTableData,
  TableColumn,
  TableColumnFilter,
  TableColumnWidthState,
  TableFilterState,
  TableColumnType,
  TableEmits,
  TableProps as HeadlessTableProps,
  TableSortOrder,
  TableSortState,
  TableSlots,
  TableUi
} from '@soybeanjs/headless/table';
import type { ClassValue, UiClass } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type TableExtraUiSlot = 'selection';

export type TableExtendedUi = UiClass<keyof TableUi | TableExtraUiSlot>;

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

export interface TableRadioProps {
  size?: ThemeSize;
  checked?: boolean;
}

export type {
  BaseTableData,
  TableColumn,
  TableColumnFilter,
  TableColumnType,
  TableColumnWidthState,
  TableEmits,
  TableFilterState,
  TableSlots,
  TableSortOrder,
  TableSortState
};
