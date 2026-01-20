# 树

## 概述

用于展示树形层级数据的组件。

## 用法

```vue
<script setup lang="ts">
import { STree } from '@soybeanjs/ui';

const items = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Work' },
      { id: '1-2', label: 'Personal' }
    ]
  }
];
</script>

<template>
  <STree :items="items" />
</template>
```

## 演示

```playground
base
virtualizer
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'TreeItemData[]', default: '-', description: '树形数据。', required: true },
  { name: 'selection', type: 'boolean', default: 'false', description: '是否启用选择。' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否启用多选。' },
  { name: 'defaultExpanded', type: 'string[]', default: '[]', description: '默认展开的键值。' },
  { name: 'defaultSelected', type: 'string[]', default: '[]', description: '默认选中的键值。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:expanded', parameters: '(keys: string[]) => void', description: '展开键值变化时触发。' },
  { name: 'update:selected', parameters: '(keys: string[]) => void', description: '选中键值变化时触发。' },
  { name: 'node-click', parameters: '(node: TreeItemData) => void', description: '节点被点击时触发。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'TreeItemData',
    description: 'Data structure for tree items.',
    fields: [
      { name: 'id', type: 'string', description: 'Unique identifier.' },
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'children', type: 'TreeItemData[]', description: 'Child items.' },
      { name: 'disabled', type: 'boolean', description: '条目是否禁用。' },
    ]
  }
]"/>
