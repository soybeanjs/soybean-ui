# 自动完成

## 概述

用于根据输入内容筛选建议项并快速填充文本的自动完成组件。

## 用法

```vue
<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
];
</script>

<template>
  <SAutocomplete :items="items" placeholder="Search a fruit" />
</template>
```

> `SAutocomplete` 现在会把筛选与选项聚合逻辑委托给 headless `AutocompleteCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/autocomplete` 直接导入 `AutocompleteCompact`。

## 演示

```playground
basic
grouped
open-on-focus
disabled
custom-styling
```

## API

<ComponentApi component="autocomplete" />
