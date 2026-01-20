# DropdownMenu

## Overview

Displays a menu to the user—such as a set of actions or functions—triggered by a button.

## Usage

```vue
<script setup lang="ts">
import { SDropdownMenu, SButton } from '@soybeanjs/ui';

const items = [
  { label: 'My Account', isGroupLabel: true },
  { label: 'Profile', value: 'profile', icon: 'lucide:user', shortcut: '⇧⌘P' },
  { label: 'Billing', value: 'billing', icon: 'lucide:credit-card', shortcut: '⌘B' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings', shortcut: '⌘S' },
  { separator: true },
  { label: 'Logout', value: 'logout', icon: 'lucide:log-out', shortcut: '⇧⌘Q' }
];
</script>

<template>
  <SDropdownMenu :items="items">
    <template #trigger>
      <SButton variant="outline">Open Menu</SButton>
    </template>
  </SDropdownMenu>
</template>
```

## Demos

```playground
base
trigger
arrow
checkbox
radio
mix
```

## API

### SDropdownMenu Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenuOptionData[]', default: '-', description: 'Menu data.', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the dropdown is disabled.' },
  { name: 'placement', type: 'Placement', default: `'bottom'`, description: 'Preferred placement.' },
  { name: 'showArrow', type: 'boolean', default: 'false', description: 'Whether to show the arrow.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### SDropdownMenu Emits

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '(item: MenuOptionData, event: Event) => void', description: 'Triggers when an item is selected.' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that triggers the dropdown.' },
  { name: 'item', parameters: '{ item: MenuOptionData }', description: 'Custom item rendering.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes (inherits from Menu Ui).',
    fields: [
      { name: 'content', type: 'string', description: 'Dropdown content class.' },
      { name: 'item', type: 'string', description: 'Item class.' },
    ]
  }
]"/>
