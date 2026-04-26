# Splitter

## 概述

用于将一个区域拆分为多个可拖拽调整尺寸面板的布局组件。

## 用法

```vue
<script setup lang="ts">
import { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle } from '@soybeanjs/ui';
</script>

<template>
  <SSplitterGroup>
    <SSplitterPanel :default-size="30">侧边栏</SSplitterPanel>
    <SSplitterResizeHandle with-handle aria-label="调整面板尺寸" />
    <SSplitterPanel>主内容</SSplitterPanel>
  </SSplitterGroup>
</template>
```

## 演示

```playground
basic
vertical
collapsible
disabled
custom-handle
```

## API

<ComponentApi component="splitter" />
