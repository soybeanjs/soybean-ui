# ToggleGroup

## Overview

A set of two-state buttons that can be toggled on or off as a single or multiple selection group.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToggleGroup v-model="value">
    <SToggleGroupItem value="bold">Bold</SToggleGroupItem>
    <SToggleGroupItem value="italic">Italic</SToggleGroupItem>
    <SToggleGroupItem value="underline">Underline</SToggleGroupItem>
  </SToggleGroup>
</template>
```

## Demos

```playground
basic
multiple
variant
vertical
```

## API

### SToggleGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string | string[]', default: '-', description: 'Controlled selected value(s).' },
  { name: 'defaultValue', type: 'string | string[]', default: '-', description: 'Initial selected value(s).' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether multiple items can be active at the same time.' },
  { name: 'singleClearable', type: 'boolean', default: 'true', description: 'Whether the active item can be cleared in single mode.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the whole group is disabled.' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'Group orientation.' },
  { name: 'rovingFocus', type: 'boolean', default: 'true', description: 'Whether arrow-key roving focus is enabled.' },
  { name: 'loop', type: 'boolean', default: 'true', description: 'Whether roving focus loops.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Item size.' },
  { name: 'variant', type: `'outline' | 'soft' | 'ghost'`, default: `'ghost'`, description: 'Visual style.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### SToggleGroup Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | string[]) => void', description: 'Triggers when selection changes.' }
]"/>

### SToggleGroupItem Props

<DataTable preset="props" :data="[
  { name: 'value', type: 'string | number', default: '-', description: 'Unique item value.', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the item is disabled.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom item class name.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ pressed: boolean; disabled: boolean }', description: 'Toggle item content.', required: true }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'item', type: 'string', description: 'Item class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
