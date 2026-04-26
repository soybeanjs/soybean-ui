# 卡片

## 概述

用于承载内容的卡片容器组件，可组合标题、描述与操作区等结构。

## 用法

```vue
<script setup lang="ts">
import { SCard, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Notifications" description="You have 3 unread messages.">
    <div class="py-4">
      <p>Your subscription expires soon.</p>
    </div>
    <template #footer>
      <SButton class="w-full">Mark all as read</SButton>
    </template>
  </SCard>
</template>
```

## 演示

```playground
base
only-content
split
title-slot
collapsible
```

## API

<ComponentApi component="card" />
