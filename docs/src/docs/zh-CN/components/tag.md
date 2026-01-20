# 标签

## 概述

用于标记、分类或展示状态的标签组件。

## 用法

```vue
<script setup lang="ts">
import { STag } from '@soybeanjs/ui';
</script>

<template>
  <STag>默认</STag>
  <STag color="primary" variant="soft">Primary</STag>
</template>
```

## 演示

```playground
color
variant
shape
size
closable
slot
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: '标签颜色。' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, default: `'soft'`, description: '标签变体。' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: '标签尺寸。' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: '标签形状。' },
  { name: 'closable', type: 'boolean', default: 'false', description: '是否显示关闭按钮。' },
  { name: 'content', type: 'string', default: '-', description: '标签内容（作为默认插槽的 prop 替代）。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'close', parameters: '(event: MouseEvent) => void', description: '点击关闭按钮时触发。' },
  { name: 'click', parameters: '(event: MouseEvent) => void', description: '点击标签时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '标签内容。' },
  { name: 'close', parameters: '-', description: '自定义关闭图标。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'close', type: 'string', description: 'Close button class.' },
    ]
  }
]"/>
