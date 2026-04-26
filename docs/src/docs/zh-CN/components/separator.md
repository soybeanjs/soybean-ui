# 分隔线

## 概述

用于在内容之间进行视觉分隔的分隔线组件。

## 用法

```vue
<script setup lang="ts">
import { SSeparator } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <div class="space-y-1">
      <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
      <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
    </div>
    <SSeparator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <SSeparator orientation="vertical" />
      <div>Docs</div>
      <SSeparator orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
</template>
```

## 演示

```playground
orientation
align
border
```

## API

<ComponentApi component="separator" />
