# Dialog

## Overview

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

`SDialog` is the declarative wrapper for inline usage. `dialog(...)` is the imperative API for creating alert-style dialogs programmatically.

Mount `SDialogProvider` once near your app root before calling the imperative `dialog(...)` API.

## Usage

### Declarative

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

### Imperative API

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

## Demos

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
