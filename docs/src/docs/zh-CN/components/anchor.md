# 锚点

## 概述

Anchor 用于长内容区域的页内导航，并会在滚动时自动高亮当前所在的章节。

滚动激活项变化时，地址栏中的 hash 也会同步更新；滚动同步使用 `history.replaceState`，避免产生过多历史记录。

如果页面初始化时地址栏已经带有 hash，Anchor 会在挂载后自动滚动到对应章节；当自定义滚动容器稍后才就绪时，也会在容器可用后重新同步一次。

> `SAnchor` 现在会把递归的锚点项渲染委托给 headless `AnchorCompact`。`SAnchor` 与 `@soybeanjs/headless/anchor` 共享同一组 6 个 `ui` 槽位。

## 用法

```vue
<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAnchor } from '@soybeanjs/ui';

const containerRef = shallowRef<HTMLElement>();

const items = [
  { href: '#overview', title: '概述' },
  { href: '#api', title: 'API' }
];

const getContainer = () => containerRef.value ?? window;
</script>

<template>
  <div class="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
    <SAnchor :items="items" :get-container="getContainer" />
    <div ref="containerRef" class="max-h-80 overflow-auto">
      <section id="overview" class="min-h-60">...</section>
      <section id="api" class="min-h-60">...</section>
    </div>
  </div>
</template>
```

## 演示

```playground
basic
color
size
sticky
custom-styling
```

## API

<ComponentApi component="anchor" />
