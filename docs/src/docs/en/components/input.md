# Input

## Overview

Displays a form input field or a component that looks like an input field. It supports standard input attributes, icons, and clearable functionality.

## Usage

```vue
<script setup lang="ts">
import { SInput } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <SInput v-model="value" placeholder="Type something..." />
</template>
```

## Demos

```playground
base
disabled
slot
clearable
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'v-model', type: 'string | number', default: '-', description: 'The input value.', required: true },
  { name: 'type', type: 'string', default: `'text'`, description: 'Input type (e.g., text, password, email).' },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether the input is read-only.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show a clear button when value is present.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'The size of the input.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names for internal elements.' },
  { name: 'inputRef', type: '(el: HTMLInputElement) => void', default: '-', description: 'Function to get the native input element.' }
]"/>

> Note: `SInput` inherits all native `<input>` attributes.

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | number) => void', description: 'Emitted when input value changes.' },
  { name: 'change', parameters: '(event: Event) => void', description: 'Emitted when input value changes (lazy).' },
  { name: 'focus', parameters: '(event: FocusEvent) => void', description: 'Emitted when input gets focus.' },
  { name: 'blur', parameters: '(event: FocusEvent) => void', description: 'Emitted when input loses focus.' },
  { name: 'clear', parameters: '() => void', description: 'Emitted when clear button is clicked.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: 'Content before the input text (e.g., icon).' },
  { name: 'trailing', parameters: '-', description: 'Content after the input text (e.g., icon).' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'input', type: 'string', description: 'Native input element class.' },
      { name: 'wrapper', type: 'string', description: 'Inner wrapper class.' },
      { name: 'leading', type: 'string', description: 'Leading slot container class.' },
      { name: 'trailing', type: 'string', description: 'Trailing slot container class.' },
      { name: 'clearable', type: 'string', description: 'Clear button class.' },
    ]
  }
]"/>
