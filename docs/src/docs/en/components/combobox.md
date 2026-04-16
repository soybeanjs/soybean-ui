# Combobox

## Overview

A combobox component for searching and selecting values from an option list, with explicit anchor composition, clearable input support, and more complete popup and filtering behavior.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SCombobox } from '@soybeanjs/ui';

const value = ref<string>();
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];
</script>

<template>
  <SCombobox v-model="value" :items="items" placeholder="Select a fruit" />
</template>
```

## Demos

```playground
basic
clearable
disabled
group
multiple
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'ComboboxOptionData[]', default: '-', description: 'Option data.', required: true },
  { name: 'modelValue', type: 'string | string[]', default: '-', description: 'Current selected value.' },
  { name: 'placeholder', type: 'string', default: '-', description: 'Trigger placeholder text.' },
  { name: 'searchPlaceholder', type: 'string', default: '-', description: 'Search input placeholder text.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show the clear button.' },
  { name: 'clearLabel', type: 'string', default: `'Clear input'`, description: 'Accessible label for the clear button.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether multiple selection is allowed.' },
  { name: 'resetModelValueOnClear', type: 'boolean', default: 'false', description: 'Whether clearing should also reset the selected value.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the combobox is disabled.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Component size.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom trigger class name.' },
  { name: 'anchorProps', type: 'ComboboxAnchorProps', default: '-', description: 'Props forwarded to the anchor wrapper.' },
  { name: 'cancelProps', type: 'ComboboxCancelProps', default: '-', description: 'Props forwarded to the clear button.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names for internal elements.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | string[]) => void', description: 'Triggered when the selection changes.' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggered when the popup opens or closes.' },
  { name: 'select', parameters: '(event: SelectEvent<string>) => void', description: 'Triggered when an option is selected.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger-leading', parameters: '-', description: 'Content before the trigger text.' },
  { name: 'trigger-value', parameters: '{ modelValue: string | string[] | undefined; selectedLabels: string[]; slotText: string | undefined }', description: 'Custom trigger text content.' },
  { name: 'trigger-icon', parameters: '-', description: 'Trigger trailing icon.' },
  { name: 'input-leading', parameters: '{ clear: () => void }', description: 'Content before the search input.' },
  { name: 'input-trailing', parameters: '{ clear: () => void }', description: 'Content after the search input.' },
  { name: 'empty', parameters: '-', description: 'Content shown when no results are available.' },
  { name: 'group-label', parameters: '{ item: ComboboxGroupOptionData }', description: 'Custom group label content.' },
  { name: 'item-leading', parameters: '{ item: ComboboxSingleOptionData }', description: 'Content before each option label.' },
  { name: 'item-text', parameters: '{ item: ComboboxSingleOptionData }', description: 'Custom option label content.' },
  { name: 'item-trailing', parameters: '{ item: ComboboxSingleOptionData }', description: 'Content after each option label.' },
  { name: 'item-indicator', parameters: '{ item: ComboboxSingleOptionData }', description: 'Selected indicator content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'ComboboxSingleOptionData',
    description: 'Normal option data.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string', description: 'Unique value.' },
      { name: 'icon', type: 'IconValue', description: 'Optional icon.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the option is disabled.' },
      { name: 'separator', type: 'boolean', description: 'Whether to show a separator before the option.' }
    ]
  },
  {
    name: 'ComboboxGroupOptionData',
    description: 'Grouped option data.',
    fields: [
      { name: 'label', type: 'string', description: 'Group label.' },
      { name: 'items', type: 'ComboboxSingleOptionData[]', description: 'Options inside the group.' },
      { name: 'separator', type: 'boolean', description: 'Whether to show a separator before the group.' }
    ]
  },
  {
    name: 'Ui',
    description: 'Combobox internal style map.',
    fields: [
      { name: 'trigger', type: 'string', description: 'Trigger class name.' },
      { name: 'triggerIcon', type: 'string', description: 'Trigger icon class name.' },
      { name: 'anchor', type: 'string', description: 'Anchor wrapper class name.' },
      { name: 'cancel', type: 'string', description: 'Clear button class name.' },
      { name: 'positioner', type: 'string', description: 'Positioner class name.' },
      { name: 'popup', type: 'string', description: 'Popup container class name.' },
      { name: 'arrow', type: 'string', description: 'Popup arrow class name.' },
      { name: 'viewport', type: 'string', description: 'Options list class name.' },
      { name: 'inputRoot', type: 'string', description: 'Input root class name.' },
      { name: 'inputControl', type: 'string', description: 'Input control class name.' },
      { name: 'group', type: 'string', description: 'Group container class name.' },
      { name: 'groupLabel', type: 'string', description: 'Group label class name.' },
      { name: 'item', type: 'string', description: 'Option class name.' },
      { name: 'itemIndicator', type: 'string', description: 'Selected indicator class name.' },
      { name: 'empty', type: 'string', description: 'Empty state class name.' },
      { name: 'separator', type: 'string', description: 'Separator class name.' },
      { name: 'virtualizer', type: 'string', description: 'Virtualized list container class name.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
