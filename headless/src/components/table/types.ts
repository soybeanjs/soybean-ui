import type {
  ShallowRef,
  ComputedRef,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from 'vue';
import type { CheckedState, Path, PathValue, PropsToContext, UiClass } from '../../types';
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
  | 'fixed'
  | 'sortTrigger'
  | 'filterInput'
  | 'resizeHandle'
  | 'treeCell'
  | 'treeToggle'
  | 'treeTogglePlaceholder';

export type TableUi = UiClass<TableUiSlot>;

export type TableBaseData = Record<string, any>;

export type TableRowValue<T extends TableBaseData = TableBaseData> = Omit<T, 'children'>;

export type TableAlign = 'left' | 'center' | 'right';

export type TableColumnType = 'index' | 'selection' | 'expand';

export type TableSortOrder = 'asc' | 'desc';

export type TableUnifiedKey = string | number;

export interface TableSortState {
  key: string;
  order: TableSortOrder;
}

export interface TableColumnFilterValue {
  keyword?: string;
  values?: string[];
}

export type TableFilterValue = string | TableColumnFilterValue;

export type TableFilterState = Record<string, TableFilterValue>;

export type TableColumnWidthState = Record<string, string>;

export type TableRowChildrenResolver<T extends TableBaseData = TableBaseData> = (row: T) => T[] | undefined;

export interface TableVirtualMeasurement {
  index: number;
  start: number;
  end: number;
}

export interface TableVirtualRange {
  startIndex: number;
  endIndex: number;
}

export interface TableTreeNode<T extends TableBaseData = TableBaseData, R extends TableUnifiedKey = TableUnifiedKey> {
  key: R;
  row: T;
  level: number;
  parentKey?: R;
  children: TableTreeNode<T, R>[];
  hasChildren: boolean;
}

export interface TableTreeRow<T extends TableBaseData = TableBaseData, R extends TableUnifiedKey = TableUnifiedKey> {
  key: R;
  row: T;
  level: number;
  parentKey?: R;
  hasChildren: boolean;
}

export interface TableVisibleRow<T extends TableBaseData = TableBaseData, R extends TableUnifiedKey = TableUnifiedKey> {
  index: number;
  item: TableTreeRow<T, R>;
}

export interface TableColumnFilter<T extends TableBaseData = TableBaseData> {
  placeholder?: string;
  options?:
    | TableColumnFilterOption[]
    | ((params: { rows: T[]; column: TableDataColumn<T> }) => TableColumnFilterOption[]);
  match?: (params: {
    filterValue: TableColumnFilterValue;
    keyword: string;
    values: string[];
    row: T;
    value: unknown;
    column: TableDataColumn<T>;
  }) => boolean;
}

export interface TableColumnFilterOption {
  label: string;
  value: string;
  disabled?: boolean;
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

export interface TableTypeColumn extends TableColumnBase {
  type: TableColumnType;
  dataIndex?: never;
  children?: never;
  sorter?: never;
  filter?: never;
}

export interface TableDataColumn<T extends TableBaseData = TableBaseData> extends TableColumnBase {
  dataIndex: Path<TableRowValue<T>>;
  type?: never;
  children?: never;
  sorter?: boolean | ((a: T, b: T) => number);
  filter?: boolean | TableColumnFilter<T>;
}

export interface TableGroupColumn<T extends TableBaseData = TableBaseData> extends TableColumnBase {
  children: TableColumn<T>[];
  type?: never;
  dataIndex?: never;
  sorter?: never;
  filter?: never;
}

export type TableColumn<T extends TableBaseData = TableBaseData> =
  | TableTypeColumn
  | TableDataColumn<T>
  | TableGroupColumn<T>;

export interface TableHeaderCell<T extends TableBaseData = TableBaseData> {
  key: string;
  column: TableColumn<T>;
  colSpan: number;
  rowSpan: number;
}

export interface TableFixedState {
  side: 'left' | 'right';
  offset: number;
}

export interface TableFixedColumnOffsets {
  leftOffsets: Record<string, number>;
  rightOffsets: Record<string, number>;
}

export interface TableSelectionProps<R extends TableUnifiedKey = TableUnifiedKey, M extends boolean = false> {
  defaultSelected?: M extends true ? R[] : R;
  selected?: M extends true ? R[] : R;
  multiple?: M;
}

export interface TableCompactCellProps {
  column: TableColumn;
  row: TableTreeRow;
  index: number;
}

export interface TableCompactExpandedRowProps {
  row: TableTreeRow;
  index: number;
  colspan: number;
}

export interface TableCompactHeadProps extends Omit<TableHeaderCell, 'key'> {}

export interface TableCompactRowProps {
  row: TableTreeRow;
  index: number;
  leafColumns: TableColumn[];
}

export type TableCompactCellSlots<T extends TableBaseData> = {
  [K in Path<TableRowValue<T>>]?: (props: TableDataCellSlotProps<T, K>) => any;
} & {
  index?: (props: TableIndexSlotProps<T>) => any;
  selection?: (props: TableSelectionSlotProps<T>) => any;
  expand?: (props: TableExpandSlotProps<T>) => any;
  'tree-toggle'?: (props: TableTreeToggleSlotProps<T>) => any;
};

export interface TableHeaderSlotProps<T extends TableBaseData = TableBaseData> {
  column: TableColumn<T>;
  colSpan: number;
  rowSpan: number;
  sortable: boolean;
  filterable: boolean;
  filtered: boolean;
  resizable: boolean;
  sortOrder?: TableSortOrder;
  multiple?: boolean;
  checked?: CheckedState;
  disabled?: boolean;
  updateChecked?: (value: CheckedState | null) => void;
  toggleSort: () => void;
  filterValue: string;
  filterValues: string[];
  filterState?: TableFilterValue;
  filterOptions: TableColumnFilterOption[];
  setFilterValue: (value: string) => void;
  setFilterValues: (values: string[]) => void;
  setFilterState: (value: TableFilterValue | undefined) => void;
  toggleFilterOption: (value: string) => void;
  isFilterOptionSelected: (value: string) => boolean;
  clearFilter: () => void;
}

export interface TableHeaderSelectionSlotProps<T extends TableBaseData = TableBaseData> {
  column: TableColumn<T>;
  multiple: boolean;
  checked: CheckedState;
  disabled: boolean;
  updateChecked: (value: CheckedState | null) => void;
}

export interface TableHeaderFilterSlotProps<T extends TableBaseData = TableBaseData> extends Pick<
  TableHeaderSlotProps<T>,
  | 'column'
  | 'filterValue'
  | 'filterValues'
  | 'filterState'
  | 'filtered'
  | 'filterOptions'
  | 'setFilterValue'
  | 'setFilterValues'
  | 'setFilterState'
  | 'toggleFilterOption'
  | 'isFilterOptionSelected'
  | 'clearFilter'
> {}

export interface TableHeaderSortSlotProps<T extends TableBaseData = TableBaseData> {
  ariaLabel: string;
  column: TableColumn<T>;
  sortOrder?: TableSortOrder;
  toggleSort: () => void;
}

export interface TableHeaderResizeSlotProps<T extends TableBaseData = TableBaseData> {
  column: TableColumn<T>;
  resizing: boolean;
  ariaLabel: string;
  onPointerdown: (event: PointerEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
}

export interface TableIndexSlotProps<T extends TableBaseData = TableBaseData> {
  index: number;
  column: TableColumn<T>;
  row: T;
  level: number;
  hasChildren: boolean;
}

export interface TableCellSlotProps<T extends TableBaseData = TableBaseData> {
  index: number;
  column: TableColumn<T>;
  row: T;
  level: number;
  hasChildren: boolean;
  expanded: boolean;
  toggleExpand: () => void;
}

export interface TableSelectionSlotProps<T extends TableBaseData = TableBaseData> extends TableCellSlotProps<T> {
  multiple: boolean;
  checked: boolean;
  ariaLabel: string;
  toggleSelect: () => void;
}

export interface TableExpandSlotProps<T extends TableBaseData = TableBaseData> extends TableCellSlotProps<T> {
  ariaLabel: string;
}

export type TableTreeToggleSlotProps<T extends TableBaseData = TableBaseData> = TableExpandSlotProps<T>;

export interface TableExpandedRowSlotProps<T extends TableBaseData = TableBaseData> {
  index: number;
  row: T;
  level: number;
  hasChildren: boolean;
}

export interface TableDataCellSlotProps<
  T extends TableBaseData = TableBaseData,
  K extends Path<TableRowValue<T>> = Path<TableRowValue<T>>
> extends TableCellSlotProps<T> {
  value: PathValue<TableRowValue<T>, K>;
}

export interface TableCompactProps<
  T extends TableBaseData = TableBaseData,
  R extends TableUnifiedKey = TableUnifiedKey,
  M extends boolean = false
>
  extends TableRootProps, TableSelectionProps<R, M> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => R;
  defaultSortState?: TableSortState;
  sortState?: TableSortState;
  defaultFilterState?: TableFilterState;
  filterState?: TableFilterState;
  defaultColumnWidths?: TableColumnWidthState;
  columnWidths?: TableColumnWidthState;
  getChildren?: TableRowChildrenResolver<T>;
  indent?: number;
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

export type TableCompactEmits<R extends TableUnifiedKey = TableUnifiedKey, M extends boolean = false> = {
  'update:sortState': [state: TableSortState | undefined];
  'update:filterState': [state: TableFilterState];
  'update:columnWidths': [state: TableColumnWidthState];
  'update:expanded': [expanded: R[]];
  'update:selected': [selected: M extends true ? R[] : R | undefined];
};

export type TableCompactSlots<T extends TableBaseData> = {
  [K in `header-${Path<TableRowValue<T>>}`]?: (props: TableHeaderSlotProps<T>) => any;
} & {
  [K in Path<TableRowValue<T>>]?: (props: TableDataCellSlotProps<T, K>) => any;
} & {
  header?: (props: TableHeaderSlotProps<T>) => any;
  'header-index'?: (props: { column: TableColumn<T> }) => any;
  'header-selection'?: (props: TableHeaderSelectionSlotProps<T>) => any;
  'header-expand'?: (props: { column: TableColumn<T> }) => any;
  'header-filter'?: (props: TableHeaderFilterSlotProps<T>) => any;
  'header-sort'?: (props: TableHeaderSortSlotProps<T>) => any;
  'header-resize'?: (props: TableHeaderResizeSlotProps<T>) => any;
  index?: (props: TableIndexSlotProps<T>) => any;
  selection?: (props: TableSelectionSlotProps<T>) => any;
  expand?: (props: TableExpandSlotProps<T>) => any;
  'expanded-row'?: (props: TableExpandedRowSlotProps<T>) => any;
  'tree-toggle'?: (props: TableTreeToggleSlotProps<T>) => any;
  footer?: (props: { columnSize: number }) => any;
};

export interface TableCompactContext extends PropsToContext<
  TableCompactProps,
  'indent' | 'headProps' | 'rowProps' | 'cellProps'
> {
  rowKey: (row: TableBaseData) => TableUnifiedKey;
  expanded: ShallowRef<TableUnifiedKey[]>;
  sortState: ShallowRef<TableSortState | undefined>;
  filterState: ShallowRef<TableFilterState>;
  columnWidths: ShallowRef<TableColumnWidthState>;
  selected: ShallowRef<TableUnifiedKey[] | TableUnifiedKey | undefined>;
  onSelectedChange: (value: TableUnifiedKey) => void;
  setSelected: (value: TableUnifiedKey[] | TableUnifiedKey | undefined) => void;
  resetSelected: () => void;
  isValueSelected: (value: TableUnifiedKey) => boolean;
  multiple: ComputedRef<boolean>;
  leafColumns: ComputedRef<TableColumn[]>;
  sourceRows: ComputedRef<TableBaseData[]>;
  hasTreeRows: ComputedRef<boolean>;
  treeColumnKey: ComputedRef<string | undefined>;
  hasExpandColumn: ComputedRef<boolean>;
  hasExpandedRowSlot: ComputedRef<boolean>;
  visibleExpandedKeys: ComputedRef<TableUnifiedKey[]>;
  visibleRowKeys: ComputedRef<TableUnifiedKey[]>;
  isHeaderSelectionDisabled: ComputedRef<boolean>;
  headerSelection: ComputedRef<CheckedState>;
  fixedColumnStates: ComputedRef<TableFixedColumnOffsets>;
  resizingColumnKey: ShallowRef<string | null>;
  measuredColumnWidths: ShallowRef<Record<string, number>>;
  headCellElements: Record<string, HTMLElement | null>;
}
