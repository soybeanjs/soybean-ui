# Virtualizer

## Overview

A virtual scrolling component that efficiently renders large lists by only rendering items currently in the viewport.

## Usage

```vue
<script setup lang="ts">
import { SVirtualizer } from '@soybeanjs/ui';

const data = Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i}` }));
</script>

<template>
  <div class="h-[400px] border rounded-md">
    <SVirtualizer :data="data" :item-size="50">
      <template #default="{ item }">
        <div class="h-[50px] flex items-center px-4 border-b">
          {{ item.text }}
        </div>
      </template>
    </SVirtualizer>
  </div>
</template>
```

## Demos

```playground
base
horizontal
dynamic
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'data', type: 'any[]', default: '[]', description: 'Data source.', required: true },
  { name: 'itemSize', type: 'number', default: '-', description: 'Fixed height/width of each item.' },
  { name: 'horizontal', type: 'boolean', default: 'false', description: 'Whether to scroll horizontally.' },
  { name: 'overscan', type: 'number', default: '5', description: 'Number of extra items to render outside viewport.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ item: any, index: number }', description: 'Item rendering slot.' }
]"/>
