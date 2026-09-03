# Table

Source URL: https://ui.soybeanjs.cn/components/table
Markdown URL: https://ui.soybeanjs.cn/components/table.md
Category: Data Display
Description: A data table component for displaying row and column data. `STable` combines the headless `TableCompact` aggregation component (9 zero-style base primitives in the `TableRoot` family) with the `tableVariants` style recipe (29 slots, 7 sizes × 2 visual variants). Supports a **config-driven `columns` model** (grouped headers, `index`/`selection`/`expand` type columns), sorting, filtering, multi/single selection, expandable and tree rows, fixed columns/headers, drag-and-keyboard column resizing, virtualization, and empty states; `default`/`simple` variants plus `bordered`/`rounded`/`striped` toggles. All interaction text and `aria-label`s (sorting, filtering, selection, expansion, column resize) are localized via `useLocaleMessages`.

## Overview

A data table component for displaying row and column data. `STable` combines the headless `TableCompact` aggregation component (9 zero-style base primitives in the `TableRoot` family) with the `tableVariants` style recipe (29 slots, 7 sizes × 2 visual variants). Supports a **config-driven `columns` model** (grouped headers, `index`/`selection`/`expand` type columns), sorting, filtering, multi/single selection, expandable and tree rows, fixed columns/headers, drag-and-keyboard column resizing, virtualization, and empty states; `default`/`simple` variants plus `bordered`/`rounded`/`striped` toggles. All interaction text and `aria-label`s (sorting, filtering, selection, expansion, column resize) are localized via `useLocaleMessages`.

## Usage

Usage examples for table are rendered on the site.

## Features

- 📋 Config-driven columns — `columns: TableColumn<T>[]` with grouped headers (`children`), `index`/`selection`/`expand` type columns, `fixed`/`width`/`align`/`hidden`; `rowKey` keeps row identity stable
- 🔀 Sorting — `sorter: true` or a custom comparator; controlled `sortState` / `v-model:sortState` or uncontrolled `defaultSortState`; `aria-sort` + localized sort-button `aria-label`
- 🔍 Filtering — `filter: true` or a `TableColumnFilter` (options + keyword matching + custom `match`); keyword search, option multi-select, summary count, and clear action are all localized
- ✅ Selection — multi-select by default (`multiple` defaults to `true`, checkboxes + header select-all); `multiple={false}` switches to single-select (row radio); controlled `selected` / `v-model:selected`
- 🧩 Expandable & tree rows — `expand` type column or the `expanded-row` slot renders expanded rows; `children`/`getChildren` drive tree rows with an inline `tree-toggle`
- 📐 Fixed & resizable — `fixed: 'start' | 'end'` fixed columns with gradient shadow indicators; `resizable` columns support pointer drag and arrow-key resizing (localized `aria-label`)
- ⚡ Performance — `virtual` + `height` enable virtualization (custom `estimateSize`/`virtualizerOptions`), rendering only visible rows
- 🌐 Localized by default — empty state, sort/filter/select/expand/resize `aria-label`s, and the filter popover copy all use `useLocaleMessages` (21 `table.*` messages across 14 language packs)

## Component family

- `STable` (styled) — entry wrapper; `tableVariants` recipe (29 slots = 16 headless slots + 11 filter/selection extra slots + 2 internal radio slots); `useOmitProps` forwarding + `useForwardListeners` event merging + full slot passthrough; injects default `header-selection`/`selection`/`header-sort`/`header-filter`/`header-resize`/`tree-toggle`/`expand`/`empty` slot content
- `TableCompact` (headless) — aggregation state owner: `useTableCompactState` (`expanded`/`sortState`/`filterState`/`columnWidths` via `useControllableState`, `selected`/`multiple` via `useSelection`), `useTableCompactData` (tree build/sort/filter/flatten), `useTableCompactResize` (pointer + keyboard column widths), `useTableCompactVirtual`; `provideTableCompactContext` bridges the 9 primitives
- `TableRoot` (headless) — root element, `dir` direction, renders `data-soybean-table-root` and the table semantic container
- `TableScroll` / `TableContent` / `TableHeader` / `TableBody` / `TableFooter` / `TableRow` / `TableHead` / `TableCell` (headless) — 9 base primitives, all zero-style, each rendering `data-soybean-table-*` data attributes
- `TableCompactHead` / `TableCompactRow` / `TableCompactCell` / `TableCompactExpandedRow` / `TableVirtualSpacerRow` (headless internal) — composition and rendering components inside the Compact aggregation (not publicly exported)
- `STableFilterPopover` (styled internal) — the filter popover (SPopover + SInput + SCheckbox + SButton) with localized search/options/summary/clear
- `STableRadio` (styled internal) — the row radio used in single-select mode (`aria-pressed` semantics), consuming the `radioRoot`/`radioIndicator` recipe slots directly
- `useTable` / `usePaginatedTable` (UI hooks) — client-side sort/filter/pagination composition hooks

