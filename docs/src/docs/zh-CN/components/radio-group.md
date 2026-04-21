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

> `SRadioGroup` 现在会把条目遍历和默认单选项结构组合委托给 headless `RadioGroupCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/radio-group` 直接导入 `RadioGroupCompact`。

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
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: '-', description: '分组方向。' },
  { name: 'variant', type: 'RadioGroupVariant', default: `'default'`, description: '视觉变体。' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: '主题颜色。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '尺寸。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '额外的根节点类名。' },
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
      { name: 'control', type: 'string', description: '单选控件类名。' },
      { name: 'indicator', type: 'string', description: 'Selected indicator class.' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
