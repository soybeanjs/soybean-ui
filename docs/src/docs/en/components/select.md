# Select

## Overview

Displays a list of options for the user to pick from—triggered by a button.

## Usage

```vue
<script setup lang="ts">
import { SSelect } from '@soybeanjs/ui';

const value = ref('apple');
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];
</script>

<template>
  <SSelect v-model="value" :items="items" placeholder="Select a fruit..." />
</template>
```

## Demos

```playground
base
default-value
disabled
separator
group
multiple
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'SelectOptionData[]', default: '-', description: 'Options data.', required: true },
  { name: 'modelValue', type: 'string | number', default: '-', description: 'Selected value.' },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether to allow multiple selection.' },
  { name: 'showArrow', type: 'boolean', default: 'false', description: 'Whether to show the arrow.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Select size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | number) => void', description: 'Triggers when selection changes.' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'Custom trigger element.' },
  { name: 'item', parameters: '{ item: SelectOptionData }', description: 'Custom item rendering.' },
  { name: 'value', parameters: '{ value: string | number }', description: 'Custom value display.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'SelectOptionData',
    description: 'Option data structure.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string | number', description: 'Unique value.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'disabled', type: 'boolean', description: 'Whether item is disabled.' },
      { name: 'separator', type: 'boolean', description: 'Show separator before this item.' },
    ]
  },
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'trigger', type: 'string', description: 'Trigger button class.' },
      { name: 'content', type: 'string', description: 'Dropdown content class.' },
      { name: 'item', type: 'string', description: 'Option item class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
