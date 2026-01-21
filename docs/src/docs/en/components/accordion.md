# Accordion

## Overview

A vertically stacked set of interactive headings that each reveal a section of content. It supports single or multiple expansion modes and fully customizable styling.

## Usage

```vue
<script setup lang="ts">
import { SAccordion } from '@soybeanjs/ui';

const items = [
  { title: 'Is it accessible?', value: 'item-1', description: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  {
    title: 'Is it styled?',
    value: 'item-2',
    description: "Yes. It comes with default styles that matches the other components' aesthetic."
  },
  {
    title: 'Is it animated?',
    value: 'item-3',
    description: "Yes. It's animated by default, but you can disable it if you prefer."
  }
];
const value = ref('item-1');
</script>

<template>
  <SAccordion v-model="value" :items="items" />
</template>
```

## Demos

```playground
single
always-one
multiple
custom-icon
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name for the root element.' },
  { name: 'v-model', type: 'string | string[]', default: '-', description: 'The controlled value of the item(s) to expand.', required: true },
  { name: 'items', type: 'AccordionOptionData[]', default: '-', description: 'The data array to render items.', required: true },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'The size of the accordion.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether to allow multiple items to be expanded at the same time.' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: 'Whether an expanded item can be collapsed.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names for internal elements.' }
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: 'string | string[]', description: 'Emitted when the expanded state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'title', parameters: 'AccordionSlotProps', description: 'Custom title content.' },
  { name: 'leading', parameters: 'AccordionSlotProps', description: 'Content before the title.' },
  { name: 'content', parameters: 'AccordionSlotProps', description: 'Custom content body.' },
  { name: 'trigger-icon', parameters: 'AccordionSlotProps', description: 'Custom expand/collapse icon.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'AccordionSlotProps',
    description: 'Slot properties exposed to scoped slots.',
    fields: [
      { name: 'item', type: 'AccordionOptionData', description: 'Current item data.' },
      { name: 'modelValue', type: 'string | string[]', description: 'Current active value(s).' },
      { name: 'open', type: 'boolean', description: 'Whether current item is open.' },
    ]
  },
  {
    name: 'AccordionOptionData',
    description: 'Data structure for accordion items.',
    fields: [
      { name: 'value', type: 'string', required: true, description: 'Unique identifier for the item.' },
      { name: 'title', type: 'string', description: 'The title text.' },
      { name: 'description', type: 'string', description: 'The content text.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'disabled', type: 'boolean', description: 'Whether the item is disabled.' },
    ]
  },
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'ClassValue', description: 'Root element class.' },
      { name: 'item', type: 'ClassValue', description: 'Item class.' },
      { name: 'header', type: 'ClassValue', description: 'Header class.' },
      { name: 'trigger', type: 'ClassValue', description: 'Trigger button class.' },
      { name: 'content', type: 'ClassValue', description: 'Content class.' },
      { name: 'triggerIcon', type: 'ClassValue', description: 'Trigger icon class.' },
      { name: 'triggerLeadingIcon', type: 'ClassValue', description: 'Leading icon class.' },
    ]
  }
]" />

<UnionType name="ClassValue" description="Class value type" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
