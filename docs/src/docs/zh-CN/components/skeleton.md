# 骨架屏

## 概述

用于在内容加载期间展示占位结构的骨架屏组件。

## 用法

```vue
<script setup lang="ts">
import { SSkeleton } from '@soybeanjs/ui';
</script>

<template>
  <SSkeleton class="h-4 w-56" />
</template>
```

## 演示

```playground
basic
size
shape
animated
custom-size
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '自定义类名，可用于覆盖宽高、圆角等样式。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '预设尺寸。' },
  { name: 'animated', type: 'boolean', default: 'true', description: '是否启用脉冲动画。' },
  { name: 'shape', type: 'SkeletonShape', default: '`auto`', description: '预设圆角形状。' },
  { name: 'as', type: 'string | Component', default: '`div`', description: '渲染的元素或组件。' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性合并到子元素。' },
]"/>

### 事件

<DataTable preset="emits" :data="[]"/>

### 插槽

<DataTable preset="slots" :data="[]"/>

### 类型

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="SkeletonShape" description="骨架屏形状类型" type="'auto' | 'rounded' | 'square'" />
