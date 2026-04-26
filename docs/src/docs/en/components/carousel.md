# Carousel

## Overview

Carousel is built on top of Embla Carousel and lets users browse a sequence of content horizontally or vertically.

## Usage

```vue
<script setup lang="ts">
import { SCarousel, SCarouselContent, SCarouselItem, SCarouselNext, SCarouselPrevious } from '@soybeanjs/ui';
</script>

<template>
  <SCarousel aria-label="Example carousel" class="max-w-xs">
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

## Demos

```playground
basic
vertical
rtl
custom-styling
```

## API

<ComponentApi component="carousel" />