## Demos

Interactive demos for table are rendered on the site.

- 01 Basic — plain `columns` + `data` rendering
- 02 Variant — `default` / `simple` visual variants
- 03 Bordered — `bordered` toggle
- 04 Rounded — `rounded` toggle
- 05 Striped — `striped` zebra rows
- 06 Empty — empty state (default `SEmpty` and custom `empty` slot)
- 07 Grouped — grouped headers (`children`)
- 08 Sorting — `sorter` with controlled/uncontrolled sorting
- 09 Filtering — `filter` options and the keyword filter popover
- 10 Fixed — `fixed: 'start' | 'end'` fixed columns
- 11 Resizable — `resizable` drag/keyboard column resize
- 12 Tree — tree rows (`children` + `tree-toggle`)
- 13 Virtualized — `virtual` + `height` virtualization
- 14 Expandable — `expand` column and `expanded-row` slot
- 15 Footer — `footer` summary slot
- 16 Bottom — `bottom` slot
- 17 Multiple Selection — multi-select (checkboxes + select-all)
- 18 Single Selection — `multiple={false}` single-select (radio)
- 19 Row Events — `rowClick`/`rowDblclick`/`rowContextmenu` row events
- 20 Sizes — 7 sizes (xs–2xl)

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
- `rowClick`: Emitted when a row is clicked. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)
- `rowDblclick`: Emitted when a row is double clicked. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)
- `rowContextmenu`: Emitted when a row context menu is triggered. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)
- `rowMouseenter`: Emitted when the pointer enters a row. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)
- `rowMouseleave`: Emitted when the pointer leaves a row. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)

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
- `rowClick`: Emitted when a row is clicked. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)
- `rowDblclick`: Emitted when a row is double clicked. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)
- `rowContextmenu`: Emitted when a row context menu is triggered. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)
- `rowMouseenter`: Emitted when the pointer enters a row. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)
- `rowMouseleave`: Emitted when the pointer leaves a row. (type `[event: MouseEvent, payload: TableRowEventPayload<T, R>]`; parameters `event: MouseEvent, payload: TableRowEventPayload<T, R>`)

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

## Notes

### Architecture and benchmark differences

`TableCompact` owns all state and the data pipeline (`useControllableState` controlled/uncontrolled dual channels + `useSelection` multi/single selection + tree build/sort/filter/virtualization); all base primitives stay zero-style and only the UI wrapper injects `tableVariants` classes. The filter popover and single-select radio are UI-internal components consumed by default slots, but consumers can replace them entirely via same-name slots (`header-filter`/`selection`, etc.). Sort buttons and filter triggers are absolutely-positioned icon buttons with localized `aria-label`s; column resizing supports both pointer (`PointerEvent`) and keyboard (arrow-key) channels. Virtualization uses the built-in `@soybeanjs/headless` virtualizer, rendering only visible rows while syncing measured column widths. Ant Design / Element Plus tables are declarative component instances (`el-table-column`) whose fixed columns rely on config classes; SoybeanUI's controlled state, `aria-sort` semantics, and full-chain localization (including the filter popover) exceed most mainstream libraries.

