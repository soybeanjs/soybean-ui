# BottomSheet

## Overview

A mobile-first sheet that slides up from the bottom of the viewport and supports drag-to-close interactions.

## Usage

```vue
<script setup lang="ts">
import { SBottomSheet, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SBottomSheet title="Share post" description="Invite teammates or copy the link to continue.">
    <template #trigger>
      <SButton variant="outline">Open BottomSheet</SButton>
    </template>
    <p class="text-sm text-muted-foreground">Content goes here.</p>
  </SBottomSheet>
</template>
```

## Demos

```playground
basic
controlled
handle-only
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: 'The controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'Whether outside interaction is blocked while open.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the content container.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Controls spacing and typography inside the sheet.' },
  { name: 'title', type: 'string', default: '-', description: 'Sheet title.' },
  { name: 'description', type: 'string', default: '-', description: 'Sheet description.' },
  { name: 'showHandle', type: 'boolean', default: 'true', description: 'Whether to render the drag handle.' },
  { name: 'handleOnly', type: 'boolean', default: 'false', description: 'When true, dragging is only enabled from the handle area.' },
  { name: 'closeThreshold', type: 'number', default: '0.35', description: 'The percentage of sheet height required to trigger drag close.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names for internal slots.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that opens the sheet.' },
  { name: 'handle', parameters: '-', description: 'Custom drag handle content.' },
  { name: 'header', parameters: '-', description: 'Custom header content.' },
  { name: 'title', parameters: '-', description: 'Custom title content.' },
  { name: 'description', parameters: '-', description: 'Custom description content.' },
  { name: 'default', parameters: '-', description: 'Main body content.', required: true },
  { name: 'footer', parameters: '-', description: 'Footer actions.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'overlay', type: 'string', description: 'Overlay class.' },
      { name: 'content', type: 'string', description: 'Content container class.' },
      { name: 'header', type: 'string', description: 'Header wrapper class.' },
      { name: 'title', type: 'string', description: 'Title class.' },
      { name: 'description', type: 'string', description: 'Description class.' },
      { name: 'footer', type: 'string', description: 'Footer wrapper class.' },
      { name: 'handle', type: 'string', description: 'Handle wrapper class.' },
      { name: 'handleIndicator', type: 'string', description: 'Handle indicator class.' },
      { name: 'main', type: 'string', description: 'Main body wrapper class.' },
    ],
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
