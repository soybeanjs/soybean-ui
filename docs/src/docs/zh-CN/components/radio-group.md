# 单选框组

## 概述

用于在多个选项中选择单个值的单选框组组件。

## 用法

```vue
<script setup lang="ts">
import { SRadioGroup } from '@soybeanjs/ui';

const value = ref('option-1');
const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];
</script>

<template>
  <SRadioGroup v-model="value" :items="items" />
</template>
```

> `SRadioGroup` 现在会把条目遍历和默认单选项结构组合委托给 headless `RadioGroupCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/radio-group` 直接导入 `RadioGroupCompact`。

## 演示

```playground
color
size
variant
card
```

## API

<ComponentApi component="radio-group" />
