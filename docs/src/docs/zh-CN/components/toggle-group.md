# ToggleGroup

## 概述

一组可切换开关状态的双态按钮，支持单选或多选模式。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToggleGroup v-model="value">
    <SToggleGroupItem value="bold">Bold</SToggleGroupItem>
    <SToggleGroupItem value="italic">Italic</SToggleGroupItem>
    <SToggleGroupItem value="underline">Underline</SToggleGroupItem>
  </SToggleGroup>
</template>
```

## 演示

```playground
basic
multiple
variant
vertical
```

## API

<ComponentApi component="toggle-group" />
