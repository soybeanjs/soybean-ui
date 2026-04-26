# 悬停卡片

## 概述

当鼠标悬停或元素获得焦点时，显示可承载更丰富内容的预览卡片。

## 用法

```vue
<script setup lang="ts">
import { SButton, SHoverCard } from '@soybeanjs/ui';
</script>

<template>
  <SHoverCard>
    <template #trigger>
      <SButton variant="outline">Hover me</SButton>
    </template>
    <div class="space-y-1.5">
      <p class="font-medium">Hover card</p>
      <p class="text-sm text-muted-foreground">Use it to show richer preview content.</p>
    </div>
  </SHoverCard>
</template>
```

## 演示

```playground
basic
delay
custom-styling
```

## API

<ComponentApi component="hover-card" />
