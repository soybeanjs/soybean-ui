# 头像

## 概述

用于展示用户头像的图片组件，支持加载失败时的回退内容。

## 用法

```vue
<script setup lang="ts">
import { SAvatar } from '@soybeanjs/ui';
</script>

<template>
  <SAvatar src="https://github.com/soybeanjs.png" fallback-label="SB" />
</template>
```

## 演示

```playground
base
fallback
delay
size
```

## API

<ComponentApi component="avatar" />
