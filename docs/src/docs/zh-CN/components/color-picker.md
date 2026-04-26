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

<ComponentApi component="color-picker" />
