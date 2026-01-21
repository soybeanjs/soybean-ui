# 分段控件

## 概述

用于在多个选项之间快速切换的分段控件。

## 用法

```vue
<script setup lang="ts">
import { SSegment } from '@soybeanjs/ui';

const value = ref('daily');
const items = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
];
</script>

<template>
  <SSegment v-model="value" :items="items" />
</template>
```

## 演示

```playground
base
vertical
shape
icon
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'SegmentOptionData[]', default: '-', description: 'Segment items data.', required: true },
  { name: 'modelValue', type: 'string | number', default: '-', description: '选中的值。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Segment size.' },
  { name: 'shape', type: `'rounded' \| 'square' \| 'circle'`, default: `'rounded'`, description: 'Segment shape.' },
  { name: 'fill', type: `'solid' \| 'outline' \| 'ghost'`, default: `'solid'`, description: 'Fill style.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | number) => void', description: '选择变化时触发。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'SegmentOptionData',
    description: 'Data structure for segment items.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string | number', description: 'Unique value.' },
      { name: 'disabled', type: 'boolean', description: '条目是否禁用。' },
    ]
  },
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'list', type: 'string', description: 'List container class.' },
      { name: 'trigger', type: 'string', description: 'Segment button class.' },
      { name: 'indicator', type: 'string', description: 'Selection indicator class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
