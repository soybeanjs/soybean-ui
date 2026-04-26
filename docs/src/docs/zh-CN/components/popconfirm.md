# 气泡确认框

## 概述

基于 Popover 的确认框组件，用于轻量级的二次确认操作。

## 用法

```vue
<script setup lang="ts">
import { SPopconfirm, SButton } from '@soybeanjs/ui';

function handleConfirm() {
  console.log('Confirmed!');
}

function handleCancel() {
  console.log('Cancelled!');
}
</script>

<template>
  <SPopconfirm
    title="删除项目?"
    description="此操作无法撤销。您确定要删除此项目吗?"
    type="destructive"
    :before-confirm="handleConfirm"
    :before-cancel="handleCancel"
  >
    <template #trigger>
      <SButton color="destructive">删除</SButton>
    </template>
  </SPopconfirm>
</template>
```

## 演示

```playground
base
```

## API

<ComponentApi component="popconfirm" />
