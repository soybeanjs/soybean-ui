# 布局

## 概述

用于后台管理面板或复杂应用的布局组件结构。它负责管理侧边栏、头部、底部、标签栏以及主内容区域。

## 用法

```vue
<script setup lang="ts">
import { SLayout } from '@soybeanjs/ui';
</script>

<template>
  <SLayout>
    <template #sidebar>侧边栏内容</template>
    <template #header>头部内容</template>
    <template #tab>标签栏内容</template>
    主内容
    <template #footer>底部内容</template>
  </SLayout>
</template>
```

## 演示

```playground
base
```

## API

<ComponentApi component="layout" />
