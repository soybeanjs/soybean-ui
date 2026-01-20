# 菜单

## 概述

Menu 组件家族可用于构建复杂的嵌套菜单（包含下拉菜单与右键菜单）。它支持数据驱动方式：通过 `SMenuOptions` 轻松配置分组、子菜单、复选项与单选项等。

## 组件

- **SMenuOptions**: The main component for rendering a list of menu items from data.
- **SMenuOption**: A recursive component used internally by `SMenuOptions` (can be used standalone).
- **SMenuCheckboxOptions**: For rendering a group of checkbox items.
- **SMenuRadioOptions**: For rendering a group of radio items.

## 用法

### 数据驱动菜单

```vue
<script setup lang="ts">
import { SMenuOptions } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const items: MenuOptionData[] = [
  { label: 'My Account', isGroupLabel: true },
  { label: 'Profile', value: 'profile', icon: 'lucide:user', shortcut: '⇧⌘P' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings', shortcut: '⌘S' },
  { separator: true },
  {
    label: 'Theme',
    value: 'theme',
    children: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' }
    ]
  }
];

function handleSelect(item: MenuOptionData) {
  console.log('Selected:', item.value);
}
</script>

<template>
  <SMenuOptions :items="items" @select="handleSelect" />
</template>
```

## API

### SMenuOptions Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuOptionData[]', required: true, description: '菜单数据数组' },
  { name: 'groupProps', type: 'MenuGroupProps', default: '-', description: '菜单分组的属性' }
]"/>

### SMenuOptions Events

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '(item: MenuOptionData, event: Event) => void', description: '选择菜单项时触发' }
]"/>

### MenuOptionData Type

<TypeTable :data="[
  {
    name: 'MenuOptionData',
    description: 'Data structure for menu items',
    fields: [
      { name: 'label', type: 'string', description: 'Display label' },
      { name: 'value', type: 'any', description: 'Unique value' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify)' },
      { name: 'shortcut', type: 'string', description: 'Keyboard shortcut' },
      { name: 'disabled', type: 'boolean', description: 'Disabled state' },
      { name: 'separator', type: 'boolean', description: 'Show separator before this item' },
      { name: 'isGroupLabel', type: 'boolean', description: 'Render as group label' },
      { name: 'children', type: 'MenuOptionData[]', description: 'Submenu items' },
      { name: 'linkProps', type: 'LinkProps', description: 'Render as link' }
    ]
  }
]"/>
