# Toggle

## Overview

A two-state button that toggles between pressed and unpressed.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToggle } from '@soybeanjs/ui';

const pressed = ref(false);
</script>

<template>
  <SToggle v-model="pressed">Bold</SToggle>
</template>
```

## Demos

```playground
basic
outline
size
disabled
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name.' },
  { name: 'variant', type: 'ToggleVariant', default: `'default'`, description: 'Visual style variant.' },
  { name: 'size', type: 'ToggleSize', default: `'md'`, description: 'Toggle size.' },
  { name: 'modelValue', type: 'boolean', default: '-', description: 'Controlled pressed state.' },
  { name: 'defaultValue', type: 'boolean', default: 'false', description: 'Initial pressed state for uncontrolled usage.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the toggle is disabled.' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: 'Rendered element/component.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props/behavior into the child element.' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: boolean) => void', description: 'Triggered when the pressed state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue: boolean; pressed: boolean; state: ToggleState; disabled: boolean }', description: 'Toggle content.', required: true }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'ToggleState',
    description: 'Pressed state reflected by `data-state`.',
    fields: [
      { name: 'on', type: 'string', description: 'Pressed state.' },
      { name: 'off', type: 'string', description: 'Unpressed state.' },
    ]
  }
]"/>

<UnionType name="ClassValue" description="Class value type" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="ToggleVariant" description="Toggle variant" type="'default' | 'outline'" />

<UnionType name="ToggleSize" description="Toggle size" type="'sm' | 'md' | 'lg'" />
