# Checkbox

## Overview

A control that allows the user to select one or more items from a set.

## Usage

```vue
<script setup lang="ts">
import { SCheckbox } from '@soybeanjs/ui';

const checked = ref(false);
</script>

<template>
  <SCheckbox v-model="checked" label="Accept terms" />
</template>
```

## Demos

```playground
single
color
size
shape
icon
group
card
card-group
```

## API

### SCheckbox Props

<DataTable preset="props" :data="[
{ name: 'checked', type: 'boolean | "indeterminate"', default: '-', description: 'The checked state.' },
{ name: 'defaultChecked', type: 'boolean', default: '-', description: 'The default checked state.' },
{ name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is disabled.' },
{ name: 'required', type: 'boolean', default: 'false', description: 'Whether the checkbox is required.' },
{ name: 'name', type: 'string', default: '-', description: 'The name of the checkbox.' },
{ name: 'value', type: 'string', default: 'on', description: 'The value given as data when submitted with a name.' },
{ name: 'id', type: 'string', default: '-', description: 'The unique id of the checkbox.' },
{ name: 'label', type: 'string', default: '-', description: 'Label text.' },
{ name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: 'Checkbox color.' },
{ name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Checkbox size.' },
{ name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Checkbox shape.' },
{ name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### SCheckbox Emits

<DataTable preset="emits" :data="[
  { name: 'update:checked', parameters: '(checked: boolean) => void', description: 'Triggers when the checked state changes.' }
]"/>

### SCheckboxGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'any[]', default: '-', description: 'The value of the checkbox group.' },
  { name: 'items', type: 'CheckboxGroupOptionData[]', default: '-', description: 'The options to render.' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Checkbox color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Checkbox size.' }
]"/>

### SCheckboxCard Props

<DataTable preset="props" :data="[
  { name: 'icon', type: 'string', default: '-', description: 'Icon name (Iconify).' },
  { name: 'description', type: 'string', default: '-', description: 'Description text.' },
  { name: 'checked', type: 'boolean', default: '-', description: 'The checked state.' },
  { name: 'label', type: 'string', default: '-', description: 'Label text.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'control', type: 'string', description: 'Checkbox control (box) class.' },
      { name: 'indicator', type: 'string', description: 'Check icon class.' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>
