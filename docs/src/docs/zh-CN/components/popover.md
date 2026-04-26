# 弹出层

## 概述

用于展示与触发元素相关联内容的弹出层组件。

## 用法

```vue
<script setup lang="ts">
import { SPopover, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SPopover>
    <template #trigger>
      <SButton variant="outline">Open Popover</SButton>
    </template>
    <div class="p-4">
      <h3 class="font-medium">Popover Title</h3>
      <p class="text-sm text-muted-foreground">This is the popover content.</p>
    </div>
  </SPopover>
</template>
```

## 演示

```playground
base
```

## API

<ComponentApi component="popover" />
