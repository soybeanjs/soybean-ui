# 标签

## 概述

用于为表单控件提供语义化标签与可点击关联的组件。

## 用法

```vue
<script setup lang="ts">
import { SLabel, SInput } from '@soybeanjs/ui';
</script>

<template>
  <div class="grid gap-1.5">
    <SLabel htmlFor="email">Email</SLabel>
    <SInput id="email" type="email" placeholder="Email" />
  </div>
</template>
```

## API

<ComponentApi component="label" />
