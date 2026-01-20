# Tree

## Overview

A component used to display hierarchical data.

## Usage

```vue
<script setup lang="ts">
import { STree } from '@soybeanjs/ui';

const items = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Work' },
      { id: '1-2', label: 'Personal' }
    ]
  }
];
</script>

<template>
  <STree :items="items" />
</template>
```

## Demos

```playground
base
virtualizer
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'TreeItemData[]', default: '-', description: 'Tree data.', required: true },
  { name: 'selection', type: 'boolean', default: 'false', description: 'Whether to enable selection.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether to enable multiple selection.' },
  { name: 'defaultExpanded', type: 'string[]', default: '[]', description: 'Default expanded keys.' },
  { name: 'defaultSelected', type: 'string[]', default: '[]', description: 'Default selected keys.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:expanded', parameters: '(keys: string[]) => void', description: 'Triggers when expanded keys change.' },
  { name: 'update:selected', parameters: '(keys: string[]) => void', description: 'Triggers when selected keys change.' },
  { name: 'node-click', parameters: '(node: TreeItemData) => void', description: 'Triggers when a node is clicked.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'TreeItemData',
    description: 'Data structure for tree items.',
    fields: [
      { name: 'id', type: 'string', description: 'Unique identifier.' },
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'children', type: 'TreeItemData[]', description: 'Child items.' },
      { name: 'disabled', type: 'boolean', description: 'Whether item is disabled.' },
    ]
  }
]"/>
