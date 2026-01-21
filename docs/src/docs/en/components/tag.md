# Tag

## Overview

A small, interactive component used to categorize or label content.

## Usage

```vue
<script setup lang="ts">
import { STag } from '@soybeanjs/ui';
</script>

<template>
  <STag>Default</STag>
  <STag color="primary" variant="soft">Primary</STag>
</template>
```

## Demos

```playground
color
variant
shape
size
closable
slot
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: 'Tag color.' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, default: `'soft'`, description: 'Tag variant.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Tag size.' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Tag shape.' },
  { name: 'closable', type: 'boolean', default: 'false', description: 'Whether to show close button.' },
  { name: 'content', type: 'string', default: '-', description: 'Tag content (prop alternative to default slot).' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'close', parameters: '(event: MouseEvent) => void', description: 'Triggers when close button is clicked.' },
  { name: 'click', parameters: '(event: MouseEvent) => void', description: 'Triggers when tag is clicked.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Tag content.' },
  { name: 'close', parameters: '-', description: 'Custom close icon.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'close', type: 'string', description: 'Close button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
