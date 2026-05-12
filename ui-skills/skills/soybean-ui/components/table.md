# Table

Source URL: https://ui.soybeanjs.cn/components/table
Markdown URL: https://ui.soybeanjs.cn/components/table.md
Category: Data Display
Description: A data table component for displaying row and column data. Supports grouped headers, sorting, filtering, selection, expansion, tree rows, virtualization, empty states, and more, with default and simple visual variants plus a rounded toggle.

## Overview

A data table component for displaying row and column data. Supports grouped headers, sorting, filtering, selection, expansion, tree rows, virtualization, empty states, and more, with default and simple visual variants plus a rounded toggle.

## Usage

Usage examples for table are rendered on the site.

## Demos

Interactive demos for table are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (28): Table, TableBody, TableCell, TableCompact, TableCompactCell, TableCompactExpandedRow, TableCompactHead, TableCompactRow, TableContent, TableDataCell, TableEmpty, TableExpand, TableExpandedRow, TableFilterPopover, TableFooter, TableHead, TableHeader, TableHeaderFilter, TableHeaderResize, TableHeaderSelection, TableHeaderSort, TableIndex, TableRadio, TableRoot, TableRow, TableScroll, TableSelection, TableTreeToggle.

### Table

#### Props

Properties for the Table component.

- `class`: Additional class names to apply to the table. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<TableExtendedUi>`; optional)
- `variant`: Visual variant of the component. (type `TableVariant`; optional)
- `bordered`: Whether bordered. (type `boolean`; optional)
- `rounded`: Whether rounded. (type `boolean`; optional)
- `striped`: Whether striped. (type `boolean`; optional)
- `columns`: Columns. (type `TableColumn<T>[]`; required)
- `data`: Data. (type `T[]`; required)
- `rowKey`: Row key. (type `(row: T) => R`; required)
- `defaultSortState`: Default sort state. (type `TableSortState`; optional)
- `sortState`: Sort state. (type `TableSortState`; optional)
- `defaultFilterState`: Default filter state. (type `TableFilterState`; optional)
- `filterState`: Filter state. (type `TableFilterState`; optional)
- `defaultColumnWidths`: Default column widths. (type `TableColumnWidthState`; optional)
- `columnWidths`: Column widths. (type `TableColumnWidthState`; optional)
- `getChildren`: Get children. (type `TableRowChildrenResolver<T>`; optional)
- `indent`: Indent width applied to nested items. (type `number`; optional)
- `virtual`: Whether virtual. (type `boolean`; optional)
- `height`: Height. (type `string | number`; optional)
- `estimateSize`: Estimate size. (type `number | ((index: number, row: T) => number)`; optional)
- `virtualizerOptions`: Virtualizer options. (type `VirtualizerOptions`; optional)
- `defaultExpanded`: Default expanded. (type `R[]`; optional)
- `expanded`: Expanded. (type `R[]`; optional)
- `defaultExpandAll`: Whether default expand all. (type `boolean`; optional)
- `contentProps`: Properties forwarded to the content element. (type `TableContentProps`; optional)
- `headerProps`: Properties forwarded to the header element. (type `TableHeaderProps`; optional)
- `bodyProps`: Properties forwarded to the body element. (type `TableBodyProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `TableFooterProps`; optional)
- `headProps`: Properties forwarded to the head element. (type `TableHeadProps`; optional)
- `rowProps`: Properties forwarded to the row element. (type `TableRowProps`; optional)
- `cellProps`: Properties forwarded to the cell element. (type `TableCellProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `defaultSelected`: Default selected. (type `(M extends true ? R[] : R)`; optional)
- `selected`: Whether the item is selected. (type `(M extends true ? R[] : R)`; optional)
- `multiple`: Whether multiple values are supported. (type `M`; optional)

#### Emits

Events for the Table component.

- `update:sortState`: Emitted when the sort state value changes. (type `[state: TableSortState | undefined]`; parameters `state: TableSortState | undefined`)
- `update:filterState`: Emitted when the filter state value changes. (type `[state: TableFilterState]`; parameters `state: TableFilterState`)
- `update:columnWidths`: Emitted when the column widths value changes. (type `[state: TableColumnWidthState]`; parameters `state: TableColumnWidthState`)
- `update:expanded`: Emitted when the expanded state changes. (type `[expanded: R[]]`; parameters `expanded: R[]`)
- `update:selected`: Emitted when the selected state changes. (type `[selected: M extends true ? R[] : R | undefined]`; parameters `selected: M extends true ? R[] : R | undefined`)

#### Slots

Slots for the Table component.

- `bottom`: Custom content for the bottom slot. (type `(() => any) | undefined`)
- `header`: Custom content for the header slot. (type `((props: TableHeaderSlotProps<T>) => any) | undefined`)
- `header-index`: Custom content for the header index slot. (type `((props: { column: TableColumn<T>; }) => any) | undefined`)
- `header-selection`: Custom content for the header selection slot. (type `((props: TableHeaderSelectionSlotProps<T>) => any) | undefined`)
- `header-expand`: Custom content for the header expand slot. (type `((props: { column: TableColumn<T>; }) => any) | undefined`)
- `header-filter`: Custom content for the header filter slot. (type `((props: TableHeaderFilterSlotProps<T>) => any) | undefined`)
- `header-sort`: Custom content for the header sort slot. (type `((props: TableHeaderSortSlotProps<T>) => any) | undefined`)
- `header-resize`: Custom content for the header resize slot. (type `((props: TableHeaderResizeSlotProps<T>) => any) | undefined`)
- `index`: Custom content for the index slot. (type `((props: TableIndexSlotProps<T>) => any) | undefined`)
- `selection`: Custom content for the selection slot. (type `((props: TableSelectionSlotProps<T>) => any) | undefined`)
- `expand`: Custom content for the expand slot. (type `((props: TableExpandSlotProps<T>) => any) | undefined`)
- `expanded-row`: Custom content for the expanded row slot. (type `((props: TableExpandedRowSlotProps<T>) => any) | undefined`)
- `tree-toggle`: Custom content for the tree toggle slot. (type `((props: TableTreeToggleSlotProps<T>) => any) | undefined`)
- `empty`: Custom content for the empty slot. (type `((props: TableEmptySlotProps) => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `((props: { columnSize: number; }) => any) | undefined`)

### TableBody

- No documented props, emits, slots, or slot props were available.

### TableCell

#### Slot Props

Slot properties for the TableCell component.

- `index`: Index of the current item. (type `number`; required)
- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `row`: Row exposed in the slot scope. (type `T`; required)
- `level`: Level exposed in the slot scope. (type `number`; required)
- `hasChildren`: Whether the component has children. (type `boolean`; required)
- `expanded`: Whether expanded. (type `boolean`; required)
- `toggleExpand`: Toggle expand exposed in the slot scope. (type `() => void`; required)

### TableCompact

#### Props

Properties for the TableCompact component.

- `columns`: Columns. (type `TableColumn<T>[]`; required)
- `data`: Data. (type `T[]`; required)
- `rowKey`: Row key. (type `(row: T) => R`; required)
- `defaultSortState`: Default sort state. (type `TableSortState`; optional)
- `sortState`: Sort state. (type `TableSortState`; optional)
- `defaultFilterState`: Default filter state. (type `TableFilterState`; optional)
- `filterState`: Filter state. (type `TableFilterState`; optional)
- `defaultColumnWidths`: Default column widths. (type `TableColumnWidthState`; optional)
- `columnWidths`: Column widths. (type `TableColumnWidthState`; optional)
- `getChildren`: Get children. (type `TableRowChildrenResolver<T>`; optional)
- `indent`: Indent width applied to nested items. (type `number`; optional)
- `virtual`: Whether virtual. (type `boolean`; optional)
- `height`: Height. (type `string | number`; optional)
- `estimateSize`: Estimate size. (type `number | ((index: number, row: T) => number)`; optional)
- `virtualizerOptions`: Virtualizer options. (type `VirtualizerOptions`; optional)
- `defaultExpanded`: Default expanded. (type `R[]`; optional)
- `expanded`: Expanded. (type `R[]`; optional)
- `defaultExpandAll`: Whether default expand all. (type `boolean`; optional)
- `contentProps`: Properties forwarded to the content element. (type `TableContentProps`; optional)
- `headerProps`: Properties forwarded to the header element. (type `TableHeaderProps`; optional)
- `bodyProps`: Properties forwarded to the body element. (type `TableBodyProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `TableFooterProps`; optional)
- `headProps`: Properties forwarded to the head element. (type `TableHeadProps`; optional)
- `rowProps`: Properties forwarded to the row element. (type `TableRowProps`; optional)
- `cellProps`: Properties forwarded to the cell element. (type `TableCellProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `defaultSelected`: Default selected. (type `(M extends true ? R[] : R)`; optional)
- `selected`: Whether the item is selected. (type `(M extends true ? R[] : R)`; optional)
- `multiple`: Whether multiple values are supported. (type `M`; optional)

#### Emits

Events for the TableCompact component.

- `update:sortState`: Emitted when the sort state value changes. (type `[state: TableSortState | undefined]`; parameters `state: TableSortState | undefined`)
- `update:filterState`: Emitted when the filter state value changes. (type `[state: TableFilterState]`; parameters `state: TableFilterState`)
- `update:columnWidths`: Emitted when the column widths value changes. (type `[state: TableColumnWidthState]`; parameters `state: TableColumnWidthState`)
- `update:expanded`: Emitted when the expanded state changes. (type `[expanded: R[]]`; parameters `expanded: R[]`)
- `update:selected`: Emitted when the selected state changes. (type `[selected: M extends true ? R[] : R | undefined]`; parameters `selected: M extends true ? R[] : R | undefined`)

#### Slots

Slots for the TableCompact component.

- `bottom`: Custom content for the bottom slot. (type `(() => any) | undefined`)
- `header`: Custom content for the header slot. (type `((props: TableHeaderSlotProps<T>) => any) | undefined`)
- `header-index`: Custom content for the header index slot. (type `((props: { column: TableColumn<T>; }) => any) | undefined`)
- `header-selection`: Custom content for the header selection slot. (type `((props: TableHeaderSelectionSlotProps<T>) => any) | undefined`)
- `header-expand`: Custom content for the header expand slot. (type `((props: { column: TableColumn<T>; }) => any) | undefined`)
- `header-filter`: Custom content for the header filter slot. (type `((props: TableHeaderFilterSlotProps<T>) => any) | undefined`)
- `header-sort`: Custom content for the header sort slot. (type `((props: TableHeaderSortSlotProps<T>) => any) | undefined`)
- `header-resize`: Custom content for the header resize slot. (type `((props: TableHeaderResizeSlotProps<T>) => any) | undefined`)
- `index`: Custom content for the index slot. (type `((props: TableIndexSlotProps<T>) => any) | undefined`)
- `selection`: Custom content for the selection slot. (type `((props: TableSelectionSlotProps<T>) => any) | undefined`)
- `expand`: Custom content for the expand slot. (type `((props: TableExpandSlotProps<T>) => any) | undefined`)
- `expanded-row`: Custom content for the expanded row slot. (type `((props: TableExpandedRowSlotProps<T>) => any) | undefined`)
- `tree-toggle`: Custom content for the tree toggle slot. (type `((props: TableTreeToggleSlotProps<T>) => any) | undefined`)
- `empty`: Custom content for the empty slot. (type `((props: TableEmptySlotProps) => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `((props: { columnSize: number; }) => any) | undefined`)

### TableCompactCell

#### Props

Properties for the TableCompactCell component.

- `column`: Column. (type `TableTypeColumn | TableDataColumn<TableBaseData> | TableGroupColumn<TableBaseData>`; required)
- `row`: Row. (type `TableTreeRow<TableBaseData, TableUnifiedKey>`; required)
- `index`: Index of the current item. (type `number`; required)

#### Slots

Slots for the TableCompactCell component.

- `index`: Custom content for the index slot. (type `((props: TableIndexSlotProps<T>) => any) | undefined`)
- `selection`: Custom content for the selection slot. (type `((props: TableSelectionSlotProps<T>) => any) | undefined`)
- `expand`: Custom content for the expand slot. (type `((props: TableExpandSlotProps<T>) => any) | undefined`)
- `tree-toggle`: Custom content for the tree toggle slot. (type `((props: TableTreeToggleSlotProps<T>) => any) | undefined`)

### TableCompactExpandedRow

#### Props

Properties for the TableCompactExpandedRow component.

- `row`: Row. (type `TableTreeRow<TableBaseData, TableUnifiedKey>`; required)
- `index`: Index of the current item. (type `number`; required)
- `colspan`: Colspan. (type `number`; required)

### TableCompactHead

#### Props

Properties for the TableCompactHead component.

- `column`: Column. (type `TableTypeColumn | TableDataColumn<TableBaseData> | TableGroupColumn<TableBaseData>`; required)
- `colSpan`: Col span. (type `number`; required)
- `rowSpan`: Row span. (type `number`; required)

### TableCompactRow

#### Props

Properties for the TableCompactRow component.

- `row`: Row. (type `TableTreeRow<TableBaseData, TableUnifiedKey>`; required)
- `index`: Index of the current item. (type `number`; required)
- `leafColumns`: Leaf columns. (type `TableColumn<TableBaseData>[]`; required)

### TableContent

- No documented props, emits, slots, or slot props were available.

### TableDataCell

#### Slot Props

Slot properties for the TableDataCell component.

- `value`: Value associated with the current item. (type `TableRowValue<T> extends any ? K extends `${infer Key}.${infer Rest}` ? Key extends Exclude<keyof T, 'children'> ? Re...`; required)
- `index`: Index of the current item. (type `number`; required)
- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `row`: Row exposed in the slot scope. (type `T`; required)
- `level`: Level exposed in the slot scope. (type `number`; required)
- `hasChildren`: Whether the component has children. (type `boolean`; required)
- `expanded`: Whether expanded. (type `boolean`; required)
- `toggleExpand`: Toggle expand exposed in the slot scope. (type `() => void`; required)

### TableEmpty

#### Slot Props

Slot properties for the TableEmpty component.

- `columnSize`: Column size exposed in the slot scope. (type `number`; required)

### TableExpand

#### Slot Props

Slot properties for the TableExpand component.

- `ariaLabel`: Aria label exposed in the slot scope. (type `string`; required)
- `index`: Index of the current item. (type `number`; required)
- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `row`: Row exposed in the slot scope. (type `T`; required)
- `level`: Level exposed in the slot scope. (type `number`; required)
- `hasChildren`: Whether the component has children. (type `boolean`; required)
- `expanded`: Whether expanded. (type `boolean`; required)
- `toggleExpand`: Toggle expand exposed in the slot scope. (type `() => void`; required)

### TableExpandedRow

#### Slot Props

Slot properties for the TableExpandedRow component.

- `index`: Index of the current item. (type `number`; required)
- `row`: Row exposed in the slot scope. (type `T`; required)
- `level`: Level exposed in the slot scope. (type `number`; required)
- `hasChildren`: Whether the component has children. (type `boolean`; required)

### TableFilterPopover

#### Props

Properties for the TableFilterPopover component.

- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `{ root: ClassValue; header: ClassValue; content: ClassValue; fixed: ClassValue; footer: ClassValue; cell: ClassValue;...`; required)
- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `filterValue`: Filter value exposed in the slot scope. (type `string`; required)
- `filterValues`: Filter values exposed in the slot scope. (type `string[]`; required)
- `filterState`: Filter state exposed in the slot scope. (type `TableFilterValue`; optional)
- `filtered`: Whether filtered. (type `boolean`; required)
- `filterOptions`: Filter options exposed in the slot scope. (type `TableColumnFilterOption[]`; required)
- `setFilterValue`: Set filter value exposed in the slot scope. (type `(value: string) => void`; required)
- `setFilterValues`: Set filter values exposed in the slot scope. (type `(values: string[]) => void`; required)
- `setFilterState`: Set filter state exposed in the slot scope. (type `(value: TableFilterValue | undefined) => void`; required)
- `toggleFilterOption`: Toggle filter option exposed in the slot scope. (type `(value: string) => void`; required)
- `isFilterOptionSelected`: Whether the filter option is selected. (type `(value: string) => boolean`; required)
- `clearFilter`: Clear filter exposed in the slot scope. (type `() => void`; required)

### TableFooter

- No documented props, emits, slots, or slot props were available.

### TableHead

- No documented props, emits, slots, or slot props were available.

### TableHeader

#### Slot Props

Slot properties for the TableHeader component.

- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `colSpan`: Col span exposed in the slot scope. (type `number`; required)
- `rowSpan`: Row span exposed in the slot scope. (type `number`; required)
- `sortable`: Whether sortable. (type `boolean`; required)
- `filterable`: Whether filterable. (type `boolean`; required)
- `filtered`: Whether filtered. (type `boolean`; required)
- `resizable`: Whether resizable. (type `boolean`; required)
- `sortOrder`: Sort order exposed in the slot scope. (type `TableSortOrder`; optional)
- `multiple`: Whether multiple values are supported. (type `boolean`; optional)
- `checked`: Whether the item is checked. (type `CheckedState`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `updateChecked`: Update checked exposed in the slot scope. (type `((value: CheckedState | null) => void)`; optional)
- `toggleSort`: Toggle sort exposed in the slot scope. (type `() => void`; required)
- `filterValue`: Filter value exposed in the slot scope. (type `string`; required)
- `filterValues`: Filter values exposed in the slot scope. (type `string[]`; required)
- `filterState`: Filter state exposed in the slot scope. (type `TableFilterValue`; optional)
- `filterOptions`: Filter options exposed in the slot scope. (type `TableColumnFilterOption[]`; required)
- `setFilterValue`: Set filter value exposed in the slot scope. (type `(value: string) => void`; required)
- `setFilterValues`: Set filter values exposed in the slot scope. (type `(values: string[]) => void`; required)
- `setFilterState`: Set filter state exposed in the slot scope. (type `(value: TableFilterValue | undefined) => void`; required)
- `toggleFilterOption`: Toggle filter option exposed in the slot scope. (type `(value: string) => void`; required)
- `isFilterOptionSelected`: Whether the filter option is selected. (type `(value: string) => boolean`; required)
- `clearFilter`: Clear filter exposed in the slot scope. (type `() => void`; required)

### TableHeaderFilter

#### Slot Props

Slot properties for the TableHeaderFilter component.

- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `filterValue`: Filter value exposed in the slot scope. (type `string`; required)
- `filterValues`: Filter values exposed in the slot scope. (type `string[]`; required)
- `filterState`: Filter state exposed in the slot scope. (type `TableFilterValue`; optional)
- `filtered`: Whether filtered. (type `boolean`; required)
- `filterOptions`: Filter options exposed in the slot scope. (type `TableColumnFilterOption[]`; required)
- `setFilterValue`: Set filter value exposed in the slot scope. (type `(value: string) => void`; required)
- `setFilterValues`: Set filter values exposed in the slot scope. (type `(values: string[]) => void`; required)
- `setFilterState`: Set filter state exposed in the slot scope. (type `(value: TableFilterValue | undefined) => void`; required)
- `toggleFilterOption`: Toggle filter option exposed in the slot scope. (type `(value: string) => void`; required)
- `isFilterOptionSelected`: Whether the filter option is selected. (type `(value: string) => boolean`; required)
- `clearFilter`: Clear filter exposed in the slot scope. (type `() => void`; required)

### TableHeaderResize

#### Slot Props

Slot properties for the TableHeaderResize component.

- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `resizing`: Whether resizing. (type `boolean`; required)
- `ariaLabel`: Aria label exposed in the slot scope. (type `string`; required)
- `onPointerdown`: Callback invoked when the pointerdown event fires. (type `(event: PointerEvent) => void`; required)
- `onKeydown`: Callback invoked when the keydown event fires. (type `(event: KeyboardEvent) => void`; required)

### TableHeaderSelection

#### Slot Props

Slot properties for the TableHeaderSelection component.

- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `multiple`: Whether multiple values are supported. (type `boolean`; required)
- `checked`: Whether the item is checked. (type `boolean | 'indeterminate'`; required)
- `disabled`: Whether the component is disabled. (type `boolean`; required)
- `ariaLabel`: Accessible label for the "select all" control. (type `string`; required)
- `updateChecked`: Update checked exposed in the slot scope. (type `(value: CheckedState | null) => void`; required)

### TableHeaderSort

#### Slot Props

Slot properties for the TableHeaderSort component.

- `ariaLabel`: Aria label exposed in the slot scope. (type `string`; required)
- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `sortOrder`: Sort order exposed in the slot scope. (type `TableSortOrder`; optional)
- `toggleSort`: Toggle sort exposed in the slot scope. (type `() => void`; required)

### TableIndex

#### Slot Props

Slot properties for the TableIndex component.

- `index`: Index of the current item. (type `number`; required)
- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `row`: Row exposed in the slot scope. (type `T`; required)
- `level`: Level exposed in the slot scope. (type `number`; required)
- `hasChildren`: Whether the component has children. (type `boolean`; required)

### TableRadio

#### Props

Properties for the TableRadio component.

- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `checked`: Whether the item is checked. (type `boolean`; optional)

### TableRoot

#### Props

Properties for the TableRoot component.

- `dir`: Reading direction of the component. (type `Direction`; optional)

### TableRow

- No documented props, emits, slots, or slot props were available.

### TableScroll

- No documented props, emits, slots, or slot props were available.

### TableSelection

#### Props

Properties for the TableSelection component.

- `defaultSelected`: Default selected. (type `(M extends true ? R[] : R)`; optional)
- `selected`: Whether the item is selected. (type `(M extends true ? R[] : R)`; optional)
- `multiple`: Whether multiple values are supported. (type `M`; optional)

#### Slot Props

Slot properties for the TableSelection component.

- `multiple`: Whether multiple values are supported. (type `boolean`; required)
- `checked`: Whether the item is checked. (type `boolean`; required)
- `ariaLabel`: Aria label exposed in the slot scope. (type `string`; required)
- `toggleSelect`: Toggle select exposed in the slot scope. (type `() => void`; required)
- `index`: Index of the current item. (type `number`; required)
- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `row`: Row exposed in the slot scope. (type `T`; required)
- `level`: Level exposed in the slot scope. (type `number`; required)
- `hasChildren`: Whether the component has children. (type `boolean`; required)
- `expanded`: Whether expanded. (type `boolean`; required)
- `toggleExpand`: Toggle expand exposed in the slot scope. (type `() => void`; required)

### TableTreeToggle

#### Slot Props

Slot properties for the TableTreeToggle component.

- `ariaLabel`: Aria label exposed in the slot scope. (type `string`; required)
- `index`: Index of the current item. (type `number`; required)
- `column`: Column exposed in the slot scope. (type `TableTypeColumn | TableDataColumn<T> | TableGroupColumn<T>`; required)
- `row`: Row exposed in the slot scope. (type `T`; required)
- `level`: Level exposed in the slot scope. (type `number`; required)
- `hasChildren`: Whether the component has children. (type `boolean`; required)
- `expanded`: Whether expanded. (type `boolean`; required)
- `toggleExpand`: Toggle expand exposed in the slot scope. (type `() => void`; required)
