# 标签页

## 概述

用于在多个内容面板之间切换的标签页组件。

## 用法

```vue
<script setup lang="ts">
import { STabs } from '@soybeanjs/ui';

const value = ref('account');
const items = [
  { label: 'Account', value: 'account' },
  { label: 'Password', value: 'password' }
];
</script>

<template>
  <STabs v-model="value" :items="items">
    <template #content="{ value }">
      <div v-if="value === 'account'">Make changes to your account here.</div>
      <div v-else-if="value === 'password'">Change your password here.</div>
    </template>
  </STabs>
</template>
```

## 演示

```playground
horizontal
vertical
fill
custom
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'TabsOptionData[]', default: '-', description: 'Tabs data.', required: true },
  { name: 'modelValue', type: 'string', default: '-', description: 'Selected tab value.' },
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: 'Tabs orientation.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Tabs size.' },
  { name: 'fill', type: `'solid' \| 'outline' \| 'ghost'`, default: `'ghost'`, description: 'Fill style.' },
  { name: 'enableIndicator', type: 'boolean', default: 'true', description: '是否显示 the active indicator.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '选中标签页变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'content', parameters: '{ value: string }', description: 'Tab panel content.' },
  { name: 'trigger', parameters: '{ item: TabsOptionData }', description: 'Custom trigger content.' },
  { name: 'indicator', parameters: '-', description: 'Custom indicator content.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'TabsOptionData',
    description: 'Data structure for tabs.',
    fields: [
      { name: 'label', type: 'string', description: 'Tab label.' },
      { name: 'value', type: 'string', description: 'Unique value.' },
      { name: 'disabled', type: 'boolean', description: '标签页是否禁用。' },
    ]
  },
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'list', type: 'string', description: 'Tab list container class.' },
      { name: 'trigger', type: 'string', description: 'Tab trigger class.' },
      { name: 'indicator', type: 'string', description: 'Active indicator class.' },
      { name: 'content', type: 'string', description: 'Tab content container class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
