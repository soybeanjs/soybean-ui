# Kbd

## Overview

Represents a keyboard input element. Useful for displaying keyboard shortcuts.

## Usage

```vue
<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';
</script>

<template>
  <SKbd>⌘</SKbd>
  +
  <SKbd>K</SKbd>
  <SKbd value="Ctrl" />
</template>
```

## Demos

```playground
base
size
variant
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'value', type: 'string', default: '-', description: 'The text value to display.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Kbd size.' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'plain'`, default: `'solid'`, description: 'Visual style variant.' },
  { name: 'as', type: 'string | Component', default: `'kbd'`, description: 'The rendered element.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into child element.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Content of the kbd.' }
]"/>
