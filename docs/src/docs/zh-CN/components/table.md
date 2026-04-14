# 表格

## 概述

用于展示行列数据的数据表格组件。支持分组表头、排序、筛选、选择、展开、树形行、虚拟滚动等功能。

## 用法

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

## 演示

```playground
base
bordered
striped
grouped-sort-filter
fixed-resizable
tree
virtualized
single-selection
multiple-selection
expandable
footer
sizes
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'columns', type: 'TableColumn<T>[]', default: '-', description: '列配置数组。', required: true },
  { name: 'data', type: 'T[]', default: '-', description: '表格数据数组。', required: true },
  { name: 'rowKey', type: '(row: T) => R', default: '-', description: '行数据的唯一键生成函数。', required: true },
  { name: 'sortState', type: 'TableSortState', default: '-', description: '当前排序状态（受控）。' },
  { name: 'defaultSortState', type: 'TableSortState', default: '-', description: '默认排序状态（非受控）。' },
  { name: 'filterState', type: 'TableFilterState', default: '-', description: '当前筛选状态（受控）。' },
  { name: 'defaultFilterState', type: 'TableFilterState', default: '-', description: '默认筛选状态（非受控）。' },
  { name: 'columnWidths', type: 'TableColumnWidthState', default: '-', description: '当前列宽状态（受控）。' },
  { name: 'defaultColumnWidths', type: 'TableColumnWidthState', default: '-', description: '默认列宽状态（非受控）。' },
  { name: 'getChildren', type: '(row: T) => T[] | undefined', default: 'row => row.children', description: '返回树形表格的子节点数据。' },
  { name: 'indent', type: 'number', default: '16', description: '每一级树形缩进的像素值。' },
  { name: 'virtual', type: 'boolean', default: 'false', description: '是否启用虚拟行渲染。' },
  { name: 'height', type: 'number | string', default: '-', description: '启用虚拟滚动时的视口高度。' },
  { name: 'estimateSize', type: 'number | ((index: number, row: T) => number)', default: '40', description: '虚拟滚动的行高预估值。' },
  { name: 'virtualizerOptions', type: 'VirtualizerOptions', default: '{}', description: '额外的 TanStack 虚拟滚动配置，例如 overscan。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '表格尺寸。' },
  { name: 'bordered', type: 'boolean', default: `false`, description: '是否显示边框。' },
  { name: 'striped', type: 'boolean', default: 'false', description: '是否显示斑马纹。' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否允许多选。' },
  { name: 'selected', type: 'R | R[]', default: '-', description: '选中的行键值（受控）。' },
  { name: 'defaultSelected', type: 'R | R[]', default: '-', description: '默认选中的行键值（非受控）。' },
  { name: 'expanded', type: 'R[]', default: '-', description: '展开的行键值数组（受控）。' },
  { name: 'defaultExpanded', type: 'R[]', default: '-', description: '默认展开的行键值数组（非受控）。' },
  { name: 'defaultExpandAll', type: 'boolean', default: 'false', description: '是否默认展开所有行。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' },
  { name: 'class', type: 'string', default: '-', description: '根元素额外类名。' },
  { name: 'contentProps', type: 'TableContentProps', default: '-', description: '内容容器属性。' },
  { name: 'headerProps', type: 'TableHeaderProps', default: '-', description: '表头容器属性。' },
  { name: 'bodyProps', type: 'TableBodyProps', default: '-', description: '表体容器属性。' },
  { name: 'footerProps', type: 'TableFooterProps', default: '-', description: '表尾容器属性。' },
  { name: 'headProps', type: 'TableHeadProps', default: '-', description: '表头单元格属性。' },
  { name: 'rowProps', type: 'TableRowProps', default: '-', description: '行属性。' },
  { name: 'cellProps', type: 'TableCellProps', default: '-', description: '单元格属性。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:sortState', parameters: '(value: TableSortState | undefined) => void', description: '排序状态变化时触发。' },
  { name: 'update:filterState', parameters: '(value: TableFilterState) => void', description: '筛选状态变化时触发。' },
  { name: 'update:columnWidths', parameters: '(value: TableColumnWidthState) => void', description: '列宽状态变化时触发。' },
  { name: 'update:selected', parameters: '(value: R | R[]) => void', description: '选中行变化时触发。' },
  { name: 'update:expanded', parameters: '(value: R[]) => void', description: '展开行变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'header', parameters: '{ column: TableColumn<T>; sortable: boolean; sortOrder?: TableSortOrder; filterValue: string }', description: '自定义任意表头单元格渲染。' },
  { name: 'header-[key]', parameters: '{ column: TableColumn<T>; sortable: boolean; sortOrder?: TableSortOrder; filterValue: string }', description: '自定义指定表头单元格渲染，支持 dataIndex、type 或自定义 key。' },
  { name: '[dataIndex]', parameters: '{ index: number; column: TableColumn<T>; row: T; value: any; level: number; hasChildren: boolean; expanded: boolean; toggleExpand: () => void }', description: '自定义单元格渲染。' },
  { name: 'header-index', parameters: '{ column: TableColumn<T> }', description: '自定义索引列头。' },
  { name: 'index', parameters: '{ index: number; column: TableColumn<T>; row: T; level: number; hasChildren: boolean }', description: '自定义索引单元格。' },
  { name: 'header-selection', parameters: '{ column: TableColumn<T>; multiple: boolean }', description: '自定义选择列头。' },
  { name: 'selection', parameters: '{ index: number; column: TableColumn<T>; row: T; level: number; hasChildren: boolean; expanded: boolean; toggleExpand: () => void; multiple: boolean }', description: '自定义选择单元格。' },
  { name: 'header-expand', parameters: '{ column: TableColumn<T> }', description: '自定义展开列头。' },
  { name: 'expand', parameters: '{ index: number; column: TableColumn<T>; row: T; level: number; hasChildren: boolean; expanded: boolean; toggleExpand: () => void }', description: '自定义展开单元格。' },
  { name: 'expanded-row', parameters: '{ index: number; row: T; level: number; hasChildren: boolean }', description: '自定义展开行内容。' },
  { name: 'footer', parameters: '{ columnSize: number }', description: '自定义表尾内容。' }
]"/>

### 类型

#### TableColumn

列配置接口。

<DataTable :data="[
  { name: 'key', type: 'string', default: '-', description: '列的唯一标识，分组表头建议显式传入。' },
  { name: 'type', type: `'index' | 'selection' | 'expand'`, default: '-', description: '特殊列类型。' },
  { name: 'dataIndex', type: 'string', default: '-', description: '数据字段路径，支持嵌套如 `user.name`。' },
  { name: 'title', type: 'string', default: '-', description: '列标题。' },
  { name: 'align', type: `'left' | 'center' | 'right' | 'justify' | 'char'`, default: `'left'`, description: '对齐方式。' },
  { name: 'width', type: 'string', default: '-', description: '列宽度。' },
  { name: 'minWidth', type: 'string', default: '-', description: '列最小宽度。' },
  { name: 'fixed', type: `'left' | 'right'`, default: '-', description: '固定列方向。' },
  { name: 'resizable', type: 'boolean', default: 'false', description: '是否启用列宽拖拽调整。' },
  { name: 'children', type: 'TableColumn<T>[]', default: '-', description: '分组表头的子列。' },
  { name: 'sorter', type: 'boolean | ((a, b) => number)', default: '-', description: '是否启用排序，或提供自定义排序函数。' },
  { name: 'filter', type: 'boolean | TableColumnFilter<T>', default: '-', description: '是否启用筛选，或提供筛选配置。' },
  { name: 'hidden', type: 'boolean', default: 'false', description: '是否隐藏列。' }
]"/>

#### Ui

自定义样式类。

<DataTable :data="[
  { name: 'root', type: 'string', description: '根容器类名。' },
  { name: 'content', type: 'string', description: '内容容器类名。' },
  { name: 'header', type: 'string', description: '表头容器类名。' },
  { name: 'body', type: 'string', description: '表体容器类名。' },
  { name: 'footer', type: 'string', description: '表尾容器类名。' },
  { name: 'row', type: 'string', description: '行类名。' },
  { name: 'head', type: 'string', description: '表头单元格类名。' },
  { name: 'cell', type: 'string', description: '单元格类名。' },
  { name: 'fixed', type: 'string', description: '固定列附加类名。' },
  { name: 'sortTrigger', type: 'string', description: '排序触发器类名。' },
  { name: 'filterInput', type: 'string', description: '筛选输入框类名。' },
  { name: 'resizeHandle', type: 'string', description: '列宽调整手柄类名。' },
  { name: 'treeCell', type: 'string', description: '树形单元格内容类名。' },
  { name: 'treeToggle', type: 'string', description: '树形展开按钮类名。' },
  { name: 'treeTogglePlaceholder', type: 'string', description: '树形按钮占位类名。' },
  { name: 'selection', type: 'string', description: '选择框类名。' }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
