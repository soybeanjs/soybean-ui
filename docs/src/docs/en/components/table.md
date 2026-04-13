# Table

## Overview

A data table component for displaying row and column data. Supports grouped headers, sorting, filtering, selection, expansion, tree rows, virtualization, and more.

## Usage

```vue
<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface TableData {
  id: number;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumn<TableData>[] = [
  { type: 'index', width: '50px' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', align: 'center' },
  { title: 'Address', dataIndex: 'address' }
];

const data: TableData[] = [
  { id: 1, name: 'John Doe', age: 30, address: '123 Main St' },
  { id: 2, name: 'Jane Smith', age: 25, address: '456 Elm St' },
  { id: 3, name: 'Bob Johnson', age: 40, address: '789 Oak St' }
];
</script>

<template>
  <STable :columns="columns" :data="data" :row-key="row => row.id" />
</template>
```

## Demos

```playground
base
expandable
bordered
striped
grouped-sort-filter
fixed-resizable
tree
virtualized
single-selection
multiple-selection
footer
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'columns', type: 'TableColumn<T>[]', default: '-', description: 'Array of column definitions.', required: true },
  { name: 'data', type: 'T[]', default: '-', description: 'Array of table data.', required: true },
  { name: 'rowKey', type: '(row: T) => R', default: '-', description: 'Function to generate unique key for each row.', required: true },
  { name: 'sortState', type: 'TableSortState', default: '-', description: 'Current sort state (controlled).' },
  { name: 'defaultSortState', type: 'TableSortState', default: '-', description: 'Default sort state (uncontrolled).' },
  { name: 'filterState', type: 'TableFilterState', default: '-', description: 'Current filter state (controlled).' },
  { name: 'defaultFilterState', type: 'TableFilterState', default: '-', description: 'Default filter state (uncontrolled).' },
  { name: 'columnWidths', type: 'TableColumnWidthState', default: '-', description: 'Current column width state (controlled).' },
  { name: 'defaultColumnWidths', type: 'TableColumnWidthState', default: '-', description: 'Default column width state (uncontrolled).' },
  { name: 'getChildren', type: '(row: T) => T[] | undefined', default: 'row => row.children', description: 'Returns nested child rows for tree tables.' },
  { name: 'indent', type: 'number', default: '16', description: 'Indent size in pixels for each tree level.' },
  { name: 'virtual', type: 'boolean', default: 'false', description: 'Enables virtual row rendering.' },
  { name: 'height', type: 'number | string', default: '-', description: 'Scrollable viewport height when virtualization is enabled.' },
  { name: 'estimateSize', type: 'number | ((index: number, row: T) => number)', default: '40', description: 'Estimated row height for the virtualizer.' },
  { name: 'virtualizerOptions', type: 'VirtualizerOptions', default: '{}', description: 'Additional TanStack virtualizer options such as overscan.' },
  { name: 'size', type: 'ThemeSize', default: 'md', description: 'Table size.' },
  { name: 'bordered', type: `'all' | boolean`, default: 'false', description: 'Whether to show borders.' },
  { name: 'striped', type: 'boolean', default: 'false', description: 'Whether to show striped rows.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether to allow multiple selection.' },
  { name: 'selected', type: 'R | R[]', default: '-', description: 'Selected row key (controlled).' },
  { name: 'defaultSelected', type: 'R | R[]', default: '-', description: 'Default selected row key (uncontrolled).' },
  { name: 'expanded', type: 'R[]', default: '-', description: 'Expanded row keys (controlled).' },
  { name: 'defaultExpanded', type: 'R[]', default: '-', description: 'Default expanded row keys (uncontrolled).' },
  { name: 'defaultExpandAll', type: 'boolean', default: 'false', description: 'Whether to expand all rows by default.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' },
  { name: 'class', type: 'string', default: '-', description: 'Additional class name for root element.' },
  { name: 'contentProps', type: 'TableContentProps', default: '-', description: 'Content container props.' },
  { name: 'headerProps', type: 'TableHeaderProps', default: '-', description: 'Header container props.' },
  { name: 'bodyProps', type: 'TableBodyProps', default: '-', description: 'Body container props.' },
  { name: 'footerProps', type: 'TableFooterProps', default: '-', description: 'Footer container props.' },
  { name: 'headProps', type: 'TableHeadProps', default: '-', description: 'Head cell props.' },
  { name: 'rowProps', type: 'TableRowProps', default: '-', description: 'Row props.' },
  { name: 'cellProps', type: 'TableCellProps', default: '-', description: 'Cell props.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:sortState', parameters: '(value: TableSortState | undefined) => void', description: 'Triggers when the sort state changes.' },
  { name: 'update:filterState', parameters: '(value: TableFilterState) => void', description: 'Triggers when the filter state changes.' },
  { name: 'update:columnWidths', parameters: '(value: TableColumnWidthState) => void', description: 'Triggers when the column width state changes.' },
  { name: 'update:selected', parameters: '(value: R | R[]) => void', description: 'Triggers when selected row changes.' },
  { name: 'update:expanded', parameters: '(value: R[]) => void', description: 'Triggers when expanded rows change.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'header', parameters: '{ column: TableColumn<T>; sortable: boolean; sortOrder?: TableSortOrder; filterValue: string }', description: 'Custom rendering for any header cell.' },
  { name: 'header-[key]', parameters: '{ column: TableColumn<T>; sortable: boolean; sortOrder?: TableSortOrder; filterValue: string }', description: 'Custom rendering for a specific header cell, using a dataIndex, type, or explicit key.' },
  { name: '[dataIndex]', parameters: '{ index: number; column: TableColumn<T>; row: T; value: any; level: number; hasChildren: boolean; expanded: boolean; toggleExpand: () => void }', description: 'Custom cell rendering.' },
  { name: 'header-index', parameters: '{ column: TableColumn<T> }', description: 'Custom index column header.' },
  { name: 'index', parameters: '{ index: number; column: TableColumn<T>; row: T; level: number; hasChildren: boolean }', description: 'Custom index cell.' },
  { name: 'header-selection', parameters: '{ column: TableColumn<T>; multiple: boolean }', description: 'Custom selection column header.' },
  { name: 'selection', parameters: '{ index: number; column: TableColumn<T>; row: T; level: number; hasChildren: boolean; expanded: boolean; toggleExpand: () => void; multiple: boolean }', description: 'Custom selection cell.' },
  { name: 'header-expand', parameters: '{ column: TableColumn<T> }', description: 'Custom expand column header.' },
  { name: 'expand', parameters: '{ index: number; column: TableColumn<T>; row: T; level: number; hasChildren: boolean; expanded: boolean; toggleExpand: () => void }', description: 'Custom expand cell.' },
  { name: 'expanded-row', parameters: '{ index: number; row: T; level: number; hasChildren: boolean }', description: 'Custom expanded row content.' },
  { name: 'footer', parameters: '{ columnSize: number }', description: 'Custom footer content.' }
]"/>

### Types

#### TableColumn

Column definition interface.

<DataTable :data="[
  { name: 'key', type: 'string', default: '-', description: 'Unique column key. Grouped headers should provide this explicitly.' },
  { name: 'type', type: `'index' | 'selection' | 'expand'`, default: '-', description: 'Special column type.' },
  { name: 'dataIndex', type: 'string', default: '-', description: 'Data field path, supports nesting like `user.name`.' },
  { name: 'title', type: 'string', default: '-', description: 'Column title.' },
  { name: 'align', type: `'left' | 'center' | 'right' | 'justify' | 'char'`, default: `'left'`, description: 'Alignment.' },
  { name: 'width', type: 'string', default: '-', description: 'Column width.' },
  { name: 'minWidth', type: 'string', default: '-', description: 'Minimum column width.' },
  { name: 'fixed', type: `'left' | 'right'`, default: '-', description: 'Fixed column side.' },
  { name: 'resizable', type: 'boolean', default: 'false', description: 'Enables column resizing.' },
  { name: 'children', type: 'TableColumn<T>[]', default: '-', description: 'Child columns for grouped headers.' },
  { name: 'sorter', type: 'boolean | ((a, b) => number)', default: '-', description: 'Enables sorting or provides a custom sort function.' },
  { name: 'filter', type: 'boolean | TableColumnFilter<T>', default: '-', description: 'Enables filtering or provides filter configuration.' },
  { name: 'hidden', type: 'boolean', default: 'false', description: 'Whether to hide the column.' }
]"/>

#### Ui

Custom styling classes.

<DataTable :data="[
  { name: 'root', type: 'string', description: 'Root container class.' },
  { name: 'content', type: 'string', description: 'Content container class.' },
  { name: 'header', type: 'string', description: 'Header container class.' },
  { name: 'body', type: 'string', description: 'Body container class.' },
  { name: 'footer', type: 'string', description: 'Footer container class.' },
  { name: 'row', type: 'string', description: 'Row class.' },
  { name: 'head', type: 'string', description: 'Header cell class.' },
  { name: 'cell', type: 'string', description: 'Cell class.' },
  { name: 'headContent', type: 'string', description: 'Header content container class.' },
  { name: 'fixed', type: 'string', description: 'Fixed column class.' },
  { name: 'sortTrigger', type: 'string', description: 'Sort trigger class.' },
  { name: 'filterInput', type: 'string', description: 'Filter input class.' },
  { name: 'resizeHandle', type: 'string', description: 'Resize handle class.' },
  { name: 'treeCell', type: 'string', description: 'Tree cell content class.' },
  { name: 'treeToggle', type: 'string', description: 'Tree toggle button class.' },
  { name: 'treeTogglePlaceholder', type: 'string', description: 'Tree toggle placeholder class.' },
  { name: 'selection', type: 'string', description: 'Selection checkbox class.' }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