| Capability                            | SoybeanUI | Ant Design | Element Plus | Naive UI | Mantine Table |
| :------------------------------------ | :-------: | :--------: | :----------: | :------: | :-----------: |
| headless/styled split                 |    ✅     |     —      |      —       |    —     |       —       |
| Config columns + grouped headers      |    ✅     |     ✅     |      ✅      |    ✅    |      ✅       |
| Sorting (aria-sort + controlled)      |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| Filtering (keyword + multi-select)    |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| Selection (multi/single + select-all) |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| Expandable + tree rows                |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| Fixed columns / fixed header          |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| Drag + keyboard column resize         |    ✅     |     ✅     |      ⚠️      |    ✅    |       —       |
| Virtualization                        |    ✅     |     ✅     |      ⚠️      |    ✅    |      ⚠️       |

`⚠️` = partial support (Mantine Table's sorting/filtering/selection are manual; Element Plus virtualization only exists in the separate `el-table-v2`; Element Plus drag-resize requires `border` mode).

### Cautions

- `dataIndex` in `columns` is a type-safe path (`Path<TableRowValue<T>>`) strictly bound to the `T` row shape; group columns (`children`) cannot declare `dataIndex`/`sorter`/`filter` at the same time.
- `multiple` defaults to `true` (multi-select); setting it to `false` renders row radios, makes `selected` a single value (`R | undefined`), and hides the header select-all checkbox.
- Sorting/filtering/column-widths/expansion/selection are all **controlled/uncontrolled dual channels**: when passing `sortState` (etc.) you must also listen for the matching `update:sortState` (or use `v-model:sortState`) to write back, otherwise state does not update.
- The controlled `expanded` state is keyed by row `rowKey`; `defaultExpandAll` only applies when expansion is uncontrolled (no `expanded` prop).
- Virtualization requires `height`; without it `virtual` is ignored (falls back to normal rendering).
- Fixed columns inject a background on `data-fixed` cells; fixed-column shadows are drawn via the `data-fixed-last-start`/`data-fixed-first-end` data attributes — keep these attributes when customizing `cell`/`row` slots to preserve the visuals.
- Filter popover copy (summary, keyword, options, clear) and the empty state follow the `ConfigProvider` locale; the column label falls back through `title` → `key` → `dataIndex`.

## FAQ

### How do I select rows and read the selected data?

Use `multiple` (multi-select by default) with `v-model:selected` and `rowKey`:

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id" v-model:selected="selected" />
```

`selected` is an array of the selected rows' `rowKey`s; map them back to `data` when you need the full row objects.

### How do I make a single-select table?

Set `multiple={false}` — row radios render and `selected` becomes a single value:

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id" :multiple="false" v-model:selected="selected" />
```

### How do I customize the filter popover?

Replace the default `STableFilterPopover` entirely with the `header-filter` slot, or configure `filter` options and keyword matching on the column:

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id">
  <template #header-filter="{ column, filtered, filterValues, setFilterValues, clearFilter }">

  </template>

```

### How do I set the initial sort/filter state?

Seed the uncontrolled `defaultSortState`/`defaultFilterState`, then let the component maintain state internally; switch to the controlled channels and listen for `update:sortState`/`update:filterState` when you need external sync:

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id" :default-sort-state="{ key: 'age', order: 'asc' }" />
```

### How do I handle large datasets?

Enable virtualization (`virtual` + `height`) and tune `estimateSize` as needed; the sort/filter pipeline is pure functions with `shallowRef` state, so 1000-row workloads need no extra handling.

### How do I render a summary/footer row?

Use the `footer` slot — it receives `columnSize`, letting you render summary cells per column:

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id">
  <template #footer="{ columnSize }">
    <STableRow>
      <STableCell :colspan="columnSize">Total: {{ data.length }} items</STableCell>
    </STableRow>
  </template>

```

### How do I localize table copy?

The empty state and all interaction `aria-label`s (sort/filter/select/expand/resize) follow the `ConfigProvider` `locale` (`table.*` messages, 14 language packs); override per instance via `ConfigProvider` `messages`, or use the same-name slots for fully custom content.
