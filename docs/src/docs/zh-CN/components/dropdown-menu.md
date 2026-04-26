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

<ComponentApi component="dropdown-menu" />
