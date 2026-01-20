# Switch

## Overview

A control that allows the user to toggle between checked and not checked.

## Usage

```vue
<script setup lang="ts">
import { SSwitch } from '@soybeanjs/ui';

const checked = ref(false);
</script>

<template>
  <SSwitch v-model="checked" />
</template>
```

## Demos

```playground
base
size
shape
slot
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'checked', type: 'boolean', default: '-', description: 'The controlled checked state.' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'The default checked state.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the switch is disabled.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the switch is required.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Switch size.' },
  { name: 'shape', type: `'rounded' \| 'square' \| 'circle'`, default: `'circle'`, description: 'Switch thumb shape.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:checked', parameters: '(checked: boolean) => void', description: 'Triggers when checked state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'thumb', parameters: '-', description: 'Custom thumb content (e.g. icon).' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'thumb', type: 'string', description: 'Thumb element class.' },
    ]
  }
]"/>
