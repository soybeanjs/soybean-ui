# ScrollArea

## 概述

一个带自定义滚动条的滚动容器，在保留原生滚动体验的同时支持垂直和水平方向的样式化滚动条。

## 用法

```vue
<script setup lang="ts">
import { SScrollArea } from '@soybeanjs/ui';
</script>

<template>
  <SScrollArea class="h-64 rounded-md border">
    <div class="p-4">可滚动内容</div>
  </SScrollArea>
</template>
```

## 演示

```playground
basic
horizontal
type
custom-styling
```

## API

<ComponentApi component="scroll-area" />
