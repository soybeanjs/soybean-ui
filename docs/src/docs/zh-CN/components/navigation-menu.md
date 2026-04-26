# 导航菜单

## 概述

用于构建站点级导航菜单的组件。

## 用法

```vue
<script setup lang="ts">
import { SNavigationMenu } from '@soybeanjs/ui';

const items = [
  { label: 'Home', value: 'home', link: '/' },
  {
    label: 'Products',
    value: 'products',
    children: [
      { label: 'New Arrivals', value: 'new', link: '/new' },
      { label: 'Best Sellers', value: 'best', link: '/best' }
    ]
  }
];
</script>

<template>
  <SNavigationMenu :items="items" />
</template>
```

## 演示

```playground
horizontal
vertical
```

## API

<ComponentApi component="navigation-menu" />
