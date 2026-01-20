# 列表

## 概述

用于展示列表结构内容的组件。

## 用法

```vue
<script setup lang="ts">
import { SList, SListItem } from '@soybeanjs/ui';
</script>

<template>
  <SList>
    <SListItem title="Item 1" description="Description 1" />
    <SListItem title="Item 2" description="Description 2" />
  </SList>
</template>
```

## 演示

```playground
base
```

## API

### SList Props

<DataTable preset="props" :data="[
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'List size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SListItem Props

<DataTable preset="props" :data="[
  { name: 'title', type: 'string', default: '-', description: 'Item title.' },
  { name: 'description', type: 'string', default: '-', description: 'Item description.' }
]"/>

### 插槽 (SListItem)

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Custom content.' },
  { name: 'title', parameters: '-', description: 'Custom title.' },
  { name: 'description', parameters: '-', description: 'Custom description.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: 'List container class.' },
      { name: 'item', type: 'string', description: 'List item class.' },
    ]
  }
]"/>
