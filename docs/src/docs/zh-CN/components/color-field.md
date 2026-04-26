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

<ComponentApi component="color-field" />
