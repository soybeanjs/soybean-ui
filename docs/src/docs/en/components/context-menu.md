# ContextMenu

## Overview

Displays a menu located at the pointer, triggered by a right-click.

## Usage

```vue
<script setup lang="ts">
import { SContextMenu } from '@soybeanjs/ui';

const items = [
  { label: 'Back', value: 'back', icon: 'lucide:arrow-left', shortcut: '⌘[' },
  { label: 'Forward', value: 'forward', icon: 'lucide:arrow-right', shortcut: '⌘]' },
  { label: 'Reload', value: 'reload', icon: 'lucide:refresh-cw', shortcut: '⌘R' },
  { separator: true },
  { label: 'Save As...', value: 'save', icon: 'lucide:save', shortcut: '⇧⌘S' }
];
</script>

<template>
  <SContextMenu :items="items">
    <div class="flex items-center justify-center border border-dashed h-[150px] rounded-md">Right click here</div>
  </SContextMenu>
</template>
```

## Demos

```playground
base
checkbox
radio
mix
```

## API

### SContextMenu Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuOptionData[]', default: '-', description: 'Menu data.', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether context menu is disabled.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'The modality of the context menu.' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: 'Text direction.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### SContextMenu Emits

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '(item: MenuOptionData, event: Event) => void', description: 'Triggers when an item is selected.' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' }
]"/>

### SContextMenuCheckbox Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuCheckboxOptionData[]', default: '-', description: 'Checkbox items data.', required: true },
  { name: 'modelValue', type: 'any[]', default: '-', description: 'Selected values.' }
]"/>

### SContextMenuRadio Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuRadioOptionData[]', default: '-', description: 'Radio items data.', required: true },
  { name: 'modelValue', type: 'string', default: '-', description: 'Selected value.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes (inherits from Menu Ui).',
    fields: [
      { name: 'content', type: 'string', description: 'Menu content container class.' },
      { name: 'item', type: 'string', description: 'Menu item class.' },
      { name: 'separator', type: 'string', description: 'Separator class.' },
    ]
  }
]"/>
