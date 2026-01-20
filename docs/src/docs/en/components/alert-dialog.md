# AlertDialog

## Overview

A modal dialog that interrupts the user with important content and expects a response. Useful for confirmations (e.g., delete actions).

## Usage

```vue
<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SAlertDialog v-model:open="open" title="Are you sure?" description="This action cannot be undone.">
    <template #trigger>
      <button>Delete</button>
    </template>
    <template #footer>
      <SAlertDialogCancel />
      <SAlertDialogAction @click="handleDelete" />
    </template>
  </SAlertDialog>
</template>
```

## Demos

```playground
destructive
info
success
warning
action
```

## SAlertDialog API

### Props

<DataTable preset="props" :data="[
  { name: 'v-model:open', type: 'boolean', default: '-', description: 'Binding value for visibility.' },
  { name: 'title', type: 'string', default: '-', description: 'Dialog title.' },
  { name: 'description', type: 'string', default: '-', description: 'Dialog description.' },
  { name: 'type', type: `'destructive' \| 'success' \| 'warning' \| 'info'`, default: '-', description: 'Semantic type (affects icon/color).' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Size of the dialog.' },
  { name: 'show-icon', type: 'boolean', default: 'true', description: 'Whether to show status icon.' },
  { name: 'default-open', type: 'boolean', default: 'false', description: 'Whether to open by default (uncontrolled).' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(value: boolean) => void', description: 'Triggers when open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that opens the dialog.', required: true },
  { name: 'default', parameters: '-', description: 'Main content.', required: true },
  { name: 'footer', parameters: '-', description: 'Footer content (buttons).', required: true },
  { name: 'title', parameters: '-', description: 'Custom title content.' },
  { name: 'description', parameters: '-', description: 'Custom description content.' }
]"/>

## SAlertDialogCancel API

### Props

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: 'Cancel', description: 'Button text.' },
  { name: 'before-close', type: '() => MaybePromise<boolean | void>', default: '() => true', description: 'Hook before closing. Return false to prevent close.' }
]"/>

## SAlertDialogAction API

### Props

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: 'Confirm', description: 'Button text.' },
  { name: 'before-close', type: '() => MaybePromise<boolean | void>', default: '() => true', description: 'Hook before closing. Return false to prevent close.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'header', type: 'string', description: 'Header container class.' },
      { name: 'footer', type: 'string', description: 'Footer container class.' },
    ]
  }
]"/>
