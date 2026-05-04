import type {
  ShallowRef,
  ComputedRef,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from 'vue';
import type { CheckedState, Direction, Path, PathValue, PropsToContext, UiClass } from '../../types';
import type { VirtualizerOptions } from '../virtualizer/types';

/**
 * Properties for the table root component.
 */
export interface TableRootProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
}

/**
 * Properties for the table scroll component.
 */
export interface TableScrollProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the table content component.
 */
export interface TableContentProps extends /** @vue-ignore */ TableHTMLAttributes {}

/**
 * Properties for the table header component.
 */
export interface TableHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the table body component.
 */
export interface TableBodyProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the table footer component.
 */
export interface TableFooterProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the table row component.
 */
export interface TableRowProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the table head component.
 */
export interface TableHeadProps extends /** @vue-ignore */ ThHTMLAttributes {}

/**
 * Properties for the table cell component.
 */
export interface TableCellProps extends /** @vue-ignore */ TdHTMLAttributes {}

/**
 * Available UI slots for the table component.
 */
export type TableUiSlot =
  | 'root'
  | 'scroll'
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

/**
 * UI class overrides for the table component.
 */
export type TableUi = UiClass<TableUiSlot>;

/**
 * Type information for the table base data component.
 */
export type TableBaseData = Record<string, any>;

/**
 * Type information for the table row value component.
 */
export type TableRowValue<T extends TableBaseData = TableBaseData> = Omit<T, 'children'>;

/**
 * Type information for the table align component.
 */
export type TableAlign = 'start' | 'center' | 'end';

/**
 * Supported table column values.
 */
export type TableColumnType = 'index' | 'selection' | 'expand';

/**
 * Type information for the table sort order component.
 */
export type TableSortOrder = 'asc' | 'desc';

/**
 * Type information for the table unified key component.
 */
export type TableUnifiedKey = string | number;

/**
 * State values for the table component.
 */
export interface TableSortState {
  /**
   * Key.
   */
  key: string;
  /**
   * Order.
   */
  order: TableSortOrder;
}

/**
 * Type information for the table column filter value component.
 */
export interface TableColumnFilterValue {
  /**
   * Keyword.
   */
  keyword?: string;
  /**
   * Values.
   */
  values?: string[];
}

/**
 * Type information for the table filter value component.
 */
export type TableFilterValue = string | TableColumnFilterValue;

/**
 * State values for the table component.
 */
export type TableFilterState = Record<string, TableFilterValue>;

/**
 * State values for the table component.
 */
export type TableColumnWidthState = Record<string, string>;

/**
 * Type information for the table row children resolver component.
 */
export type TableRowChildrenResolver<T extends TableBaseData = TableBaseData> = (row: T) => T[] | undefined;

/**
 * Type information for the table virtual measurement component.
 */
export interface TableVirtualMeasurement {
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Start.
   */
  start: number;
  /**
   * End.
   */
  end: number;
}

/**
 * Type information for the table virtual range component.
 */
export interface TableVirtualRange {
  /**
   * Start index.
   */
  startIndex: number;
  /**
   * End index.
   */
  endIndex: number;
}

/**
 * Type information for the table tree node component.
 */
export interface TableTreeNode<T extends TableBaseData = TableBaseData, R extends TableUnifiedKey = TableUnifiedKey> {
  /**
   * Key.
   */
  key: R;
  /**
   * Row.
   */
  row: T;
  /**
   * Level.
   */
  level: number;
  /**
   * Parent key.
   */
  parentKey?: R;
  /**
   * Nested child items.
   */
  children: TableTreeNode<T, R>[];
  /**
   * Whether the component has children.
   */
  hasChildren: boolean;
}

/**
 * Type information for the table tree row component.
 */
export interface TableTreeRow<T extends TableBaseData = TableBaseData, R extends TableUnifiedKey = TableUnifiedKey> {
  /**
   * Key.
   */
  key: R;
  /**
   * Row.
   */
  row: T;
  /**
   * Level.
   */
  level: number;
  /**
   * Parent key.
   */
  parentKey?: R;
  /**
   * Whether the component has children.
   */
  hasChildren: boolean;
}

/**
 * Type information for the table visible row component.
 */
