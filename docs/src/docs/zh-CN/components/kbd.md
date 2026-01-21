# 键盘按键

## 概述

用于表示键盘输入元素，常用于展示快捷键。

## 用法

```vue
<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';
</script>

<template>
  <SKbd>⌘</SKbd>
  +
  <SKbd>K</SKbd>
  <SKbd value="Ctrl" />
</template>
```

## 演示

```playground
base
size
variant
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'value', type: 'string', default: '-', description: '要显示的文本值。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '按键尺寸。' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'plain'`, default: `'solid'`, description: '视觉样式变体。' },
  { name: 'as', type: 'string | Component', default: `'kbd'`, description: '渲染的元素。' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性合并到子元素。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '按键内容。' }
]"/>

### 类型

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
