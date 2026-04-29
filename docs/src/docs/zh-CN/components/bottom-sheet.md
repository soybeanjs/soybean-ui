# 底部弹层

## 概述

从屏幕底部滑入的模态面板组件，适合承载移动端优先的轻量操作、补充信息和分步确认。它复用了 `SDialog` 的声明式 API，并额外提供拖拽关闭、背景缩放和 `snapPoints` 等底部交互能力。

## 用法

```vue
<script setup lang="ts">
import { SBottomSheet, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SBottomSheet v-model:open="open" title="Bottom Sheet Title" description="Bottom Sheet Description">
    <template #trigger>
      <SButton variant="outline">Open Bottom Sheet</SButton>
    </template>

    <div class="py-4">
      <p>Bottom Sheet Content</p>
    </div>
  </SBottomSheet>
</template>
```

## 演示

```playground
base
nested
```

## API

<ComponentApi component="bottom-sheet" />
