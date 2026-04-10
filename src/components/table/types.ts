import {
  DataTableColumn,
  DataTableRootEmits,
  DataTableRootProps,
  DataTableRootSlots,
  TableUi,
  UiClass
} from '@soybeanjs/headless';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type BaseTableData = Record<string, any>;

export type TableExtraUiSlot = 'selection';

export type TableExtendedUi = UiClass<keyof TableUi | TableExtraUiSlot>;

export type TableColumnType = import('@soybeanjs/headless').DataTableColumnType;

export type TableColumn<T = BaseTableData> = DataTableColumn<T>;

export interface TableProps<
  T extends BaseTableData = BaseTableData,
  R extends string | number = string | number,
  M extends boolean = false
>
  extends DataTableRootProps<T, R, M> {
  /**
   * Additional class names to apply to the table.
   */
  class?: ClassValue;
  ui?: Partial<TableExtendedUi>;
  size?: ThemeSize;
  bordered?: boolean | 'all';
  striped?: boolean;
}

export type TableEmits<R extends string | number, M extends boolean = false> = DataTableRootEmits<R, M>;

export type TableSlots<T extends BaseTableData> = DataTableRootSlots<T>;

export interface TableRadioProps {
  size?: ThemeSize;
  checked?: boolean;
}
