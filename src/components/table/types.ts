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

/**
 * Additional UI slots for the table component.
 */
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

/**
 * Extended UI class overrides for the table component.
 */
export type TableExtendedUi = UiClass<TableUiSlot | TableExtraUiSlot>;

/**
 * Props for the table component.
 */
export interface TableProps<
  T extends TableBaseData = TableBaseData,
  R extends string | number = string | number,
  M extends boolean = false
> extends TableCompactProps<T, R, M> {
  /**
   * Additional class names to apply to the table.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<TableExtendedUi>;
  /**
   * Visual variant of the component.
   */
  variant?: TableVariant;
  /**
   * Whether bordered.
   */
  bordered?: boolean;
  /**
   * Whether rounded.
   */
  rounded?: boolean;
  /**
   * Whether striped.
   */
  striped?: boolean;
}

/**
 * Emits for the table component.
 */
export type TableEmits<R extends TableUnifiedKey = TableUnifiedKey, M extends boolean = false> = TableCompactEmits<
  R,
  M
>;

/**
 * Slots for the table component.
 */
export type TableSlots<T extends TableBaseData = TableBaseData> = TableCompactSlots<T>;

/**
 * Props for the table radio component.
 */
export interface TableRadioProps {
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Whether the item is checked.
   */
  checked?: boolean;
}

/**
 * Type information for the table filter popover column meta component.
 */
export interface TableFilterPopoverColumnMeta {
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Key.
   */
  key?: string;
  /**
   * Data index.
   */
  dataIndex?: string;
}

/**
 * Type information for the table filter popover option component.
 */
export interface TableFilterPopoverOption {
  /**
   * Label text rendered by the component.
   */
  label: string;
  /**
   * Value associated with the current item.
   */
  value: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Props for the table filter popover component.
 */
export interface TableFilterPopoverProps<
  T extends TableBaseData = TableBaseData
> extends TableHeaderFilterSlotProps<T> {
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
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
