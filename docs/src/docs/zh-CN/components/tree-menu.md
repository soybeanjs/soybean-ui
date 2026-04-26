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

<ComponentApi component="tree-menu" />
