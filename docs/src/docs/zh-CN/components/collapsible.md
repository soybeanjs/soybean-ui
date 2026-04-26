# 折叠面板

## 概述

用于展开/折叠内容面板的交互组件。

## 用法

```vue
<script setup lang="ts">
import { SCollapsible, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SCollapsible v-model:open="open">
    <template #trigger>
      <SButton variant="outline">切换</SButton>
    </template>
    <div class="p-4 border rounded-md mt-2">内容在这里。</div>
  </SCollapsible>
</template>
```

## 演示

```playground
base
```

## API

<ComponentApi component="collapsible" />
