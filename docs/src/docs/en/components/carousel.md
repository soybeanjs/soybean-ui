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

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root element' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'Carousel orientation' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: 'inherits global config', description: 'Reading direction' },
  { name: 'opts', type: 'CarouselOptions', default: '-', description: 'Embla Carousel options' },
  { name: 'plugins', type: 'CarouselPlugins', default: '-', description: 'Embla Carousel plugins' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for internal elements' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'initApi', parameters: '(api: CarouselApi) => void', description: 'Triggered when the Embla API is ready' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Default content, typically CarouselContent, CarouselItem, and navigation controls', required: true },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class mapping',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class' },
      { name: 'content', type: 'string', description: 'Viewport container class' },
      { name: 'container', type: 'string', description: 'Track container class' },
      { name: 'item', type: 'string', description: 'Slide item class' },
      { name: 'previous', type: 'string', description: 'Previous button class' },
      { name: 'next', type: 'string', description: 'Next button class' },
    ],
  }
]"/>
