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

<ComponentApi component="tree" />
