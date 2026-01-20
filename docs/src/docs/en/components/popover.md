# Popover

## Overview

Displays rich content in a portal, triggered by a button.

## Usage

```vue
<script setup lang="ts">
import { SPopover, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SPopover>
    <template #trigger>
      <SButton variant="outline">Open Popover</SButton>
    </template>
    <div class="p-4">
      <h3 class="font-medium">Popover Title</h3>
      <p class="text-sm text-muted-foreground">This is the popover content.</p>
    </div>
  </SPopover>
</template>
```

## Demos

```playground
base
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Default open state.' },
  { name: 'placement', type: 'Placement', default: `'bottom'`, description: 'Preferred placement.' },
  { name: 'showArrow', type: 'boolean', default: 'false', description: 'Whether to show arrow.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that triggers the popover.' },
  { name: 'default', parameters: '-', description: 'Popover content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'content', type: 'string', description: 'Content container class.' },
      { name: 'arrow', type: 'string', description: 'Arrow element class.' },
    ]
  }
]"/>
