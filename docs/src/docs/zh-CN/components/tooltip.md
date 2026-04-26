# 文字提示

## 概述

当元素获得键盘焦点或鼠标悬停时，显示与该元素相关信息的弹出层。

## 用法

```vue
<script setup lang="ts">
import { STooltip, SButton } from '@soybeanjs/ui';
</script>

<template>
  <STooltip content="添加到库">
    <template #trigger>
      <SButton variant="outline">悬停查看</SButton>
    </template>
  </STooltip>
</template>
```

## 演示

```playground
base
```

## API

<ComponentApi component="tooltip" />
