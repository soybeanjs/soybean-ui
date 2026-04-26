# 密码

## 概述

用于输入密码的输入框组件，支持显示/隐藏切换等能力。

## 用法

```vue
<script setup lang="ts">
import { SPassword } from '@soybeanjs/ui';

const password = ref('');
</script>

<template>
  <SPassword v-model="password" placeholder="Enter password" />
</template>
```

## 演示

```playground
base
disabled
clearable
icon
```

## API

<ComponentApi component="password" />
