# RadioGroup

## Overview

A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.

## Usage

```vue
<script setup lang="ts">
import { SRadioGroup } from '@soybeanjs/ui';

const value = ref('option-1');
const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];
</script>

<template>
  <SRadioGroup v-model="value" :items="items" />
</template>
```

> `SRadioGroup` now delegates item iteration and default radio composition to headless `RadioGroupCompact`. For unstyled, data-driven usage, import `RadioGroupCompact` from `@soybeanjs/headless/radio-group`.

## Demos

```playground
color
size
variant
card
```

## API

### SRadioGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string', default: '-', description: 'Selected value.', required: true },
  { name: 'items', type: 'RadioGroupOptionData[]', default: '-', description: 'Options data.', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the group is disabled.' },
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: '-', description: 'Group orientation.' },
  { name: 'variant', type: 'RadioGroupVariant', default: `'default'`, description: 'Visual variant.' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Theme color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Size.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Additional root class names.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### SRadioGroup Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggers when selection changes.' }
]"/>

### SRadioCardGroup Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'RadioCardGroupOptionData[]', default: '-', description: 'Card options data (with icon/description).', required: true }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'RadioGroupOptionData',
    description: 'Option data structure.',
    fields: [
      { name: 'label', type: 'string', description: 'Label text.' },
      { name: 'value', type: 'string', description: 'Unique value.' },
      { name: 'disabled', type: 'boolean', description: 'Whether option is disabled.' },
    ]
  },
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'item', type: 'string', description: 'Item wrapper class.' },
      { name: 'control', type: 'string', description: 'Radio control class.' },
      { name: 'indicator', type: 'string', description: 'Selected indicator class.' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
