# 提示

## 概述

用于向用户展示重要信息或状态提示的组件。

## 用法

```vue
<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <SAlert title="Info" description="This is an info alert" />
  <SAlert title="Error" description="Something went wrong" color="destructive" variant="soft" />
</template>
```

## 演示

```playground
color
variant
description
icon
desc-icon
closable
slot
size
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'title', type: 'string', default: '-', description: 'Alert title.' },
  { name: 'description', type: 'string', default: '-', description: 'Alert description.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Alert size.' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: '主题颜色。' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, default: `'soft'`, description: '视觉样式变体。' },
  { name: 'icon', type: 'string | Component', default: '-', description: 'Custom icon.' },
  { name: 'closable', type: 'boolean', default: 'false', description: '是否显示关闭按钮。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Main content.' },
  { name: 'icon', parameters: '-', description: 'Custom icon slot.' },
  { name: 'title', parameters: '-', description: 'Custom title slot.' },
  { name: 'description', parameters: '-', description: 'Custom description slot.' },
  { name: 'close', parameters: '-', description: 'Custom close button slot.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'icon', type: 'string', description: 'Icon container class.' },
      { name: 'content', type: 'string', description: 'Content wrapper class.' },
      { name: 'title', type: 'string', description: 'Title text class.' },
      { name: 'description', type: 'string', description: 'Description text class.' },
      { name: 'close', type: 'string', description: 'Close button class.' },
    ]
  }
]"/>
