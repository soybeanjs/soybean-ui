# Tooltip

## Overview

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Usage

```vue
<script setup lang="ts">
import { STooltip, SButton } from '@soybeanjs/ui';
</script>

<template>
  <STooltip content="Add to library">
    <template #trigger>
      <SButton variant="outline">Hover me</SButton>
    </template>
  </STooltip>
</template>
```

## Demos

```playground
base
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'content', type: 'string', default: '-', description: 'Tooltip content.' },
  { name: 'placement', type: 'Placement', default: `'top'`, description: 'Preferred placement.' },
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Default open state.' },
  { name: 'delay', type: 'number', default: '700', description: 'Open delay in ms.' },
  { name: 'showArrow', type: 'boolean', default: 'true', description: 'Whether to show arrow.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that triggers the tooltip.' },
  { name: 'default', parameters: '-', description: 'Tooltip content.' }
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
