# Password

## Overview

A password input field with a toggle button to show/hide the password.

## Usage

```vue
<script setup lang="ts">
import { SPassword } from '@soybeanjs/ui';

const password = ref('');
</script>

<template>
  <SPassword v-model="password" placeholder="Enter password" />
</template>
```

## Demos

```playground
base
disabled
clearable
icon
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string', default: '-', description: 'The password value.', required: true },
  { name: 'visible', type: 'boolean', default: 'false', description: 'Whether password is visible.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show clear button.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether input is disabled.' },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Input size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggers when value changes.' },
  { name: 'update:visible', parameters: '(visible: boolean) => void', description: 'Triggers when visibility toggles.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: 'Content before input.' },
  { name: 'visible-icon', parameters: '{ visible: boolean }', description: 'Custom visibility toggle icon.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes (inherits from Input Ui).',
    fields: [
      { name: 'visible', type: 'string', description: 'Visibility toggle button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
