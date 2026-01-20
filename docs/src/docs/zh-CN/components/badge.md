# 徽章

## 概述

一个小巧的交互组件，用于对内容进行分类或标记。

## 用法

```vue
<script setup lang="ts">
import { SBadge } from '@soybeanjs/ui';
</script>

<template>
  <SBadge>默认</SBadge>
  <SBadge color="primary" variant="soft">Primary</SBadge>
</template>
```

## 演示

```playground
color
content
position
slot
open
```

## Badge API

### 属性

<DataTable preset="props" :data="[
  { name: 'content', type: 'string', default: '-', description: '徽章内容' },
  { name: 'open', type: 'boolean', default: undefined, description: '徽章是否打开' },
  { name: 'class', type: 'string', default: '-', description: '根容器类名 name'},
  { name: 'position', type: `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`, default: 'top-right', description: '徽章位置' },
  { name: 'contentProps', type: 'HTMLAttributes', default: '{}', description: '徽章内容 properties' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: 'md', description: '徽章尺寸' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为对应容器添加类名' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '自定义默认内容', required: true },
  { name: 'content', parameters: '-', description: '徽章内容' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '徽章的自定义类名',
    fields: [
      { name: 'root', type: 'string', description: '为根容器添加类名' },
      { name: 'content', type: 'string', description: 'Add class name to the 徽章内容 container' },
    ],
  }
]"/>
