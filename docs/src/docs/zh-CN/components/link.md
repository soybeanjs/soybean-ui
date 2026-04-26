# 链接

## 概述

用于渲染链接（内部路由或外部链接）的组件。

## 用法

```vue
<script setup lang="ts">
import { SLink } from '@soybeanjs/ui';
</script>

<template>
  <SLink href="https://github.com" target="_blank">External Link</SLink>
  <SLink to="/home">Internal Link</SLink>
</template>
```

## 演示

```playground
base
href
```

## API

<ComponentApi component="link" />
