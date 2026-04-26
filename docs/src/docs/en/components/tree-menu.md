# TreeMenu

## Overview

A hierarchical menu component commonly used for sidebar navigation. It supports nested items, grouping, icons, badges, and collapse state.

## Usage

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

## Demos

```playground
base
```

## API

<ComponentApi component="tree-menu" />
