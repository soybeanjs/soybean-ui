# 单选框组

## 概述

用于在多个选项中选择单个值的单选框组组件。

## 用法

```vue
<script setup lang="ts">
import { SRadioGroup } from '@soybeanjs/ui';

const value = ref('option-1');
const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];
</script>

<template>
  <SRadioGroup v-model="value" :items="items" />
</template>
```

## 演示

```playground
color
size
variant
card
```

## API

### SRadioGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string', default: '-', description: '选中的值。', required: true },
  { name: 'items', type: 'RadioGroupOptionData[]', default: '-', description: '选项数据。', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: '该组是否禁用。' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: '主题颜色。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SRadioGroup Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '选择变化时触发。' }
]"/>

### SRadioCardGroup Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'RadioCardGroupOptionData[]', default: '-', description: '卡片选项数据（包含图标/描述）。', required: true }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'RadioGroupOptionData',
    description: 'Option data structure.',
    fields: [
      { name: 'label', type: 'string', description: 'Label text.' },
      { name: 'value', type: 'string', description: 'Unique value.' },
      { name: 'disabled', type: 'boolean', description: '选项是否禁用。' },
    ]
  },
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'item', type: 'string', description: 'Item wrapper class.' },
      { name: 'indicator', type: 'string', description: 'Selected indicator class.' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>
