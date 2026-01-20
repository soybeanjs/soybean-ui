# 命令面板

## 概述

用于快速搜索与执行命令的命令面板组件。

## 用法

```vue
<script setup lang="ts">
import { SCommand } from '@soybeanjs/ui';

const items = [
  { label: 'Profile', value: 'profile', icon: 'lucide:user' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings' },
  { separator: true },
  { label: 'Logout', value: 'logout', icon: 'lucide:log-out' }
];
</script>

<template>
  <SCommand :items="items" placeholder="Type a command..." />
</template>
```

## 演示

```playground
base
dialog
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'CommandOptionData[]', default: '-', description: 'Data array for command items.', required: true },
  { name: 'modelValue', type: 'string', default: '-', description: 'The controlled value of the selected item.' },
  { name: 'searchTerm', type: 'string', default: '-', description: 'The controlled search term.' },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text for the input.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮。' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Command menu size.' },
  { name: 'emptyLabel', type: 'string', default: `'No results found.'`, description: 'Text to show when no items match.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '选择菜单项时触发。' },
  { name: 'update:searchTerm', parameters: '(value: string) => void', description: '搜索词变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'input-leading', parameters: '-', description: 'Content before input.' },
  { name: 'input-trailing', parameters: '-', description: 'Content after input.' },
  { name: 'empty', parameters: '-', description: 'Custom empty state content.' },
  { name: 'item', parameters: '{ item: CommandOptionData }', description: '自定义条目渲染。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'CommandOptionData',
    description: 'Data structure for command items.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string', description: 'Unique value.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'shortcut', type: 'string', description: 'Keyboard shortcut.' },
      { name: 'separator', type: 'boolean', description: 'Show separator before this item.' },
      { name: 'disabled', type: 'boolean', description: '条目是否禁用。' },
    ]
  }
]"/>
