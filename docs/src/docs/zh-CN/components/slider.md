# 滑块

## 概述

用于在连续范围内选择一个或多个数值的滑块组件，支持水平和垂直方向。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SSlider } from '@soybeanjs/ui';

const value = ref([40]);
</script>

<template>
  <SSlider v-model="value" :thumb-props="{ 'aria-label': 'Volume' }" />
</template>
```

## 演示

```playground
basic
range
size
color
disabled
orientation
```

## API

<ComponentApi component="slider" />
