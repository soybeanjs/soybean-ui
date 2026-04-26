# Backtop

## 概述

Backtop 会在滚动目标超过阈值后显示一个浮动按钮，并在触发时将目标容器滚动回起始位置。

> 注意：除了 SBacktop，headless 层还导出了 Backtop，可用于自定义组合。

## 用法

```vue
<script setup lang="ts">
import { SBacktop } from '@soybeanjs/ui';
</script>

<template>
  <SBacktop />
</template>
```

## 演示

```playground
basic
target
disabled
custom-styling
```

## API

<ComponentApi component="backtop" />
