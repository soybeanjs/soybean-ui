# ScrollArea

## 概述

一个带自定义滚动条的滚动容器，在保留原生滚动体验的同时支持垂直和水平方向的样式化滚动条。

## 用法

```vue
<script setup lang="ts">
import { SScrollArea } from '@soybeanjs/ui';
</script>

<template>
  <SScrollArea class="h-64 rounded-md border">
    <div class="p-4">可滚动内容</div>
  </SScrollArea>
</template>
```

## 演示

```playground
basic
horizontal
type
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素类名。' },
  { name: 'type', type: `'auto' | 'always' | 'hover' | 'scroll' | 'glimpse'`, default: `'hover'`, description: '控制自定义滚动条的显示时机。' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: `'ltr'`, description: '滚动区域的阅读方向。' },
  { name: 'scrollHideDelay', type: 'number', default: '600', description: '瞬时滚动条隐藏前的延迟时间（毫秒）。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '内部插槽的自定义类名。' },
  { name: 'viewportProps', type: 'ScrollAreaViewportProps', default: '{}', description: '传递给 viewport 元素的属性。' },
  { name: 'verticalScrollbarProps', type: 'Omit<ScrollAreaScrollbarProps, `orientation`>', default: '{}', description: '传递给垂直滚动条的属性。' },
  { name: 'horizontalScrollbarProps', type: 'Omit<ScrollAreaScrollbarProps, `orientation`>', default: '{}', description: '传递给水平滚动条的属性。' },
  { name: 'thumbProps', type: 'ScrollAreaThumbProps', default: '{}', description: '传递给两个滚动条 thumb 的属性。' },
  { name: 'cornerProps', type: 'ScrollAreaCornerProps', default: '{}', description: '传递给滚动条交叉角元素的属性。' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '可滚动内容。', required: true },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'ScrollArea 的自定义类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'viewport', type: 'string', description: 'Viewport 类名。' },
      { name: 'scrollbar', type: 'string', description: '滚动条轨道类名。' },
      { name: 'thumb', type: 'string', description: '滚动条滑块类名。' },
      { name: 'corner', type: 'string', description: '滚动条交叉角类名。' },
    ],
  },
  {
    name: 'ScrollAreaType',
    description: '滚动条可见模式。',
    fields: [
      { name: 'auto', type: 'string', description: '当内容溢出时显示滚动条。' },
      { name: 'always', type: 'string', description: '在存在溢出时持续显示滚动条。' },
      { name: 'hover', type: 'string', description: '鼠标移入滚动区域时显示滚动条。' },
      { name: 'scroll', type: 'string', description: '用户滚动时显示滚动条。' },
      { name: 'glimpse', type: 'string', description: '在悬停和滚动时短暂显示滚动条。' },
    ],
  }
]"/>
