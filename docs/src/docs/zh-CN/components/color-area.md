# 颜色区域

## 概述

二维颜色编辑区域，可在饱和度/明度、饱和度/亮度或 OKLCH 的色度/明度之间拖拽选择。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorArea } from '@soybeanjs/ui';

const color = ref('#7c3aed');
</script>

<template>
  <SColorArea v-model="color" />
</template>
```

## 演示

```playground
basic
oklch
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string | ColorValue', default: '-', description: '受控颜色值' },
  { name: 'defaultValue', type: 'string | ColorValue', default: '`#ff0000`', description: '非受控初始值' },
  { name: 'colorSpace', type: '`hsl` | `hsv` | `oklch`', default: '`hsl`', description: '区域内部编辑所使用的色彩空间' },
  { name: 'format', type: '`hex` | `rgb` | `hsl` | `oklch`', default: '`hex`', description: '对外输出的颜色格式' },
  { name: 'xChannel', type: '`hue` | `saturation` | `lightness` | `brightness` | `chroma`', default: '`saturation`', description: '横轴通道' },
  { name: 'yChannel', type: '`hue` | `saturation` | `lightness` | `brightness` | `chroma`', default: '`lightness`', description: '纵轴通道' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '区域尺寸' },
  { name: 'ui', type: 'Partial<ColorAreaUi>', default: '{}', description: '内部 slot 样式覆盖' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '颜色字符串变更时触发' },
  { name: 'update:color', parameters: '(value: NormalizedColor) => void', description: '颜色对象变更时触发' },
  { name: 'change', parameters: '(value: string) => void', description: '拖拽过程中持续触发' },
  { name: 'changeEnd', parameters: '(value: string) => void', description: '拖拽结束时触发' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '自定义 thumb 内容', required: false },
]"/>
