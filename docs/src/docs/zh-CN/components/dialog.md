# 对话框

## 概述

用于展示模态内容的对话框组件。

`SDialog` 适合在模板中声明式使用，`dialog(...)` 则提供命令式创建弹窗的能力，适合警告、确认等场景。

使用命令式 `dialog(...)` 之前，需要在应用根部附近挂载一次 `SDialogProvider`。

## 用法

### 声明式用法

```vue
<script setup lang="ts">
import { SButton, SDialog } from '@soybeanjs/ui';

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

### 命令式 API

```vue
<script setup lang="ts">
import { h } from 'vue';
import { SButton, SDialogProvider, dialog } from '@soybeanjs/ui';

function openWarningDialog() {
  dialog.warning('Delete Project', {
    description: 'This action cannot be undone.',
    content: h('div', 'Please confirm before continuing.'),
    confirmText: 'Delete'
  });
}
</script>

<template>
  <SDialogProvider />

  <SButton color="warning" @click="openWarningDialog">Open Dialog</SButton>
</template>
```

## 演示

```playground
base
footer
state
prevent
pure
dialog-api
```

## API

<ComponentApi component="dialog" />
