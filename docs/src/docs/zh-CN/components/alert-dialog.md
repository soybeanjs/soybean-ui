# 警告对话框

## 概述

一种模态对话框：用重要内容打断用户，并期望用户做出响应。常用于需要确认的场景（例如删除操作）。

## 用法

```vue
<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SAlertDialog v-model:open="open" title="确定吗？" description="此操作无法撤销。">
    <template #trigger>
      <button>删除</button>
    </template>
    <template #footer>
      <SAlertDialogCancel />
      <SAlertDialogAction @click="handleDelete" />
    </template>
  </SAlertDialog>
</template>
```

## 演示

```playground
destructive
info
success
warning
action
```

## SAlertDialog API

### 属性

<DataTable preset="props" :data="[
  { name: 'v-model:open', type: 'boolean', default: '-', description: '可见性的绑定值。' },
  { name: 'title', type: 'string', default: '-', description: '对话框标题。' },
  { name: 'description', type: 'string', default: '-', description: '对话框描述。' },
  { name: 'type', type: `'destructive' \| 'success' \| 'warning' \| 'info'`, default: '-', description: '语义类型（影响图标/颜色）。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '对话框尺寸。' },
  { name: 'show-icon', type: 'boolean', default: 'true', description: '是否显示状态图标。' },
  { name: 'default-open', type: 'boolean', default: 'false', description: '是否默认打开（非受控）。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(value: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: '用于打开对话框的元素。', required: true },
  { name: 'default', parameters: '-', description: '主要内容。', required: true },
  { name: 'footer', parameters: '-', description: '底部内容（通常是按钮）。', required: true },
  { name: 'title', parameters: '-', description: '自定义标题内容。' },
  { name: 'description', parameters: '-', description: '自定义描述内容。' }
]"/>

## SAlertDialogCancel API

### 属性

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: '取消', description: '按钮文案。' },
  { name: 'before-close', type: '() => MaybePromise<boolean | void>', default: '() => true', description: '关闭前钩子。返回 false 可阻止关闭。' }
]"/>

## SAlertDialogAction API

### 属性

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: '确认', description: '按钮文案。' },
  { name: 'before-close', type: '() => MaybePromise<boolean | void>', default: '() => true', description: '关闭前钩子。返回 false 可阻止关闭。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'header', type: 'string', description: '头部容器类名。' },
      { name: 'footer', type: 'string', description: '底部容器类名。' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
