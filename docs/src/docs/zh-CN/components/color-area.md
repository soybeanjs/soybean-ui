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

<ComponentApi component="color-area" />
