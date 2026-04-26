# 分页

## 概述

分页用于将内容或数据拆分为多个页面，并提供用于跳转到上一页/下一页的导航控件。

## 用法

```vue
<script setup lang="ts">
import { SPagination } from '@soybeanjs/ui';

const page = ref(1);
</script>

<template>
  <SPagination v-model:page="page" :total="100" :items-per-page="10" />
</template>
```

## 演示

```playground
variant
size
shape
slot
action
show
```

## API

<ComponentApi component="pagination" />
