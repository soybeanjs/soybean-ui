# 颜色滑块

## 概述

单通道颜色滑块，适合编辑色相、透明度以及 RGB/HSL/HSV/OKLCH 的独立通道。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorSlider } from '@soybeanjs/ui';

const color = ref('#ec4899');
</script>

<template>
  <SColorSlider v-model="color" channel="hue" color-space="hsl" />
</template>
```

## 演示

```playground
basic
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'channel', type: 'ColorChannel', default: '-', description: '当前滑块操作的颜色通道' },
  { name: 'colorSpace', type: '`hsl` | `hsv` | `oklch`', default: '`hsl`', description: '通道计算的色彩空间' },
  { name: 'format', type: '`hex` | `rgb` | `hsl` | `oklch`', default: '`hex`', description: '输出格式' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '滑块尺寸' },
  { name: 'ui', type: 'Partial<ColorSliderUi>', default: '{}', description: '内部 slot 样式覆盖' },
]"/>
