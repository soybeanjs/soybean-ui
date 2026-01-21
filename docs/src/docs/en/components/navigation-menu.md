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

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'NavigationMenuOptionData[]', default: '-', description: 'Menu data.', required: true },
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: 'Menu orientation.' },
  { name: 'modelValue', type: 'string', default: '-', description: 'Selected value.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Menu size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggers when selection changes.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'NavigationMenuOptionData',
    description: 'Data structure for menu items.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string', description: 'Unique identifier.' },
      { name: 'link', type: 'string', description: 'Navigation URL.' },
      { name: 'children', type: 'NavigationMenuOptionData[]', description: 'Submenu items.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
