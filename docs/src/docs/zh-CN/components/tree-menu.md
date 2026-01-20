# 树形菜单

## 概述

用于展示可交互树形菜单的组件。

## 用法

```vue
<script setup lang="ts">
import { STreeMenu } from '@soybeanjs/ui';

const items = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: 'lucide:layout-dashboard',
    children: [
      { label: 'Analytics', value: 'analytics' },
      { label: 'Reports', value: 'reports' }
    ]
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: 'lucide:settings'
  }
];
</script>

<template>
  <STreeMenu :items="items" />
</template>
```

## 演示

```playground
base
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'TreeMenuOptionData[]', default: '-', description: '菜单数据。', required: true },
  { name: 'defaultExpanded', type: 'string[]', default: '[]', description: '默认展开的键值。' },
  { name: 'defaultSelected', type: 'string', default: '-', description: '默认选中的键值。' },
  { name: 'accordion', type: 'boolean', default: 'false', description: '是否启用手风琴模式。' },
  { name: 'collapsed', type: 'boolean', default: 'false', description: '菜单是否折叠。' },
  { name: 'collapsedWidth', type: 'number', default: '50', description: 'Width when collapsed.' },
  { name: 'indent', type: 'number', default: '16', description: 'Indentation width for nested items.' },
  { name: 'side', type: `'left' \| 'right'`, default: `'left'`, description: 'Side position (affects indentation direction).' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: '菜单尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:expanded', parameters: '(keys: string[]) => void', description: '展开键值变化时触发。' },
  { name: 'update:selected', parameters: '(key: string) => void', description: '选中键值变化时触发。' },
  { name: 'click', parameters: '(item: TreeMenuOptionData) => void', description: '点击条目时触发。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'TreeMenuOptionData',
    description: 'Data structure for menu items.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string', description: 'Unique identifier.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'children', type: 'TreeMenuOptionData[]', description: 'Child items.' },
      { name: 'disabled', type: 'boolean', description: '条目是否禁用。' },
      { name: 'badge', type: 'string', description: 'Badge text.' },
      { name: 'tag', type: 'string', description: 'Tag text.' },
    ]
  }
]"/>
