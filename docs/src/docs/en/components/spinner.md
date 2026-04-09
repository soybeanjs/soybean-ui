# Spinner

## Overview

`SSpinner` is a lightweight loading indicator built on top of `SIcon`. It defaults to the Iconify `svg-spinners`
collection and is suitable for inline loading states.

## Usage

```vue
<script setup lang="ts">
import { SSpinner } from '@soybeanjs/ui';
</script>

<template>
  <SSpinner />
</template>
```

## Demos

```playground
basic
size
icon
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name' },
  {
    name: 'icon',
    type: '`svg-spinners:${string}`',
    default: '`svg-spinners:270-ring`',
    description: 'Spinner icon name from the Iconify `svg-spinners` collection'
  },
  { name: 'width', type: 'string | number', default: '`1.25em`', description: 'Spinner width' },
  { name: 'height', type: 'string | number', default: '`1.25em`', description: 'Spinner height' },
  { name: 'color', type: 'string', default: '-', description: 'Spinner color' },
  { name: 'rotate', type: 'number | string', default: '-', description: 'Additional rotation applied to the icon' },
  { name: 'flip', type: 'string', default: '-', description: 'Flip the icon horizontally or vertically' }
]"/>

> Inherits all other props from `SIcon`.

### Slots

<DataTable preset="slots" :data="[]"/>

## Types

<UnionType name="SpinnerIcon" type="`svg-spinners:${string}`" />
