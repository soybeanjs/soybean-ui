# 分页

## 概述

分页用于将内容或数据拆分为多个页面，并提供用于跳转到上一页/下一页的导航控件。

## 用法

```vue
<script setup lang="ts">
import { SPagination } from '@soybeanjs/ui';

const page = ref(1);
</script>

<template>
  <SPagination v-model:page="page" :total="100" :items-per-page="10" />
</template>
```

## 演示

```playground
variant
size
shape
slot
action
show
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'page', type: 'number', default: '1', description: '当前页码。', required: true },
  { name: 'total', type: 'number', default: '0', description: '总条目数。', required: true },
  { name: 'itemsPerPage', type: 'number', default: '10', description: '每页条目数。' },
  { name: 'siblingCount', type: 'number', default: '1', description: '当前页两侧显示的相邻页数。' },
  { name: 'showEdges', type: 'boolean', default: 'false', description: '是否显示首页/末页按钮。' },
  { name: 'showFirstOrLast', type: 'boolean', default: 'false', description: '是否显示首/末箭头按钮。' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'ghost' \| 'light'`, default: `'outline'`, description: '视觉样式变体。' },
  { name: 'shape', type: `'rounded' \| 'square' \| 'circle'`, default: `'rounded'`, description: '按钮形状。' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: '分页尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:page', parameters: '(page: number) => void', description: '页码变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'prev', parameters: '-', description: '上一页按钮内容。' },
  { name: 'next', parameters: '-', description: '下一页按钮内容。' },
  { name: 'first', parameters: '-', description: '首页按钮内容。' },
  { name: 'last', parameters: '-', description: '末页按钮内容。' },
  { name: 'ellipsis', parameters: '-', description: '省略号内容。' },
  { name: 'item', parameters: '{ page: number, active: boolean }', description: '自定义页码项内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'list', type: 'string', description: '列表容器类名。' },
      { name: 'item', type: 'string', description: '页码项类名。' },
      { name: 'ellipsis', type: 'string', description: '省略号项类名。' },
      { name: 'button', type: 'string', description: '导航按钮类名。' },
    ]
  }
]"/>