export interface TableVisibleRow<T extends TableBaseData = TableBaseData, R extends TableUnifiedKey = TableUnifiedKey> {
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Current item data.
   */
  item: TableTreeRow<T, R>;
}

/**
 * Type information for the table column filter component.
 */
export interface TableColumnFilter<T extends TableBaseData = TableBaseData> {
  /**
   * Placeholder.
   */
  placeholder?: string;
  /**
   * Options.
   */
  options?:
    | TableColumnFilterOption[]
    | ((params: { rows: T[]; column: TableDataColumn<T> }) => TableColumnFilterOption[]);
  /**
   * Match.
   */
  match?: (params: {
    filterValue: TableColumnFilterValue;
    keyword: string;
    values: string[];
    row: T;
    value: unknown;
    column: TableDataColumn<T>;
  }) => boolean;
}

/**
 * Type information for the table column filter option component.
 */
export interface TableColumnFilterOption {
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
 * Type information for the table column base component.
 */
export interface TableColumnBase {
  /**
   * Key.
   */
  key?: string;
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Type.
   */
  type?: TableColumnType;
  /**
   * Align.
   */
  align?: TableAlign;
  /**
   * Width.
   */
  width?: string;
  /**
   * Min width.
   */
  minWidth?: string;
  /**
   * Whether the item is hidden.
   */
  hidden?: boolean;
  /**
   * Fixed.
   */
  fixed?: 'start' | 'end';
  /**
   * Whether resizable.
   */
  resizable?: boolean;
}

/**
 * Type information for the table type column component.
 */
export interface TableTypeColumn extends TableColumnBase {
  /**
   * Type.
   */
  type: TableColumnType;
  /**
   * Data index.
   */
  dataIndex?: never;
  /**
   * Nested child items.
   */
  children?: never;
  /**
   * Sorter.
   */
  sorter?: never;
  /**
   * Filter.
   */
  filter?: never;
}

/**
 * Type information for the table data column component.
 */
export interface TableDataColumn<T extends TableBaseData = TableBaseData> extends TableColumnBase {
  /**
   * Data index.
   */
  dataIndex: Path<TableRowValue<T>>;
  /**
   * Type.
   */
  type?: never;
  /**
   * Nested child items.
   */
  children?: never;
  /**
   * Sorter.
   */
  sorter?: boolean | ((a: T, b: T) => number);
  /**
   * Filter.
   */
  filter?: boolean | TableColumnFilter<T>;
}

/**
 * Type information for the table group column component.
 */
export interface TableGroupColumn<T extends TableBaseData = TableBaseData> extends TableColumnBase {
  /**
   * Nested child items.
   */
  children: TableColumn<T>[];
  /**
   * Type.
   */
  type?: never;
  /**
   * Data index.
   */
  dataIndex?: never;
  /**
   * Sorter.
   */
  sorter?: never;
  /**
   * Filter.
   */
  filter?: never;
}

/**
 * Type information for the table column component.
 */
export type TableColumn<T extends TableBaseData = TableBaseData> =
  | TableTypeColumn
  | TableDataColumn<T>
  | TableGroupColumn<T>;

/**
 * Type information for the table header cell component.
 */
export interface TableHeaderCell<T extends TableBaseData = TableBaseData> {
  /**
   * Key.
   */
  key: string;
  /**
   * Column.
   */
  column: TableColumn<T>;
  /**
   * Col span.
   */
  colSpan: number;
  /**
   * Row span.
   */
  rowSpan: number;
}

/**
 * State values for the table component.
 */
export interface TableFixedState {
  /**
   * Side placement of the component.
   */
  side: 'start' | 'end';
  /**
   * Offset.
   */
  offset: number;
  /**
   * Whether a last start.
   */
  isLastStart: boolean;
  /**
   * Whether a first end.
   */
  isFirstEnd: boolean;
}

/**
 * Type information for the table fixed column offsets component.
 */
export interface TableFixedColumnOffsets {
  /**
   * Start offsets.
   */
  startOffsets: Record<string, number>;
  /**
   * End offsets.
   */
  endOffsets: Record<string, number>;
  /**
   * Last start key.
   */
  lastStartKey?: string;
  /**
   * First end key.
   */
  firstEndKey?: string;
}

/**
 * Properties for the table selection component.
 */
export interface TableSelectionProps<R extends TableUnifiedKey = TableUnifiedKey, M extends boolean = false> {
  /**
   * Default selected.
   */
  defaultSelected?: M extends true ? R[] : R;
  /**
   * Whether the item is selected.
   */
  selected?: M extends true ? R[] : R;
  /**
   * Whether multiple values are supported.
   */
  multiple?: M;
}

/**
 * Properties for the table compact cell component.
 */
export interface TableCompactCellProps {
  /**
   * Column.
   */
  column: TableColumn;
  /**
   * Row.
   */
  row: TableTreeRow;
  /**
   * Index of the current item.
   */
  index: number;
}

/**
 * Properties for the table compact expanded row component.
 */
export interface TableCompactExpandedRowProps {
  /**
   * Row.
   */
  row: TableTreeRow;
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Colspan.
   */
  colspan: number;
}

/**
 * Properties for the table compact head component.
 */
export interface TableCompactHeadProps extends Omit<TableHeaderCell, 'key'> {}

/**
 * Properties for the table compact row component.
 */
export interface TableCompactRowProps {
  /**
   * Row.
   */
  row: TableTreeRow;
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Leaf columns.
   */
  leafColumns: TableColumn[];
}

/**
 * Slots for the table compact cell component.
 */
export type TableCompactCellSlots<T extends TableBaseData> = {
  [K in Path<TableRowValue<T>>]?: (props: TableDataCellSlotProps<T, K>) => any;
} & {
  /**
   * Custom content for the index slot.
   */
  index?: (props: TableIndexSlotProps<T>) => any;
  /**
   * Custom content for the selection slot.
   */
  selection?: (props: TableSelectionSlotProps<T>) => any;
  /**
   * Custom content for the expand slot.
   */
  expand?: (props: TableExpandSlotProps<T>) => any;
  /**
   * Custom content for the tree toggle slot.
   */
  'tree-toggle'?: (props: TableTreeToggleSlotProps<T>) => any;
};

/**
 * Slot properties for the table header component.
 */
export interface TableHeaderSlotProps<T extends TableBaseData = TableBaseData> {
  /**
   * Column exposed in the slot scope.
   */
  column: TableColumn<T>;
  /**
   * Col span exposed in the slot scope.
   */
  colSpan: number;
  /**
   * Row span exposed in the slot scope.
   */
  rowSpan: number;
  /**
   * Whether sortable.
   */
  sortable: boolean;
  /**
   * Whether filterable.
   */
  filterable: boolean;
  /**
   * Whether filtered.
   */
  filtered: boolean;
  /**
   * Whether resizable.
   */
  resizable: boolean;
  /**
   * Sort order exposed in the slot scope.
   */
  sortOrder?: TableSortOrder;
  /**
   * Whether multiple values are supported.
   */
  multiple?: boolean;
  /**
   * Whether the item is checked.
   */
  checked?: CheckedState;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Update checked exposed in the slot scope.
   */
  updateChecked?: (value: CheckedState | null) => void;
  /**
   * Toggle sort exposed in the slot scope.
   */
  toggleSort: () => void;
  /**
   * Filter value exposed in the slot scope.
   */
  filterValue: string;
  /**
   * Filter values exposed in the slot scope.
   */
  filterValues: string[];
  /**
   * Filter state exposed in the slot scope.
   */
  filterState?: TableFilterValue;
  /**
   * Filter options exposed in the slot scope.
   */
  filterOptions: TableColumnFilterOption[];
  /**
   * Set filter value exposed in the slot scope.
   */
  setFilterValue: (value: string) => void;
  /**
   * Set filter values exposed in the slot scope.
   */
  setFilterValues: (values: string[]) => void;
  /**
   * Set filter state exposed in the slot scope.
   */
  setFilterState: (value: TableFilterValue | undefined) => void;
  /**
   * Toggle filter option exposed in the slot scope.
   */
  toggleFilterOption: (value: string) => void;
  /**
   * Whether the filter option is selected.
   */
  isFilterOptionSelected: (value: string) => boolean;
  /**
   * Clear filter exposed in the slot scope.
   */
  clearFilter: () => void;
}

/**
 * Slot properties for the table header selection component.
 */
export interface TableHeaderSelectionSlotProps<T extends TableBaseData = TableBaseData> {
  /**
   * Column exposed in the slot scope.
   */
  column: TableColumn<T>;
  /**
   * Whether multiple values are supported.
   */
  multiple: boolean;
  /**
   * Whether the item is checked.
   */
  checked: CheckedState;
  /**
   * Whether the component is disabled.
   */
  disabled: boolean;
  /**
   * Update checked exposed in the slot scope.
   */
  updateChecked: (value: CheckedState | null) => void;
}

/**
 * Slot properties for the table header filter component.
 */
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

/**
 * Slot properties for the table header sort component.
 */
export interface TableHeaderSortSlotProps<T extends TableBaseData = TableBaseData> {
  /**
   * Aria label exposed in the slot scope.
   */
  ariaLabel: string;
  /**
   * Column exposed in the slot scope.
   */
  column: TableColumn<T>;
  /**
   * Sort order exposed in the slot scope.
   */
  sortOrder?: TableSortOrder;
  /**
   * Toggle sort exposed in the slot scope.
   */
  toggleSort: () => void;
}

/**
 * Slot properties for the table header resize component.
 */
export interface TableHeaderResizeSlotProps<T extends TableBaseData = TableBaseData> {
  /**
   * Column exposed in the slot scope.
   */
  column: TableColumn<T>;
  /**
   * Whether resizing.
   */
  resizing: boolean;
  /**
   * Aria label exposed in the slot scope.
   */
  ariaLabel: string;
  /**
   * Callback invoked when the pointerdown event fires.
   */
  onPointerdown: (event: PointerEvent) => void;
  /**
   * Callback invoked when the keydown event fires.
   */
  onKeydown: (event: KeyboardEvent) => void;
}

/**
 * Slot properties for the table index component.
 */
export interface TableIndexSlotProps<T extends TableBaseData = TableBaseData> {
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Column exposed in the slot scope.
   */
  column: TableColumn<T>;
  /**
   * Row exposed in the slot scope.
   */
  row: T;
  /**
   * Level exposed in the slot scope.
   */
  level: number;
  /**
   * Whether the component has children.
   */
  hasChildren: boolean;
}

/**
 * Slot properties for the table cell component.
 */
export interface TableCellSlotProps<T extends TableBaseData = TableBaseData> {
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Column exposed in the slot scope.
   */
  column: TableColumn<T>;
  /**
   * Row exposed in the slot scope.
   */
  row: T;
  /**
   * Level exposed in the slot scope.
   */
  level: number;
  /**
   * Whether the component has children.
   */
  hasChildren: boolean;
  /**
   * Whether expanded.
   */
  expanded: boolean;
  /**
   * Toggle expand exposed in the slot scope.
   */
  toggleExpand: () => void;
}

/**
 * Slot properties for the table selection component.
 */
export interface TableSelectionSlotProps<T extends TableBaseData = TableBaseData> extends TableCellSlotProps<T> {
  /**
   * Whether multiple values are supported.
   */
  multiple: boolean;
  /**
   * Whether the item is checked.
   */
  checked: boolean;
  /**
   * Aria label exposed in the slot scope.
   */
  ariaLabel: string;
  /**
   * Toggle select exposed in the slot scope.
   */
  toggleSelect: () => void;
}

/**
 * Slot properties for the table expand component.
 */
export interface TableExpandSlotProps<T extends TableBaseData = TableBaseData> extends TableCellSlotProps<T> {
  /**
   * Aria label exposed in the slot scope.
   */
  ariaLabel: string;
}

/**
 * Slot properties for the table tree toggle component.
 */
export type TableTreeToggleSlotProps<T extends TableBaseData = TableBaseData> = TableExpandSlotProps<T>;

/**
 * Slot properties for the table expanded row component.
 */
export interface TableExpandedRowSlotProps<T extends TableBaseData = TableBaseData> {
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Row exposed in the slot scope.
   */
  row: T;
  /**
   * Level exposed in the slot scope.
   */
  level: number;
  /**
   * Whether the component has children.
   */
  hasChildren: boolean;
}

/**
 * Slot properties for the table empty component.
 */
export interface TableEmptySlotProps {
  /**
   * Column size exposed in the slot scope.
   */
  columnSize: number;
}

/**
 * Slot properties for the table data cell component.
 */
export interface TableDataCellSlotProps<
  T extends TableBaseData = TableBaseData,
  K extends Path<TableRowValue<T>> = Path<TableRowValue<T>>
> extends TableCellSlotProps<T> {
  /**
   * Value associated with the current item.
   */
  value: PathValue<TableRowValue<T>, K>;
}

/**
 * Properties for the table compact component.
 */
export interface TableCompactProps<
  T extends TableBaseData = TableBaseData,
  R extends TableUnifiedKey = TableUnifiedKey,
  M extends boolean = false
>
  extends TableRootProps, TableSelectionProps<R, M> {
  /**
   * Columns.
   */
  columns: TableColumn<T>[];
  /**
   * Data.
   */
  data: T[];
  /**
   * Row key.
   */
  rowKey: (row: T) => R;
  /**
   * Default sort state.
   */
  defaultSortState?: TableSortState;
  /**
   * Sort state.
   */
  sortState?: TableSortState;
  /**
   * Default filter state.
   */
  defaultFilterState?: TableFilterState;
  /**
   * Filter state.
   */
  filterState?: TableFilterState;
  /**
   * Default column widths.
   */
  defaultColumnWidths?: TableColumnWidthState;
  /**
   * Column widths.
   */
  columnWidths?: TableColumnWidthState;
  /**
   * Get children.
   */
  getChildren?: TableRowChildrenResolver<T>;
  /**
   * Indent width applied to nested items.
   */
  indent?: number;
  /**
   * Whether virtual.
   */
  virtual?: boolean;
  /**
   * Height.
   */
  height?: number | string;
  /**
   * Estimate size.
   */
  estimateSize?: number | ((index: number, row: T) => number);
  /**
   * Virtualizer options.
   */
  virtualizerOptions?: VirtualizerOptions;
  /**
   * Default expanded.
   */
  defaultExpanded?: R[];
  /**
   * Expanded.
   */
  expanded?: R[];
  /**
   * Whether default expand all.
   */
  defaultExpandAll?: boolean;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: TableContentProps;
  /**
   * Properties forwarded to the header element.
   */
  headerProps?: TableHeaderProps;
  /**
   * Properties forwarded to the body element.
   */
  bodyProps?: TableBodyProps;
  /**
   * Properties forwarded to the footer element.
   */
  footerProps?: TableFooterProps;
  /**
   * Properties forwarded to the head element.
   */
  headProps?: TableHeadProps;
  /**
   * Properties forwarded to the row element.
   */
  rowProps?: TableRowProps;
  /**
   * Properties forwarded to the cell element.
   */
  cellProps?: TableCellProps;
}

/**
 * Events for the table compact component.
 */
export type TableCompactEmits<R extends TableUnifiedKey = TableUnifiedKey, M extends boolean = false> = {
  /**
   * Emitted when the sort state value changes.
   */
  'update:sortState': [state: TableSortState | undefined];
  /**
   * Emitted when the filter state value changes.
   */
  'update:filterState': [state: TableFilterState];
  /**
   * Emitted when the column widths value changes.
   */
  'update:columnWidths': [state: TableColumnWidthState];
  /**
   * Emitted when the expanded state changes.
   */
  'update:expanded': [expanded: R[]];
  /**
   * Emitted when the selected state changes.
   */
  'update:selected': [selected: M extends true ? R[] : R | undefined];
};

/**
 * Slots for the table compact component.
 */
export type TableCompactSlots<T extends TableBaseData> = {
  [K in `header-${Path<TableRowValue<T>>}`]?: (props: TableHeaderSlotProps<T>) => any;
} & {
  [K in Path<TableRowValue<T>>]?: (props: TableDataCellSlotProps<T, K>) => any;
} & {
  /**
   * Custom content for the bottom slot.
   */
  bottom?: () => any;
  /**
   * Custom content for the header slot.
   */
  header?: (props: TableHeaderSlotProps<T>) => any;
  /**
   * Custom content for the header index slot.
   */
  'header-index'?: (props: { column: TableColumn<T> }) => any;
  /**
   * Custom content for the header selection slot.
   */
  'header-selection'?: (props: TableHeaderSelectionSlotProps<T>) => any;
  /**
   * Custom content for the header expand slot.
   */
  'header-expand'?: (props: { column: TableColumn<T> }) => any;
  /**
   * Custom content for the header filter slot.
   */
  'header-filter'?: (props: TableHeaderFilterSlotProps<T>) => any;
  /**
   * Custom content for the header sort slot.
   */
  'header-sort'?: (props: TableHeaderSortSlotProps<T>) => any;
  /**
   * Custom content for the header resize slot.
   */
  'header-resize'?: (props: TableHeaderResizeSlotProps<T>) => any;
  /**
   * Custom content for the index slot.
   */
  index?: (props: TableIndexSlotProps<T>) => any;
  /**
   * Custom content for the selection slot.
   */
  selection?: (props: TableSelectionSlotProps<T>) => any;
  /**
   * Custom content for the expand slot.
   */
  expand?: (props: TableExpandSlotProps<T>) => any;
  /**
   * Custom content for the expanded row slot.
   */
  'expanded-row'?: (props: TableExpandedRowSlotProps<T>) => any;
  /**
   * Custom content for the tree toggle slot.
   */
  'tree-toggle'?: (props: TableTreeToggleSlotProps<T>) => any;
  /**
   * Custom content for the empty slot.
   */
  empty?: (props: TableEmptySlotProps) => any;
  /**
   * Custom content for the footer slot.
   */
  footer?: (props: { columnSize: number }) => any;
};

/**
 * Context for the table compact component.
 */
export interface TableCompactContext extends PropsToContext<
  TableCompactProps,
  'indent' | 'headProps' | 'rowProps' | 'cellProps'
> {
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Row key used by the component context.
   */
  rowKey: (row: TableBaseData) => TableUnifiedKey;
  /**
   * Expanded used by the component context.
   */
  expanded: ShallowRef<TableUnifiedKey[]>;
  /**
   * Sort state used by the component context.
   */
  sortState: ShallowRef<TableSortState | undefined>;
  /**
   * Filter state used by the component context.
   */
  filterState: ShallowRef<TableFilterState>;
  /**
   * Column widths used by the component context.
   */
  columnWidths: ShallowRef<TableColumnWidthState>;
  /**
   * Whether the item is selected.
   */
  selected: ShallowRef<TableUnifiedKey[] | TableUnifiedKey | undefined>;
  /**
   * Callback invoked when the selected changes.
   */
  onSelectedChange: (value: TableUnifiedKey) => void;
  /**
   * Set selected used by the component context.
   */
  setSelected: (value: TableUnifiedKey[] | TableUnifiedKey | undefined) => void;
  /**
   * Reset selected used by the component context.
   */
  resetSelected: () => void;
  /**
   * Whether the value is selected.
   */
  isValueSelected: (value: TableUnifiedKey) => boolean;
  /**
   * Whether multiple values are supported.
   */
  multiple: ComputedRef<boolean>;
  /**
   * Leaf columns used by the component context.
   */
  leafColumns: ComputedRef<TableColumn[]>;
  /**
   * Source rows used by the component context.
   */
  sourceRows: ComputedRef<TableBaseData[]>;
  /**
   * Whether the component has tree rows.
   */
  hasTreeRows: ComputedRef<boolean>;
  /**
   * Tree column key used by the component context.
   */
  treeColumnKey: ComputedRef<string | undefined>;
  /**
   * Whether the component has expand column.
   */
  hasExpandColumn: ComputedRef<boolean>;
  /**
   * Whether the component has expanded row slot.
   */
  hasExpandedRowSlot: ComputedRef<boolean>;
  /**
   * Visible expanded keys used by the component context.
   */
  visibleExpandedKeys: ComputedRef<TableUnifiedKey[]>;
  /**
   * Visible row keys used by the component context.
   */
  visibleRowKeys: ComputedRef<TableUnifiedKey[]>;
  /**
   * Whether the header selection is disabled.
   */
  isHeaderSelectionDisabled: ComputedRef<boolean>;
  /**
   * Header selection used by the component context.
   */
  headerSelection: ComputedRef<CheckedState>;
  /**
   * Fixed column states used by the component context.
   */
  fixedColumnStates: ComputedRef<TableFixedColumnOffsets>;
  /**
   * Resizing column key used by the component context.
   */
  resizingColumnKey: ShallowRef<string | null>;
  /**
   * Measured column widths used by the component context.
   */
  measuredColumnWidths: ShallowRef<Record<string, number>>;
  /**
   * Head cell elements used by the component context.
   */
  headCellElements: Record<string, HTMLElement | null>;
}
