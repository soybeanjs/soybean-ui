# Collapsible

## Overview

An interactive component which expands/collapses a panel.

## Usage

```vue
<script setup lang="ts">
import { SCollapsible, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SCollapsible v-model:open="open">
    <template #trigger>
      <SButton variant="outline">Toggle</SButton>
    </template>
    <div class="p-4 border rounded-md mt-2">Content goes here.</div>
  </SCollapsible>
</template>
```

## Demos

```playground
base
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: 'The controlled open state of the collapsible.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state when initially rendered.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, prevents the user from interacting with the collapsible.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Collapsible size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Event emitted when the open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'The content of the collapsible.' },
  { name: 'trigger', parameters: '-', description: 'The trigger element to toggle the collapsible.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'trigger', type: 'string', description: 'Trigger element class.' },
      { name: 'content', type: 'string', description: 'Content container class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
