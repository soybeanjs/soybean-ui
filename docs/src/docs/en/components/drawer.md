# Drawer

## Overview

A panel that slides out from the edge of the screen. Often used for mobile navigation or auxiliary actions.

## Usage

```vue
<script setup lang="ts">
import { SDrawer, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDrawer v-model:open="open" title="Menu" side="left">
    <template #trigger>
      <SButton variant="outline">Open Drawer</SButton>
    </template>
    <div class="py-4">
      <p>Navigation links...</p>
    </div>
  </SDrawer>
</template>
```

## Demos

```playground
side
scroll
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'side', type: `'top' \| 'right' \| 'bottom' \| 'left'`, default: `'right'`, description: 'The side of the screen from which the drawer appears.' },
  { name: 'open', type: 'boolean', default: '-', description: 'The controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Drawer size (width/height depending on side).' },
  { name: 'title', type: 'string', default: '-', description: 'Drawer title.' },
  { name: 'description', type: 'string', default: '-', description: 'Drawer description.' },
  { name: 'closable', type: 'boolean', default: 'true', description: 'Whether to show close button.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that opens the drawer.' },
  { name: 'default', parameters: '-', description: 'Main content.' },
  { name: 'footer', parameters: '-', description: 'Footer content.' },
  { name: 'header', parameters: '-', description: 'Header content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes (inherits from Dialog Ui).',
    fields: [
      { name: 'content', type: 'string', description: 'Content container class.' },
      { name: 'main', type: 'string', description: 'Main body wrapper class.' },
    ]
  }
]"/>
