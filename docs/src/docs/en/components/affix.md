# Affix

## Overview

Affix keeps content pinned to the top or bottom edge of the viewport or a custom scroll container while the target area is scrolling.

## Usage

```vue
<script setup lang="ts">
import { SAffix, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SAffix :offset-top="24">
    <SButton>Back to top</SButton>
  </SAffix>
</template>
```

## Demos

```playground
basic
target
offset-bottom
custom-styling
```

## Affix API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the affixed container' },
  { name: 'offsetTop', type: 'number', default: '0', description: 'Offset from the top edge before the content becomes affixed' },
  { name: 'offsetBottom', type: 'number', default: '-', description: 'Offset from the bottom edge before the content becomes affixed' },
  { name: 'target', type: 'AffixTarget', default: 'window', description: 'Function that returns the scroll container to observe' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'change', parameters: '(affixed: boolean) => void', description: 'Triggered when the affixed state changes' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ affixed: boolean }', description: 'Affixed content', required: true },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'AffixTarget',
    description: 'Factory used to resolve the scroll container',
    fields: [
      { name: '()', type: '() => Window | HTMLElement | null', description: 'Returns the target container' },
    ],
  }
]"/>
