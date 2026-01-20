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

### 属性

<DataTable preset="props" :data="[
  { name: 'ratio', type: 'number', default: '1', description: 'The desired aspect ratio (width / height).' },
  { name: 'as', type: 'string | Component', default: `'div'`, description: '渲染的元素。' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性合并到子元素。' }
]"/>
