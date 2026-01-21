# 选择器

## 概述

用于从选项列表中选择值的选择器组件。

## 用法

```vue
<script setup lang="ts">
import { SSelect } from '@soybeanjs/ui';

const value = ref('apple');
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];
</script>

<template>
  <SSelect v-model="value" :items="items" placeholder="Select a fruit..." />
</template>
```

## 演示

```playground
base
default-value
disabled
separator
group
multiple
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'SelectOptionData[]', default: '-', description: '选项数据。', required: true },
  { name: 'modelValue', type: 'string | number', default: '-', description: '选中的值。' },
  { name: 'placeholder', type: 'string', default: '-', description: '占位符文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '选择器是否禁用。' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否允许多选。' },
  { name: 'showArrow', type: 'boolean', default: 'false', description: '是否显示箭头。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Select size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | number) => void', description: '选择变化时触发。' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'Custom trigger element.' },
  { name: 'item', parameters: '{ item: SelectOptionData }', description: '自定义条目渲染。' },
  { name: 'value', parameters: '{ value: string | number }', description: 'Custom value display.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'SelectOptionData',
    description: 'Option data structure.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string | number', description: 'Unique value.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'disabled', type: 'boolean', description: '条目是否禁用。' },
      { name: 'separator', type: 'boolean', description: 'Show separator before this item.' },
    ]
  },
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'trigger', type: 'string', description: '触发按钮类名。' },
      { name: 'content', type: 'string', description: '下拉菜单内容容器类名。' },
      { name: 'item', type: 'string', description: 'Option item class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
