# 手风琴

## 概述

一组垂直堆叠的可交互标题，每个标题都能展开/收起对应内容区域。支持单项或多项展开模式，并且样式可完全自定义。

## 用法

```vue
<script setup lang="ts">
import { SAccordion } from '@soybeanjs/ui';

const items = [
  { title: 'Is it accessible?', value: 'item-1', description: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  {
    title: 'Is it styled?',
    value: 'item-2',
    description: "Yes. It comes with default styles that matches the other components' aesthetic."
  },
  {
    title: 'Is it animated?',
    value: 'item-3',
    description: "Yes. It's animated by default, but you can disable it if you prefer."
  }
];
const value = ref('item-1');
</script>

<template>
  <SAccordion v-model="value" :items="items" />
</template>
```

## 演示

```playground
single
always-one
multiple
custom-icon
custom-styling
```

## API

<ComponentApi component="accordion" />
