# 页面标签

## 概述

一个用于在不同页面或视图之间导航的标签页界面。它支持可关闭的标签、上下文菜单和可自定义的样式。

## 用法

```vue
<script setup lang="ts">
import { SPageTabs } from '@soybeanjs/ui';
import { ref } from 'vue';

const tabs = ref([
  { label: 'Home', value: 'home', closable: false },
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' }
]);
const activeKey = ref('home');
</script>

<template>
  <SPageTabs v-model="activeKey" :tabs="tabs" />
</template>
```

## 演示

```playground
base
```
