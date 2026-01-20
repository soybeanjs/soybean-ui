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

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'NavigationMenuOptionData[]', default: '-', description: '菜单数据。', required: true },
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: '菜单方向。' },
  { name: 'modelValue', type: 'string', default: '-', description: '选中的值。' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: '菜单尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '选择变化时触发。' }
]"/>

### 类型

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
