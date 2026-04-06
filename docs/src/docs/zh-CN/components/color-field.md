# 颜色输入框

## 概述

用于编辑完整颜色字符串或单个颜色通道，支持 `hex`、`rgb`、`hsl` 和 `oklch` 输出格式。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorField } from '@soybeanjs/ui';

const color = ref('#0ea5e9');
</script>

<template>
  <SColorField v-model="color" format="oklch" />
</template>
```

## 演示

```playground
basic
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string | ColorValue', default: '-', description: '受控颜色值' },
  { name: 'defaultValue', type: 'string | ColorValue', default: '`#000000`', description: '非受控初始值' },
  { name: 'channel', type: 'ColorChannel', default: '-', description: '指定后仅编辑单个颜色通道' },
  { name: 'colorSpace', type: '`hsl` | `hsv` | `oklch`', default: '`hsl`', description: '通道读取和写回所使用的色彩空间' },
  { name: 'format', type: '`hex` | `rgb` | `hsl` | `oklch`', default: '`hex`', description: '颜色字符串输出格式' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '输入框尺寸' },
  { name: 'ui', type: 'Partial<ColorFieldUi>', default: '{}', description: '内部 slot 样式覆盖' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '字符串值变更时触发' },
  { name: 'update:color', parameters: '(value: NormalizedColor) => void', description: '颜色对象变更时触发' },
]"/>
