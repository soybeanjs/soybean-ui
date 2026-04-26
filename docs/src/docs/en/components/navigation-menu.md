# NavigationMenu

## Overview

A collection of links for navigating websites. Supports submenus and responsive behavior.

## Usage

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

## Demos

```playground
horizontal
vertical
```

## API

<ComponentApi component="navigation-menu" />
