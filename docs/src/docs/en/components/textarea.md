# Textarea

## Overview

Multi-line text input field. Supports auto-resizing and character count.

## Usage

```vue
<script setup lang="ts">
import { STextarea } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <STextarea v-model="value" placeholder="Type your message here." />
</template>
```

## Demos

```playground
base
autosize
clearable
disabled
counter
footer
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string', default: '-', description: 'The text value.', required: true },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether input is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether input is read-only.' },
  { name: 'autosize', type: 'boolean | { minRows?: number, maxRows?: number }', default: 'false', description: 'Whether textarea has an adaptive height.' },
  { name: 'resize', type: `'none' \| 'both' \| 'horizontal' \| 'vertical'`, default: `'vertical'`, description: 'CSS resize property (ignored if autosize is true).' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show clear button.' },
  { name: 'showCounter', type: 'boolean', default: 'false', description: 'Whether to show character count.' },
  { name: 'maxlength', type: 'number', default: '-', description: 'Maximum number of characters.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Textarea size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggers when value changes.' },
  { name: 'focus', parameters: '(event: FocusEvent) => void', description: 'Triggers on focus.' },
  { name: 'blur', parameters: '(event: FocusEvent) => void', description: 'Triggers on blur.' },
  { name: 'input', parameters: '(event: Event) => void', description: 'Triggers on input.' },
  { name: 'change', parameters: '(event: Event) => void', description: 'Triggers on change.' },
  { name: 'clear', parameters: '() => void', description: 'Triggers on clear.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'footer', parameters: '-', description: 'Content below the textarea.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'textarea', type: 'string', description: 'Textarea element class.' },
      { name: 'clearable', type: 'string', description: 'Clear button class.' },
      { name: 'count', type: 'string', description: 'Character count class.' },
    ]
  }
]"/>
