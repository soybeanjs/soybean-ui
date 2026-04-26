# 抽屉

## 概述

从屏幕边缘滑出的抽屉面板组件，用于承载附加内容或操作。它复用了 `SDialog` 的声明式 API 和插槽约定，并通过 `side` 控制进入方向。

## 用法

```vue
<script setup lang="ts">
import { SDrawer, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDrawer v-model:open="open" title="Menu" side="left">
    <template #trigger>
      <SButton variant="outline">Open Drawer</SButton>
    </template>
    <div class="py-4">
      <p>Navigation links...</p>
    </div>
  </SDrawer>
</template>
```

## 演示

```playground
side
scroll
```

## API

<ComponentApi component="drawer" />
