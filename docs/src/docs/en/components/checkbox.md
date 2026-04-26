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

> `SCheckboxGroup` and `SCheckboxCardGroup` now delegate list iteration and default checkbox/card composition to headless `CheckboxGroupCompact` and `CheckboxCardGroupCompact`. For unstyled, data-driven usage, import them from `@soybeanjs/headless/checkbox`.

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
  { name: 'modelValue', type: `boolean | 'indeterminate'`, default: '-', description: 'The checked state.' },
  { name: 'defaultValue', type: 'boolean', default: '-', description: 'The default checked state.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is disabled.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the checkbox is required.' },
  { name: 'name', type: 'string', default: '-', description: 'The name of the checkbox.' },
  { name: 'value', type: 'string', default: 'on', description: 'The value given as data when submitted with a name.' },
  { name: 'id', type: 'string', default: '-', description: 'The unique id of the checkbox.' },
  { name: 'label', type: 'string', default: '-', description: 'Label text.' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: 'Checkbox color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Checkbox size.' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Checkbox shape.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Additional root class names.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### SCheckbox Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: `(value: boolean | 'indeterminate') => void`, description: 'Triggers when the checked state changes.' }
]"/>

### SCheckboxGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'any[]', default: '-', description: 'The value of the checkbox group.' },
  { name: 'items', type: 'CheckboxGroupOptionData[]', default: '-', description: 'The options to render.' },
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: 'The checkbox group layout direction.' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Checkbox color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Checkbox size.' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Checkbox shape.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Additional group root class names.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### SCheckboxCard Props

<DataTable preset="props" :data="[
  { name: 'icon', type: 'string', default: '-', description: 'Icon name (Iconify).' },
  { name: 'description', type: 'string', default: '-', description: 'Description text.' },
  { name: 'modelValue', type: 'boolean', default: '-', description: 'The checked state.' },
  { name: 'label', type: 'string', default: '-', description: 'Label text.' }
]"/>

### SCheckboxCardGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'any[]', default: '-', description: 'The selected checkbox card values.' },
  { name: 'items', type: 'CheckboxCardGroupOptionData[]', default: '-', description: 'The checkbox card options to render.' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Checkbox card color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Checkbox card size.' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Checkbox control shape.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Additional group root class names.' },
  { name: 'ui', type: 'CheckboxCardUi', default: '{}', description: 'Custom class names.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'groupRoot', type: 'string', description: 'Group root element class.' },
      { name: 'control', type: 'string', description: 'Checkbox control (box) class.' },
      { name: 'indicator', type: 'string', description: 'Check icon class.' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>

<TypeTable :data="[
  {
    name: 'CheckboxCardUi',
    description: 'Custom styling classes for checkbox cards.',
    fields: [
      { name: 'groupRoot', type: 'string', description: 'Group root element class.' },
      { name: 'root', type: 'string', description: 'Card root element class.' },
      { name: 'content', type: 'string', description: 'Card content container class.' },
      { name: 'textContent', type: 'string', description: 'Text content container class.' },
      { name: 'icon', type: 'string', description: 'Card icon class.' },
      { name: 'description', type: 'string', description: 'Description text class.' },
      { name: 'control', type: 'string', description: 'Checkbox control class.' },
      { name: 'indicator', type: 'string', description: 'Check icon class.' },
      { name: 'label', type: 'string', description: 'Label text class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
