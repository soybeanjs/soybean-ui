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

<ComponentApi component="context-menu" />
