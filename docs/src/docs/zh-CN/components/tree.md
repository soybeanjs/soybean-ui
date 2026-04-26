# 树

## 概述

用于展示树形层级数据的组件。

## 用法

```vue
<script setup lang="ts">
import { STree } from '@soybeanjs/ui';

const items = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Work' },
      { id: '1-2', label: 'Personal' }
    ]
  }
];
</script>

<template>
  <STree :items="items" />
</template>
```

## 演示

```playground
base
virtualizer
```

## API

<ComponentApi component="tree" />
