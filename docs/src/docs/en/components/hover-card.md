# Hover Card

## Overview

Displays a richer preview card when the trigger is hovered or receives focus.

## Usage

```vue
<script setup lang="ts">
import { SButton, SHoverCard } from '@soybeanjs/ui';
</script>

<template>
  <SHoverCard>
    <template #trigger>
      <SButton variant="outline">Hover me</SButton>
    </template>
    <div class="space-y-1.5">
      <p class="font-medium">Hover card</p>
      <p class="text-sm text-muted-foreground">Use it to show richer preview content.</p>
    </div>
  </SHoverCard>
</template>
```

## Demo

```playground
basic
delay
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Default open state.' },
  { name: 'openDelay', type: 'number', default: '700', description: 'Delay before opening after hovering the trigger, in milliseconds.' },
  { name: 'closeDelay', type: 'number', default: '300', description: 'Delay before closing after leaving the trigger or content, in milliseconds.' },
  { name: 'placement', type: 'Placement', default: `'bottom'`, description: 'Preferred popup placement.' },
  { name: 'showArrow', type: 'boolean', default: 'true', description: 'Whether to show the arrow.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the popup container.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for internal elements.' }
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggered when the open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'Element that triggers the hover card.' },
  { name: 'default', parameters: '-', description: 'Hover card content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom style classes.',
    fields: [
      { name: 'positioner', type: 'string', description: 'Positioner container class.' },
      { name: 'popup', type: 'string', description: 'Popup container class.' },
      { name: 'arrow', type: 'string', description: 'Arrow element class.' },
    ]
  }
]"/>
