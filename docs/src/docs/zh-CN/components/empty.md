# Empty

## 概述

用于展示空状态信息的轻量级组件，可组合提示文案、操作按钮与引导信息。

## 用法

```vue
<script setup lang="ts">
import { SButton, SEmpty } from '@soybeanjs/ui';
</script>

<template>
  <SEmpty
    class="min-h-72"
    title="暂无项目"
    description="创建第一个项目以开始组织工作。"
    icon="lucide:folder-plus"
    media-variant="icon"
  >
    <SButton>创建项目</SButton>
  </SEmpty>
</template>
```

## 演示

```playground
basic
icon
slot
custom-styling
```

## API

<ComponentApi component="empty" />
