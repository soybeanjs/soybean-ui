# Watermark

## Overview

Watermark overlays a repeating text or image pattern on top of page content to indicate ownership, confidentiality, or branding.

> Note: In addition to SWatermark, the headless layer also exports WatermarkCompact for the default root/overlay structure, plus WatermarkRoot, WatermarkOverlay, and provideWatermarkUi for fully custom composition and style injection.

## Usage

<UsageCode component="watermark" />

## Demos

<PlaygroundGallery component="watermark" />

## API

<ComponentApi component="watermark" />

## Headless Composition

When the default root/overlay structure is enough, import `WatermarkCompact` from `@soybeanjs/headless/watermark`. If you need separate control over the root and overlay elements, compose the headless primitives directly:

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { WatermarkOverlay, WatermarkRoot, provideWatermarkUi } from '@soybeanjs/headless';

const ui = computed(() => ({
  root: 'relative',
  overlay: 'absolute inset-0 pointer-events-none bg-repeat'
}));

provideWatermarkUi(ui);
</script>

<template>
  <WatermarkRoot content="CONFIDENTIAL" :rotate="-22">
    <slot />
    <WatermarkOverlay />
  </WatermarkRoot>
</template>
```
