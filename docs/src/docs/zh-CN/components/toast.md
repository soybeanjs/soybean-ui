# 通知

## 概述

用于展示轻量级通知消息的组件。

## 用法

```vue
<script setup lang="ts">
import { SButton, useToast } from '@soybeanjs/ui';

const { toast } = useToast();
</script>

<template>
  <SButton
    @click="
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM'
      })
    "
  >
    Show Toast
  </SButton>
</template>
```

## 演示

```playground
base
type
color
position
content
```

## API

### useToast Options

<DataTable preset="props" :data="[
  { name: 'title', type: 'string | VNode', default: '-', description: 'Toast title.' },
  { name: 'description', type: 'string | VNode', default: '-', description: 'Toast description.' },
  { name: 'type', type: `'info' \| 'success' \| 'warning' \| 'destructive'`, default: `'info'`, description: 'Toast type.' },
  { name: 'duration', type: 'number', default: '5000', description: 'Duration in milliseconds.' },
  { name: 'position', type: `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'`, default: `'top-right'`, description: 'Toast position.' },
  { name: 'showIcon', type: 'boolean', default: 'true', description: '是否显示 type icon.' },
  { name: 'closable', type: 'boolean', default: 'true', description: '是否显示关闭按钮。' }
]"/>

### SToastProvider Props

<DataTable preset="props" :data="[
  { name: 'limits', type: 'number', default: '3', description: 'Max number of toasts.' },
  { name: 'removeDelay', type: 'number', default: '5000', description: 'Default duration.' },
  { name: 'position', type: 'ToastPosition', default: `'top-right'`, description: 'Default position.' }
]"/>
