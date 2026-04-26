# 面包屑

## 概述

用于展示当前页面在站点层级中的导航路径。

## 用法

```vue
<script setup lang="ts">
import { SBreadcrumb } from '@soybeanjs/ui';

const items = [{ label: 'Home', link: '/' }, { label: 'Components', link: '/components' }, { label: 'Breadcrumb' }];
</script>

<template>
  <SBreadcrumb :items="items" />
</template>
```

> `SBreadcrumb` 现在会把列表聚合逻辑委托给 headless `BreadcrumbCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/breadcrumb` 直接导入 `BreadcrumbCompact`。

## 演示

```playground
base
separator
link
item-dropdown
ellipsis-dropdown
```

## API

<ComponentApi component="breadcrumb" />
