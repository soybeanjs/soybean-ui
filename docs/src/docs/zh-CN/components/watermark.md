# Watermark 水印

## 概述

水印在页面内容上方叠加重复的文字或图片图案，用于标识所有权、机密性或品牌。

> 提示：除了 SWatermark 外，headless 层还导出了 WatermarkCompact 作为默认的 root/overlay 结构，以及 WatermarkRoot、WatermarkOverlay 和 provideWatermarkUi 用于完全自定义组合和样式注入。

## 用法

<UsageCode component="watermark" />

## 示例

<PlaygroundGallery component="watermark" />

## API

<ComponentApi component="watermark" />

## Headless 组合

如果默认的 root/overlay 结构足够使用，可以从 `@soybeanjs/headless/watermark` 导入 `WatermarkCompact`。如果需要独立控制 root 和 overlay 元素，可以直接组合 headless 原语：

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
  <WatermarkRoot content="机密" :rotate="-22">
    <slot />
    <WatermarkOverlay />
  </WatermarkRoot>
</template>
```
