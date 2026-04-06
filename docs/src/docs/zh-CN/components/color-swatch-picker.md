# 色块选择器

## 概述

通过预设色板快速选择颜色，适合主题面板和颜色推荐场景。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorSwatchPicker } from '@soybeanjs/ui';

const value = ref('#7c3aed');
const colors = ['#7c3aed', '#06b6d4', '#10b981'];
</script>

<template>
  <SColorSwatchPicker v-model="value" :colors="colors" />
</template>
```

## 演示

```playground
basic
```
