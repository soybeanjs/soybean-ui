# 组合框

## 概述

用于搜索并从选项列表中快速选择值的组合框组件，支持显式锚点包装、可清空输入以及更完整的弹层/过滤交互。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SCombobox } from '@soybeanjs/ui';

const value = ref<string>();
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];
</script>

<template>
  <SCombobox v-model="value" :items="items" placeholder="Select a fruit" />
</template>
```

## 演示

```playground
basic
clearable
disabled
group
multiple
custom-styling
```

## API

<ComponentApi component="combobox" />
