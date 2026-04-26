# 宽高比

## 概述

用于保持内容固定宽高比的容器组件。

## 用法

```vue
<script setup lang="ts">
import { SAspectRatio } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-[300px]">
    <SAspectRatio :ratio="16 / 9">
      <img src="..." alt="Image" class="object-cover w-full h-full rounded-md" />
    </SAspectRatio>
  </div>
</template>
```

## 演示

```playground
base
```

## API

<ComponentApi component="aspect-ratio" />
