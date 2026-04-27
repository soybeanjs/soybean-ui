# 表格

## 概述

用于展示行列数据的数据表格组件。支持分组表头、排序、筛选、选择、展开、树形行、虚拟滚动和空状态展示等功能，并提供 default 与 simple 两种视觉变体，以及 rounded 圆角开关。

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
  <STable variant="simple" :rounded="false" :columns="columns" :data="data" :row-key="row => row.id" />
</template>
```

## 演示

```playground
base
variant
bordered
rounded
striped
empty
grouped
sorting
filtering
fixed
resizable
tree
virtualized
expandable
footer
bottom
multiple-selection
single-selection
sizes
```

## API

<ComponentApi component="table" />
