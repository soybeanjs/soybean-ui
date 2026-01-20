# 对话框

## 概述

用于展示模态内容的对话框组件。

## 用法

```vue
<script setup lang="ts">
import { SDialog, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDialog v-model:open="open" title="Edit Profile" description="Make changes to your profile here.">
    <template #trigger>
      <SButton variant="outline">Edit Profile</SButton>
    </template>
    <div class="grid gap-4 py-4">
      <!-- Form content -->
    </div>
    <template #footer>
      <SButton @click="open = false">Save changes</SButton>
    </template>
  </SDialog>
</template>
```

## 演示

```playground
base
footer
state
prevent
pure
use-dialog
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: 'The controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state (uncontrolled).' },
  { name: 'title', type: 'string', default: '-', description: 'Dialog title.' },
  { name: 'description', type: 'string', default: '-', description: 'Dialog description.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Dialog size.' },
  { name: 'closable', type: 'boolean', default: 'true', description: '是否显示关闭按钮。' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'The modality of the dialog.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' },
  { name: 'close', parameters: '() => void', description: '对话框关闭时触发。' },
  { name: 'open-auto-focus', parameters: '(event: Event) => void', description: '焦点移动到对话框时触发。' },
  { name: 'close-auto-focus', parameters: '(event: Event) => void', description: '焦点移回触发器时触发。' },
  { name: 'escape-key-down', parameters: '(event: KeyboardEvent) => void', description: '按下 Escape 键时触发。' },
  { name: 'pointer-down-outside', parameters: '(event: PointerDownOutsideEvent) => void', description: '指针在外部按下时触发。' },
  { name: 'interact-outside', parameters: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void', description: '在外部发生交互时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that opens the dialog.' },
  { name: 'default', parameters: '-', description: 'Main content.' },
  { name: 'footer', parameters: '-', description: 'Footer content (buttons).' },
  { name: 'header', parameters: '-', description: 'Header content (title/desc wrapper).' },
  { name: 'title', parameters: '-', description: 'Custom title.' },
  { name: 'description', parameters: '-', description: 'Custom description.' },
  { name: 'overlay', parameters: '-', description: 'Custom overlay.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'content', type: 'string', description: '内容容器类名。' },
      { name: 'header', type: 'string', description: '头部容器类名。' },
      { name: 'footer', type: 'string', description: '底部容器类名。' },
      { name: 'title', type: 'string', description: 'Title class.' },
      { name: 'description', type: 'string', description: 'Description class.' },
      { name: 'overlay', type: 'string', description: 'Overlay backdrop class.' },
      { name: 'closable', type: 'string', description: 'Close button class.' },
    ]
  }
]"/>
