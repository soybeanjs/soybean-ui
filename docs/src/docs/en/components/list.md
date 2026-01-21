# List

## Overview

A container for displaying a list of items.

## Usage

```vue
<script setup lang="ts">
import { SList, SListItem } from '@soybeanjs/ui';
</script>

<template>
  <SList>
    <SListItem title="Item 1" description="Description 1" />
    <SListItem title="Item 2" description="Description 2" />
  </SList>
</template>
```

## Demos

```playground
base
```

## API

### SList Props

<DataTable preset="props" :data="[
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'List size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### SListItem Props

<DataTable preset="props" :data="[
  { name: 'title', type: 'string', default: '-', description: 'Item title.' },
  { name: 'description', type: 'string', default: '-', description: 'Item description.' }
]"/>

### Slots (SListItem)

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Custom content.' },
  { name: 'title', parameters: '-', description: 'Custom title.' },
  { name: 'description', parameters: '-', description: 'Custom description.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'List container class.' },
      { name: 'item', type: 'string', description: 'List item class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
