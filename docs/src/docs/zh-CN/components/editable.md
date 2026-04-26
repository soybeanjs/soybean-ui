# 可编辑文本

## 概述

用于在预览态与编辑态之间切换的内联文本编辑组件。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SEditable } from '@soybeanjs/ui';

const value = ref('Click to edit');
</script>

<template>
  <SEditable v-model="value" placeholder="Enter text" />
</template>
```

## 演示

```playground
basic
size
disabled
activation-mode
custom-styling
```

## API

<ComponentApi component="editable" />
