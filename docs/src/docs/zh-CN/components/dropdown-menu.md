# 下拉菜单

## 概述

由按钮触发向用户展示的菜单，例如一组操作或功能入口。

## 用法

```vue
<script setup lang="ts">
import { SDropdownMenu, SButton } from '@soybeanjs/ui';

const items = [
  { label: 'My Account', isGroupLabel: true },
  { label: 'Profile', value: 'profile', icon: 'lucide:user', shortcut: '⇧⌘P' },
  { label: 'Billing', value: 'billing', icon: 'lucide:credit-card', shortcut: '⌘B' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings', shortcut: '⌘S' },
  { separator: true },
  { label: 'Logout', value: 'logout', icon: 'lucide:log-out', shortcut: '⇧⌘Q' }
];
</script>

<template>
  <SDropdownMenu :items="items">
    <template #trigger>
      <SButton variant="outline">Open Menu</SButton>
    </template>
  </SDropdownMenu>
</template>
```

## 演示

```playground
base
trigger
arrow
checkbox
radio
mix
```

## API

### SDropdownMenu Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuOptionData[]', default: '-', description: '菜单数据。', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: '下拉菜单是否禁用。' },
  { name: 'placement', type: 'Placement', default: `'bottom'`, description: '首选弹出位置。' },
  { name: 'showArrow', type: 'boolean', default: 'false', description: '是否显示箭头。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SDropdownMenu Emits

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '(item: MenuOptionData, event: Event) => void', description: '选择菜单项时触发。' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: '触发下拉菜单的元素。' },
  { name: 'item', parameters: '{ item: MenuOptionData }', description: '自定义条目渲染。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类 (inherits from Menu Ui).',
    fields: [
      { name: 'content', type: 'string', description: '下拉菜单内容容器类名。' },
      { name: 'item', type: 'string', description: '条目类名。' },
    ]
  }
]"/>
