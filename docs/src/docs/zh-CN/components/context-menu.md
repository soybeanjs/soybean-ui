# 右键菜单

## 概述

在指针位置显示的菜单，通过右键触发。

## 用法

```vue
<script setup lang="ts">
import { SContextMenu } from '@soybeanjs/ui';

const items = [
  { label: 'Back', value: 'back', icon: 'lucide:arrow-left', shortcut: '⌘[' },
  { label: 'Forward', value: 'forward', icon: 'lucide:arrow-right', shortcut: '⌘]' },
  { label: 'Reload', value: 'reload', icon: 'lucide:refresh-cw', shortcut: '⌘R' },
  { separator: true },
  { label: 'Save As...', value: 'save', icon: 'lucide:save', shortcut: '⇧⌘S' }
];
</script>

<template>
  <SContextMenu :items="items">
    <div class="flex items-center justify-center border border-dashed h-[150px] rounded-md">Right click here</div>
  </SContextMenu>
</template>
```

## 演示

```playground
base
checkbox
radio
mix
```

## API

### SContextMenu Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuOptionData[]', default: '-', description: '菜单数据。', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: '右键菜单是否禁用。' },
  { name: 'modal', type: 'boolean', default: 'true', description: '右键菜单的模态模式。' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: '文本方向。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SContextMenu Emits

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '(item: MenuOptionData, event: Event) => void', description: '选择菜单项时触发。' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### SContextMenuCheckbox Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuCheckboxOptionData[]', default: '-', description: '复选项数据。', required: true },
  { name: 'modelValue', type: 'any[]', default: '-', description: '选中的值列表。' }
]"/>

### SContextMenuRadio Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuRadioOptionData[]', default: '-', description: '单选项数据。', required: true },
  { name: 'modelValue', type: 'string', default: '-', description: '选中的值。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类 (inherits from Menu Ui).',
    fields: [
      { name: 'content', type: 'string', description: 'Menu content container class.' },
      { name: 'item', type: 'string', description: 'Menu item class.' },
      { name: 'separator', type: 'string', description: 'Separator class.' },
    ]
  }
]"/>
