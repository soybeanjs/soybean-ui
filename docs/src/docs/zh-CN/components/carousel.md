# Carousel

## 概述

Carousel 基于 Embla Carousel 构建，用于在有限空间内按水平或垂直方向浏览一组内容。

## 用法

```vue
<script setup lang="ts">
import { SCarousel, SCarouselContent, SCarouselItem, SCarouselNext, SCarouselPrevious } from '@soybeanjs/ui';
</script>

<template>
  <SCarousel aria-label="示例轮播" class="max-w-xs">
    <SCarouselContent>
      <SCarouselItem>Slide 1</SCarouselItem>
      <SCarouselItem>Slide 2</SCarouselItem>
      <SCarouselItem>Slide 3</SCarouselItem>
    </SCarouselContent>
    <SCarouselPrevious />
    <SCarouselNext />
  </SCarousel>
</template>
```

## 演示

```playground
basic
vertical
rtl
custom-styling
```

## API

<ComponentApi component="carousel" />
