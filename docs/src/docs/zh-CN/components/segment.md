# 分段控件

## 概述

用于在多个选项之间快速切换的分段控件。

## 用法

```vue
<script setup lang="ts">
import { SSegment } from '@soybeanjs/ui';

const value = ref('daily');
const items = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
];
</script>

<template>
  <SSegment v-model="value" :items="items" />
</template>
```

> `SSegment` 现在会把条目遍历和 indicator 结构组合委托给 headless `SegmentCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/tabs` 直接导入 `SegmentCompact`。

## 演示

```playground
base
vertical
shape
icon
```

## API

<ComponentApi component="segment" />
