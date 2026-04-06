# 颜色选择器

## 概述

组合式颜色选择器，内置颜色区域、色相/透明度滑块、格式化输入框和预设色板，并支持 `oklch` 输出与编辑。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorPicker } from '@soybeanjs/ui';

const color = ref('oklch(62% 0.22 312)');
</script>

<template>
  <SColorPicker v-model="color" color-space="oklch" format="oklch" />
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
  { name: 'defaultValue', type: 'string | ColorValue', default: '`#7f007f`', description: '非受控初始值' },
  { name: 'colorSpace', type: '`hsl` | `hsv` | `oklch`', default: '`hsl`', description: '选择器内部编辑所使用的色彩空间' },
  { name: 'format', type: '`hex` | `rgb` | `hsl` | `oklch`', default: '`hex`', description: '外部 v-model 与主输入框的输出格式' },
  { name: 'swatches', type: 'string[]', default: `['#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#3b82f6','#8b5cf6']`, description: '预设色板' },
  { name: 'showAlpha', type: 'boolean', default: 'true', description: '是否显示透明度滑块' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '整体尺寸' },
  { name: 'ui', type: 'Partial<ColorPickerUi>', default: '{}', description: '布局 slot 样式覆盖' },
]"/>
