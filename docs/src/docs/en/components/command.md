# Command

## Overview

Fast, composable, command menu for Vue.

## Usage

```vue
<script setup lang="ts">
import { SCommand } from '@soybeanjs/ui';

const items = [
  { label: 'Profile', value: 'profile', icon: 'lucide:user' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings' },
  { separator: true },
  { label: 'Logout', value: 'logout', icon: 'lucide:log-out' }
];
</script>

<template>
  <SCommand :items="items" placeholder="Type a command..." />
</template>
```

## Demos

```playground
base
dialog
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'CommandOptionData[]', default: '-', description: 'Data array for command items.', required: true },
  { name: 'modelValue', type: 'string', default: '-', description: 'The controlled value of the selected item.' },
  { name: 'searchTerm', type: 'string', default: '-', description: 'The controlled search term.' },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text for the input.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show clear button.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Command menu size.' },
  { name: 'emptyLabel', type: 'string', default: `'No results found.'`, description: 'Text to show when no items match.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggers when an item is selected.' },
  { name: 'update:searchTerm', parameters: '(value: string) => void', description: 'Triggers when search term changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'input-leading', parameters: '-', description: 'Content before input.' },
  { name: 'input-trailing', parameters: '-', description: 'Content after input.' },
  { name: 'empty', parameters: '-', description: 'Custom empty state content.' },
  { name: 'item', parameters: '{ item: CommandOptionData }', description: 'Custom item rendering.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'CommandOptionData',
    description: 'Data structure for command items.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string', description: 'Unique value.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'shortcut', type: 'string', description: 'Keyboard shortcut.' },
      { name: 'separator', type: 'boolean', description: 'Show separator before this item.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the item is disabled.' },
    ]
  }
]"/>
