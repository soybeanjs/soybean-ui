# 选择器

## 概述

用于从选项列表中选择值的选择器组件。

## 用法

```vue
<script setup lang="ts">
import { SSelect } from '@soybeanjs/ui';

const value = ref('apple');
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];
</script>

<template>
  <SSelect v-model="value" :items="items" placeholder="Select a fruit..." />
</template>
```

> `SSelect` 现在会把选项聚合与默认条目组合逻辑委托给 headless `SelectCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/select` 直接导入 `SelectCompact`。

## 演示

```playground
base
default-value
disabled
separator
group
multiple
```

## API

<ComponentApi component="select" />
