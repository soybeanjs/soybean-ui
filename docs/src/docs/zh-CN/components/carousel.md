# Carousel

## 概述

Carousel 基于 Embla Carousel 构建，用于在有限空间内按水平或垂直方向浏览一组内容。

## 用法

```vue
<script setup lang="ts">
import { SCard, SCarousel } from '@soybeanjs/ui';

const slides = [1, 2, 3, 4, 5];
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SCarousel :slides="slides" aria-label="Basic carousel" class="mx-auto w-full max-w-60" :options="{ loop: true }">
      <template #item="{ slide }">
        <SCard :ui="{ content: 'aspect-square flex items-center justify-center' }">
          <span class="text-4xl font-semibold">{{ slide }}</span>
        </SCard>
      </template>
    </SCarousel>
  </div>
</template>
```

## 演示

```playground
basic
vertical
float
multi
snap
progress
dot
```

## API

<ComponentApi component="carousel" />
