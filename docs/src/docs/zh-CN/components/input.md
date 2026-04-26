# 输入框

## 概述

用于输入文本的基础输入框组件。

## 用法

```vue
<script setup lang="ts">
import { SInput } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <SInput v-model="value" placeholder="Type something..." />
</template>
```

## 演示

```playground
base
disabled
slot
clearable
```

## API

<ComponentApi component="input" />
