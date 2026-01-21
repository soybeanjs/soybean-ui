# Segment

## Overview

A linear set of two or more segments, each of which functions as a mutually exclusive button.

## Usage

```vue
<script setup lang="ts">
import { SSegment } from '@soybeanjs/ui';

const value = ref('daily');
const items = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
];
</script>

<template>
  <SSegment v-model="value" :items="items" />
</template>
```

## Demos

```playground
base
vertical
shape
icon
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'SegmentOptionData[]', default: '-', description: 'Segment items data.', required: true },
  { name: 'modelValue', type: 'string | number', default: '-', description: 'Selected value.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Segment size.' },
  { name: 'shape', type: `'rounded' \| 'square' \| 'circle'`, default: `'rounded'`, description: 'Segment shape.' },
  { name: 'fill', type: `'solid' \| 'outline' \| 'ghost'`, default: `'solid'`, description: 'Fill style.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | number) => void', description: 'Triggers when selection changes.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'SegmentOptionData',
    description: 'Data structure for segment items.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string | number', description: 'Unique value.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the item is disabled.' },
    ]
  },
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'list', type: 'string', description: 'List container class.' },
      { name: 'trigger', type: 'string', description: 'Segment button class.' },
      { name: 'indicator', type: 'string', description: 'Selection indicator class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
