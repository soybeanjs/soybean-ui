# 手风琴

## 概述

一组垂直堆叠的可交互标题，每个标题都能展开/收起对应内容区域。支持单项或多项展开模式，并且样式可完全自定义。

## 用法

```vue
<script setup lang="ts">
import { SAccordion } from '@soybeanjs/ui';

const items = [
  { title: 'Is it accessible?', value: 'item-1', description: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  {
    title: 'Is it styled?',
    value: 'item-2',
    description: "Yes. It comes with default styles that matches the other components' aesthetic."
  },
  {
    title: 'Is it animated?',
    value: 'item-3',
    description: "Yes. It's animated by default, but you can disable it if you prefer."
  }
];
const value = ref('item-1');
</script>

<template>
  <SAccordion v-model="value" :items="items" />
</template>
```

## 演示

```playground
single
always-one
multiple
custom-icon
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'v-model', type: 'string | string[]', default: '-', description: 'The controlled value of the item(s) to expand.', required: true },
  { name: 'items', type: 'AccordionOptionData[]', default: '-', description: 'The data array to render items.', required: true },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'The size of the accordion.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否允许同时展开多个条目。' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: '已展开的条目是否允许收起。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | string[]) => void', description: '展开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'title', parameters: 'AccordionSlotProps', description: 'Custom title content.' },
  { name: 'leading', parameters: 'AccordionSlotProps', description: 'Content before the title.' },
  { name: 'content', parameters: 'AccordionSlotProps', description: 'Custom content body.' },
  { name: 'trigger-icon', parameters: 'AccordionSlotProps', description: 'Custom expand/collapse icon.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'AccordionSlotProps',
    description: 'Slot properties exposed to scoped slots.',
    fields: [
      { name: 'item', type: 'AccordionOptionData', description: 'Current item data.' },
      { name: 'modelValue', type: 'string | string[]', description: 'Current active value(s).' },
      { name: 'open', type: 'boolean', description: '当前条目是否打开。' },
    ]
  },
  {
    name: 'AccordionOptionData',
    description: 'Data structure for accordion items.',
    fields: [
      { name: 'value', type: 'string', required: true, description: 'Unique identifier for the item.' },
      { name: 'title', type: 'string', description: 'The title text.' },
      { name: 'description', type: 'string', description: 'The content text.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'disabled', type: 'boolean', description: '条目是否禁用。' },
    ]
  },
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'item', type: 'string', description: 'Item container class.' },
      { name: 'header', type: 'string', description: '头部容器类名。' },
      { name: 'trigger', type: 'string', description: '触发按钮类名。' },
      { name: 'content', type: 'string', description: '内容容器类名。' },
      { name: 'triggerIcon', type: 'string', description: 'Trigger icon class.' },
      { name: 'triggerLeadingIcon', type: 'string', description: 'Leading icon class.' },
    ]
  }
]" />
