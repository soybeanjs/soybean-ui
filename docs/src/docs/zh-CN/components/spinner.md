# Spinner

## 概述

`SSpinner` 是基于 `SIcon` 封装的轻量级加载指示器，默认使用 Iconify 的 `svg-spinners` 图标集合，适合内联加载场景。

## 用法

```vue
<script setup lang="ts">
import { SSpinner } from '@soybeanjs/ui';
</script>

<template>
  <SSpinner />
</template>
```

## 演示

```playground
basic
color
size
icon
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '自定义类名' },
  {
    name: 'icon',
    type: '`svg-spinners:${string}`',
    default: '`svg-spinners:270-ring`',
    description: 'Iconify `svg-spinners` 集合中的加载图标名称'
  },
  { name: 'color', type: 'ThemeColor', default: '-', description: '主题颜色' },
  { name: 'size', type: 'ThemeSize', default: '-', description: '主题尺寸' },
  { name: 'width', type: 'string | number', default: '`1.25em`', description: '加载图标宽度' },
  { name: 'height', type: 'string | number', default: '`1.25em`', description: '加载图标高度' },
  { name: 'rotate', type: 'number | string', default: '-', description: '额外旋转角度' },
  { name: 'flip', type: 'string', default: '-', description: '水平或垂直翻转图标' }
]"/>

> `width` 和 `height` 会覆盖 `size` 对应的尺寸表现，其余属性继承自 `SIcon`。

### 插槽

<DataTable preset="slots" :data="[]"/>

## 类型

<UnionType name="SpinnerIcon" type="`svg-spinners:${string}`" />
