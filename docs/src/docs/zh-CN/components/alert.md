# 提示

## 概述

用于向用户展示重要信息或状态提示的组件。

## 用法

```vue
<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <SAlert title="Info" description="This is an info alert" />
  <SAlert title="Error" description="Something went wrong" color="destructive" variant="soft" />
</template>
```

> `SAlert` 现在会把默认的图标、标题、描述和关闭按钮结构组合委托给 headless `AlertCompact`。如果需要直接使用无样式的组合入口，可从 `@soybeanjs/headless/alert` 导入。

## 演示

```playground
color
variant
description
icon
desc-icon
closable
slot
size
```

## API

<ComponentApi component="alert" />
