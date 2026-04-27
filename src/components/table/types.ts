import {
  TableBaseData,
  TableColumn,
  TableColumnFilter,
  TableColumnFilterOption,
  TableColumnFilterValue,
  TableColumnType,
  TableCompactProps,
  TableCompactEmits,
  TableCompactSlots,
  TableHeaderFilterSlotProps,
  TableUnifiedKey,
  TableSortOrder,
  TableUiSlot
} from '@soybeanjs/headless/table';
import type { ClassValue, UiClass } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { TableVariant } from './variants';

export type TableExtraUiSlot =
  | 'selection'
  | 'filterTrigger'
  | 'filterPopup'
  | 'filterSearch'
  | 'filterOptions'
  | 'filterOption'
  | 'filterOptionLabel'
  | 'filterFooter'
  | 'filterCount'
  | 'filterAction'
  | 'filterEmpty';

export type TableExtendedUi = UiClass<TableUiSlot | TableExtraUiSlot>;

export interface TableProps<
  T extends TableBaseData = TableBaseData,
  R extends string | number = string | number,
  M extends boolean = false
> extends TableCompactProps<T, R, M> {
  /**
   * Additional class names to apply to the table.
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TableExtendedUi>;
  variant?: TableVariant;
  bordered?: boolean;
  rounded?: boolean;
  striped?: boolean;
}

export type TableEmits<R extends TableUnifiedKey = TableUnifiedKey, M extends boolean = false> = TableCompactEmits<
  R,
  M
>;

export type TableSlots<T extends TableBaseData = TableBaseData> = TableCompactSlots<T>;

export interface TableRadioProps {
  size?: ThemeSize;
  checked?: boolean;
}

export interface TableFilterPopoverColumnMeta {
  title?: string;
  key?: string;
  dataIndex?: string;
}

export interface TableFilterPopoverOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TableFilterPopoverProps<
  T extends TableBaseData = TableBaseData
> extends TableHeaderFilterSlotProps<T> {
  size?: ThemeSize;
  ui: TableExtendedUi;
}

export type {
  TableBaseData,
  TableColumn,
  TableColumnFilter,
  TableColumnFilterOption,
  TableColumnFilterValue,
  TableColumnType,
  TableSortOrder
};
