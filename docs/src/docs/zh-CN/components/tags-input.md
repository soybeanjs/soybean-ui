# 标签输入

## 概述

用于输入、展示和删除多个标签值的组合组件，支持对象值、分隔符添加和键盘导航。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { STagsInput, STagsInputInput, STagsInputItem, STagsInputItemDelete, STagsInputItemText } from '@soybeanjs/ui';

const tags = ref(['Vue', 'TypeScript']);
</script>

<template>
  <STagsInput v-model="tags">
    <template #default="{ modelValue }">
      <STagsInputItem v-for="tag in modelValue" :key="tag" :value="tag">
        <STagsInputItemText />
        <STagsInputItemDelete />
      </STagsInputItem>
      <STagsInputInput placeholder="添加标签" aria-label="添加标签" />
    </template>
  </STagsInput>
</template>
```

## 演示

```playground
basic
disabled
object-value
clear
```

## API

<ComponentApi component="tags-input" />
