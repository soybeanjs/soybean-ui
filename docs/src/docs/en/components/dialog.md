# Dialog

## Overview

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

## Usage

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

## Demos

```playground
base
footer
state
prevent
pure
use-dialog
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: 'The controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state (uncontrolled).' },
  { name: 'title', type: 'string', default: '-', description: 'Dialog title.' },
  { name: 'description', type: 'string', default: '-', description: 'Dialog description.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Dialog size.' },
  { name: 'closable', type: 'boolean', default: 'true', description: 'Whether to show close button.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'The modality of the dialog.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' },
  { name: 'close', parameters: '() => void', description: 'Triggers when dialog closes.' },
  { name: 'open-auto-focus', parameters: '(event: Event) => void', description: 'Triggers when focus moves to dialog.' },
  { name: 'close-auto-focus', parameters: '(event: Event) => void', description: 'Triggers when focus moves back trigger.' },
  { name: 'escape-key-down', parameters: '(event: KeyboardEvent) => void', description: 'Triggers when escape key is pressed.' },
  { name: 'pointer-down-outside', parameters: '(event: PointerDownOutsideEvent) => void', description: 'Triggers when pointer is down outside.' },
  { name: 'interact-outside', parameters: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void', description: 'Triggers when interaction occurs outside.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that opens the dialog.' },
  { name: 'default', parameters: '-', description: 'Main content.' },
  { name: 'footer', parameters: '-', description: 'Footer content (buttons).' },
  { name: 'header', parameters: '-', description: 'Header content (title/desc wrapper).' },
  { name: 'title', parameters: '-', description: 'Custom title.' },
  { name: 'description', parameters: '-', description: 'Custom description.' },
  { name: 'overlay', parameters: '-', description: 'Custom overlay.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'content', type: 'string', description: 'Content container class.' },
      { name: 'header', type: 'string', description: 'Header container class.' },
      { name: 'footer', type: 'string', description: 'Footer container class.' },
      { name: 'title', type: 'string', description: 'Title class.' },
      { name: 'description', type: 'string', description: 'Description class.' },
      { name: 'overlay', type: 'string', description: 'Overlay backdrop class.' },
      { name: 'closable', type: 'string', description: 'Close button class.' },
    ]
  }
]"/>
