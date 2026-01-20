# AspectRatio

## Overview

Displays content within a desired ratio.

## Usage

```vue
<script setup lang="ts">
import { SAspectRatio } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-[300px]">
    <SAspectRatio :ratio="16 / 9">
      <img src="..." alt="Image" class="object-cover w-full h-full rounded-md" />
    </SAspectRatio>
  </div>
</template>
```

## Demos

```playground
base
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'ratio', type: 'number', default: '1', description: 'The desired aspect ratio (width / height).' },
  { name: 'as', type: 'string | Component', default: `'div'`, description: 'The rendered element.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into child element.' }
]"/>
