# Watermark

Source URL: https://ui.soybeanjs.cn/components/watermark
Markdown URL: https://ui.soybeanjs.cn/components/watermark.md
Category: Data Display
Description: Watermark overlays a repeating text or image pattern on top of page content to indicate ownership, confidentiality, or branding.

## Overview

Watermark overlays a repeating text or image pattern on top of page content to indicate ownership, confidentiality, or branding.

> Note: In addition to SWatermark, the headless layer also exports WatermarkCompact for the default root/overlay structure, plus WatermarkRoot, WatermarkOverlay, and provideWatermarkUi for fully custom composition and style injection.

## Usage

Usage examples for watermark are rendered on the site.

## Demos

Interactive demos for watermark are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (4): Watermark, WatermarkCompact, WatermarkOverlay, WatermarkRoot.

### Watermark

#### Props

Properties for the SWatermark component.

- `class`: The class attribute for the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: UI class overrides for each slot. (type `Partial<WatermarkUi>`; optional)
- `fullscreen`: When true, the watermark overlay is fixed to the viewport instead of the parent container. (type `boolean`; default `false`; optional)
- `overlayProps`: Properties forwarded to the overlay element. (type `WatermarkOverlayProps`; optional)
- `content`: The text content of the watermark. (type `string`; optional)
- `image`: The image URL of the watermark. When both content and image are provided, image takes priority. (type `string`; optional)
- `fontSize`: The font size of the watermark text in pixels. (type `number`; default `16`; optional)
- `fontFamily`: The font family of the watermark text. (type `string`; default `'sans-serif'`; optional)
- `fontColor`: The font color of the watermark text. (type `string`; default `'rgba(0, 0, 0, 0.15)'`; optional)
- `fontWeight`: The font weight of the watermark text. (type `string | number`; default `'normal'`; optional)
- `rotate`: The rotation angle of the watermark in degrees. (type `number`; default `-22`; optional)
- `gap`: The gap between watermark tiles in pixels, as [x, y]. (type `[number, number]`; default `[100, 100]`; optional)
- `offset`: The offset of the watermark within each tile in pixels, as [x, y]. (type `[number, number]`; default `[0, 0]`; optional)
- `width`: The width of a single watermark tile in pixels. When not provided, it is calculated automatically based on text dimensions and gap. (type `number`; optional)
- `height`: The height of a single watermark tile in pixels. When not provided, it is calculated automatically based on text dimensions and gap. (type `number`; optional)
- `cross`: When true, renders a diagonal cross pattern with two overlapping watermarks. (type `boolean`; default `false`; optional)
- `defense`: When true, observes and restores the watermark overlay if it is tampered with or removed. (type `boolean`; default `false`; optional)

### WatermarkCompact

#### Props

Properties for the WatermarkCompact component.

- `overlayProps`: Properties forwarded to the overlay element. (type `WatermarkOverlayProps`; optional)
- `content`: The text content of the watermark. (type `string`; optional)
- `image`: The image URL of the watermark. When both content and image are provided, image takes priority. (type `string`; optional)
- `fontSize`: The font size of the watermark text in pixels. (type `number`; default `16`; optional)
- `fontFamily`: The font family of the watermark text. (type `string`; default `'sans-serif'`; optional)
- `fontColor`: The font color of the watermark text. (type `string`; default `'rgba(0, 0, 0, 0.15)'`; optional)
- `fontWeight`: The font weight of the watermark text. (type `string | number`; default `'normal'`; optional)
- `rotate`: The rotation angle of the watermark in degrees. (type `number`; default `-22`; optional)
- `gap`: The gap between watermark tiles in pixels, as [x, y]. (type `[number, number]`; default `[100, 100]`; optional)
- `offset`: The offset of the watermark within each tile in pixels, as [x, y]. (type `[number, number]`; default `[0, 0]`; optional)
- `width`: The width of a single watermark tile in pixels. When not provided, it is calculated automatically based on text dimensions and gap. (type `number`; optional)
- `height`: The height of a single watermark tile in pixels. When not provided, it is calculated automatically based on text dimensions and gap. (type `number`; optional)
- `cross`: When true, renders a diagonal cross pattern with two overlapping watermarks. (type `boolean`; default `false`; optional)
- `defense`: When true, observes and restores the watermark overlay if it is tampered with or removed. (type `boolean`; default `false`; optional)

### WatermarkOverlay

- No documented props, emits, slots, or slot props were available.

### WatermarkRoot

#### Props

Properties for the WatermarkRoot component.

- `content`: The text content of the watermark. (type `string`; optional)
- `image`: The image URL of the watermark. When both content and image are provided, image takes priority. (type `string`; optional)
- `fontSize`: The font size of the watermark text in pixels. (type `number`; default `16`; optional)
- `fontFamily`: The font family of the watermark text. (type `string`; default `'sans-serif'`; optional)
- `fontColor`: The font color of the watermark text. (type `string`; default `'rgba(0, 0, 0, 0.15)'`; optional)
- `fontWeight`: The font weight of the watermark text. (type `string | number`; default `'normal'`; optional)
- `rotate`: The rotation angle of the watermark in degrees. (type `number`; default `-22`; optional)
- `gap`: The gap between watermark tiles in pixels, as [x, y]. (type `[number, number]`; default `[100, 100]`; optional)
- `offset`: The offset of the watermark within each tile in pixels, as [x, y]. (type `[number, number]`; default `[0, 0]`; optional)
- `width`: The width of a single watermark tile in pixels. When not provided, it is calculated automatically based on text dimensions and gap. (type `number`; optional)
- `height`: The height of a single watermark tile in pixels. When not provided, it is calculated automatically based on text dimensions and gap. (type `number`; optional)
- `cross`: When true, renders a diagonal cross pattern with two overlapping watermarks. (type `boolean`; default `false`; optional)
- `defense`: When true, observes and restores the watermark overlay if it is tampered with or removed. (type `boolean`; default `false`; optional)

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
