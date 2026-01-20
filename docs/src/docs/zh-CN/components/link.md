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

### 属性

<DataTable preset="props" :data="[
  { name: 'to', type: 'RouteLocationRaw', default: '-', description: '目标路由。' },
  { name: 'href', type: 'string', default: '-', description: '目标 URL。' },
  { name: 'external', type: 'boolean', default: 'false', description: '强制外部链接行为。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '链接是否禁用。' },
  { name: 'prefetch', type: 'boolean', default: '-', description: '启用预取行为（依赖框架）。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ isHref: boolean }', description: '链接内容。' }
]"/>
