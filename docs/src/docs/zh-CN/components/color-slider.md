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

<ComponentApi component="color-slider" />
