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

> `SSegment` now delegates item iteration and indicator composition to headless `SegmentCompact`. For unstyled, data-driven usage, import `SegmentCompact` from `@soybeanjs/headless/tabs`.

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
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: 'Segment orientation.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Segment size.' },
  { name: 'shape', type: `'square' \| 'rounded'`, default: `'square'`, description: 'Segment shape.' },
  { name: 'fill', type: `'full' \| 'auto'`, default: `'auto'`, description: 'Segment fill behavior.' },
  { name: 'enableIndicator', type: 'boolean', default: 'true', description: 'Whether to show the active indicator.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Additional root class names.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | number) => void', description: 'Triggers when selection changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'item', parameters: '{ value: string \| number; label: string; disabled?: boolean; active: boolean }', description: 'Custom segment trigger content.' }
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
      { name: 'indicatorContent', type: 'string', description: 'Selection indicator content class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
