# Separator

## Overview

Visually or semantically separates content.

## Usage

```vue
<script setup lang="ts">
import { SSeparator } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <div class="space-y-1">
      <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
      <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
    </div>
    <SSeparator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <SSeparator orientation="vertical" />
      <div>Docs</div>
      <SSeparator orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
</template>
```

## Demos

```playground
orientation
align
border
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: 'Separator orientation.' },
  { name: 'decorative', type: 'boolean', default: 'true', description: 'Whether the separator is purely decorative (aria-hidden).' },
  { name: 'label', type: 'string', default: '-', description: 'Text label displayed in the middle.' },
  { name: 'align', type: `'start' \| 'center' \| 'end'`, default: `'center'`, description: 'Label alignment.' },
  { name: 'border', type: `'solid' \| 'dashed' \| 'dotted'`, default: `'solid'`, description: 'Border style.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>
