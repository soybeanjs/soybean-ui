# 文本域

## 概述

用于输入多行文本的文本域组件。

## 用法

```vue
<script setup lang="ts">
import { STextarea } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <STextarea v-model="value" placeholder="Type your message here." />
</template>
```

## 演示

```playground
base
autosize
clearable
disabled
counter
footer
```

## API

<ComponentApi component="textarea" />
