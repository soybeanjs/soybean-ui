# InputNumber

## Overview

A text input field that only accepts numeric input. Supports increment/decrement controls.

## Usage

```vue
<script setup lang="ts">
import { SInputNumber } from '@soybeanjs/ui';

const value = ref(0);
</script>

<template>
  <SInputNumber v-model="value" :min="0" :max="100" />
</template>
```

## Demos

```playground
base
center
slot
clearable
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'number', default: '-', description: 'The numeric value.', required: true },
  { name: 'min', type: 'number', default: '-', description: 'Minimum value.' },
  { name: 'max', type: 'number', default: '-', description: 'Maximum value.' },
  { name: 'step', type: 'number', default: '1', description: 'Step value.' },
  { name: 'center', type: 'boolean', default: 'false', description: 'Center align text.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show clear button.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether input is disabled.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Input size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: number) => void', description: 'Triggers when value changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'increment', parameters: '-', description: 'Custom increment button.' },
  { name: 'decrement', parameters: '-', description: 'Custom decrement button.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'input', type: 'string', description: 'Input element class.' },
      { name: 'controls', type: 'string', description: 'Controls wrapper class.' },
      { name: 'increment', type: 'string', description: 'Increment button class.' },
      { name: 'decrement', type: 'string', description: 'Decrement button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
