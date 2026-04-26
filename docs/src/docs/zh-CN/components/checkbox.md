# 复选框

## 概述

用于在选中/未选中之间切换的复选框组件。

## 用法

```vue
<script setup lang="ts">
import { SCheckbox } from '@soybeanjs/ui';

const checked = ref(false);
</script>

<template>
  <SCheckbox v-model="checked" label="Accept terms" />
</template>
```

> `SCheckboxGroup` 和 `SCheckboxCardGroup` 现在会把列表遍历和默认复选框/卡片结构组合委托给 headless `CheckboxGroupCompact` 与 `CheckboxCardGroupCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/checkbox` 直接导入。

## 演示

```playground
single
color
size
shape
icon
group
card
card-group
```

## API

<ComponentApi component="checkbox" />
