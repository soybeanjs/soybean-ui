# Table

## Overview

A data table component for displaying row and column data. `STable` combines the headless `TableCompact` aggregation component (9 zero-style base primitives in the `TableRoot` family) with the `tableVariants` style recipe (29 slots, 7 sizes × 2 visual variants). Supports a **config-driven `columns` model** (grouped headers, `index`/`selection`/`expand` type columns), sorting, filtering, multi/single selection, expandable and tree rows, fixed columns/headers, drag-and-keyboard column resizing, virtualization, and empty states; `default`/`simple` variants plus `bordered`/`rounded`/`striped` toggles. All interaction text and `aria-label`s (sorting, filtering, selection, expansion, column resize) are localized via `useLocaleMessages`.

## Usage

<UsageCode component="table" />

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

<PlaygroundGallery component="table" />

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

<ComponentApi component="table" />

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
    <!-- custom filter control -->
  </template>
</STable>
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
</STable>
```

### How do I localize table copy?

The empty state and all interaction `aria-label`s (sort/filter/select/expand/resize) follow the `ConfigProvider` `locale` (`table.*` messages, 14 language packs); override per instance via `ConfigProvider` `messages`, or use the same-name slots for fully custom content.
