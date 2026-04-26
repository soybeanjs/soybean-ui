# 数字输入框

## 概述

用于输入数值的输入框组件，支持步进与边界控制。

## 用法

```vue
<script setup lang="ts">
import { SInputNumber } from '@soybeanjs/ui';

const value = ref(0);
</script>

<template>
  <SInputNumber v-model="value" :min="0" :max="100" />
</template>
```

## 演示

```playground
base
center
slot
clearable
```

## API

<ComponentApi component="input-number" />
