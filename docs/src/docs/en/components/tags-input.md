# Tags Input

## Overview

A composable multi-value input for adding, displaying, and removing tags, with support for object values, delimiter-based creation, and keyboard navigation.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  STagsInput,
  STagsInputInput,
  STagsInputItem,
  STagsInputItemDelete,
  STagsInputItemText
} from '@soybeanjs/ui';

const tags = ref(['Vue', 'TypeScript']);
</script>

<template>
  <STagsInput v-model="tags">
    <template #default="{ modelValue }">
      <STagsInputItem v-for="tag in modelValue" :key="tag" :value="tag">
        <STagsInputItemText />
        <STagsInputItemDelete />
      </STagsInputItem>
      <STagsInputInput placeholder="Add a tag" aria-label="Add a tag" />
    </template>
  </STagsInput>
</template>
```

## Demo

```playground
basic
disabled
object-value
clear
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root container.' },
  { name: 'modelValue', type: 'T[]', default: '-', description: 'Controlled tag values.' },
  { name: 'defaultValue', type: 'T[]', default: '[]', description: 'Uncontrolled default tag values.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Component size.' },
  { name: 'delimiter', type: 'string | RegExp', default: '`,`', description: 'Delimiter used to create new tags.' },
  { name: 'duplicate', type: 'boolean', default: 'false', description: 'Whether duplicate tags are allowed.' },
  { name: 'max', type: 'number', default: '0', description: 'Maximum number of tags. Use 0 for no limit.' },
  { name: 'addOnPaste', type: 'boolean', default: 'false', description: 'Whether pasted text should be split and added as tags.' },
  { name: 'addOnTab', type: 'boolean', default: 'false', description: 'Whether pressing Tab should add the current input value as a tag.' },
  { name: 'addOnBlur', type: 'boolean', default: 'false', description: 'Whether blurring the input should add the current input value as a tag.' },
  { name: 'convertValue', type: '(value: string) => T', default: '-', description: 'Converts the raw input string to the desired value. Required for object values.' },
  { name: 'displayValue', type: '(value: T) => string', default: '-', description: 'Converts a tag value to display text.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the whole component is disabled.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for internal slots.' }
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: T[]) => void', description: 'Emitted when the tag values change.' },
  { name: 'addTag', parameters: '(value: T) => void', description: 'Emitted when a tag is added successfully.' },
  { name: 'removeTag', parameters: '(value: T) => void', description: 'Emitted when a tag is removed.' },
  { name: 'invalid', parameters: '(value: T) => void', description: 'Emitted when a duplicate value or max-limit violation occurs.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue: T[] }', description: 'Render tag items, the input, and optional clear action.', required: true }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class mapping.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'item', type: 'string', description: 'Tag item class.' },
      { name: 'itemText', type: 'string', description: 'Tag text class.' },
      { name: 'itemDelete', type: 'string', description: 'Delete button class.' },
      { name: 'input', type: 'string', description: 'Input class.' },
      { name: 'clear', type: 'string', description: 'Clear action class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
