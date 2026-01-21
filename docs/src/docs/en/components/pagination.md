# Pagination

## Overview

Pagination is used for splitting up content or data into several pages, with a control for navigating to the next or previous page.

## Usage

```vue
<script setup lang="ts">
import { SPagination } from '@soybeanjs/ui';

const page = ref(1);
</script>

<template>
  <SPagination v-model:page="page" :total="100" :items-per-page="10" />
</template>
```

## Demos

```playground
variant
size
shape
slot
action
show
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'page', type: 'number', default: '1', description: 'Current page number.', required: true },
  { name: 'total', type: 'number', default: '0', description: 'Total number of items.', required: true },
  { name: 'itemsPerPage', type: 'number', default: '10', description: 'Number of items per page.' },
  { name: 'siblingCount', type: 'number', default: '1', description: 'Number of siblings to show around current page.' },
  { name: 'showEdges', type: 'boolean', default: 'false', description: 'Whether to show first/last page buttons.' },
  { name: 'showFirstOrLast', type: 'boolean', default: 'false', description: 'Whether to show first/last arrow buttons.' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'ghost' \| 'light'`, default: `'outline'`, description: 'Visual style variant.' },
  { name: 'shape', type: `'rounded' \| 'square' \| 'circle'`, default: `'rounded'`, description: 'Button shape.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Pagination size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:page', parameters: '(page: number) => void', description: 'Triggers when page changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'prev', parameters: '-', description: 'Previous button content.' },
  { name: 'next', parameters: '-', description: 'Next button content.' },
  { name: 'first', parameters: '-', description: 'First button content.' },
  { name: 'last', parameters: '-', description: 'Last button content.' },
  { name: 'ellipsis', parameters: '-', description: 'Ellipsis content.' },
  { name: 'item', parameters: '{ page: number, active: boolean }', description: 'Custom page item content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'list', type: 'string', description: 'List container class.' },
      { name: 'item', type: 'string', description: 'Page item class.' },
      { name: 'ellipsis', type: 'string', description: 'Ellipsis item class.' },
      { name: 'button', type: 'string', description: 'Navigation button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
