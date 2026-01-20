# 虚拟列表

## 概述

虚拟滚动组件：仅渲染视口内的条目，从而高效渲染超长列表。

## 用法

```vue
<script setup lang="ts">
import { SVirtualizer } from '@soybeanjs/ui';

const data = Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i}` }));
</script>

<template>
  <div class="h-[400px] border rounded-md">
    <SVirtualizer :data="data" :item-size="50">
      <template #default="{ item }">
        <div class="h-[50px] flex items-center px-4 border-b">
          {{ item.text }}
        </div>
      </template>
    </SVirtualizer>
  </div>
</template>
```

## 演示

```playground
base
horizontal
dynamic
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'data', type: 'any[]', default: '[]', description: '数据源。', required: true },
  { name: 'itemSize', type: 'number', default: '-', description: '每个条目的固定高度/宽度。' },
  { name: 'horizontal', type: 'boolean', default: 'false', description: '是否横向滚动。' },
  { name: 'overscan', type: 'number', default: '5', description: '视口外额外渲染的条目数量。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ item: any, index: number }', description: '条目渲染插槽。' }
]"/>
