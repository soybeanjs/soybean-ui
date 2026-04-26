# Toolbar

## 概述

用于将相关操作、链接和切换控件组织到同一个支持 roving focus 的紧凑工具栏中。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToolbar, SToolbarButton, SToolbarSeparator, SToolbarToggleGroup, SToolbarToggleItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToolbar>
    <SToolbarButton>剪切</SToolbarButton>
    <SToolbarButton>复制</SToolbarButton>
    <SToolbarSeparator />
    <SToolbarToggleGroup v-model="value">
      <SToolbarToggleItem value="bold">加粗</SToolbarToggleItem>
      <SToolbarToggleItem value="italic">斜体</SToolbarToggleItem>
    </SToolbarToggleGroup>
  </SToolbar>
</template>
```

## 演示

```playground
basic
link
toggle-group
vertical
```

## API

<ComponentApi component="toolbar" />
