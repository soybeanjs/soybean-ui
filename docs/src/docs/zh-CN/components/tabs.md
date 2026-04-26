# 标签页

## 概述

用于在多个内容面板之间切换的标签页组件。

## 用法

```vue
<script setup lang="ts">
import { STabs } from '@soybeanjs/ui';

const value = ref('account');
const items = [
  { label: 'Account', value: 'account' },
  { label: 'Password', value: 'password' }
];
</script>

<template>
  <STabs v-model="value" :items="items">
    <template #content="{ value }">
      <div v-if="value === 'account'">Make changes to your account here.</div>
      <div v-else-if="value === 'password'">Change your password here.</div>
    </template>
  </STabs>
</template>
```

> `STabs` 现在会把条目遍历、默认 trigger/content 组合与 indicator 渲染委托给 headless `TabsCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/tabs` 直接导入 `TabsCompact`。

## 演示

```playground
horizontal
vertical
fill
custom
```

## API

<ComponentApi component="tabs" />
