# Autocomplete

## Overview

Autocomplete filters suggestion items from text input and quickly fills the input with a selected result.

## Usage

```vue
<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
];
</script>

<template>
  <SAutocomplete :items="items" placeholder="Search a fruit" />
</template>
```

## Demos

```playground
basic
grouped
open-on-focus
disabled
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root element.' },
  { name: 'modelValue', type: 'string', default: '-', description: 'Current input value.' },
  { name: 'defaultValue', type: 'string', default: '-', description: 'Initial input value.' },
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled popup open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial popup open state.' },
  { name: 'items', type: 'AutocompleteOptionData[]', default: '-', description: 'Suggestion item data.', required: true },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text for the input.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show the clear button.' },
  { name: 'openOnFocus', type: 'boolean', default: 'false', description: 'Whether to open suggestions on input focus.' },
  { name: 'openOnClick', type: 'boolean', default: 'false', description: 'Whether to open suggestions on input click.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the component is disabled.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Component size.' },
  { name: 'emptyLabel', type: 'string', default: `'No results found.'`, description: 'Text shown when there are no matching options.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names for internal elements.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggered when the input value changes.' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggered when the popup open state changes.' },
  { name: 'select', parameters: '(item: AutocompleteSingleOptionData) => void', description: 'Triggered when a suggestion item is selected.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'input-leading', parameters: '-', description: 'Content before the input.' },
  { name: 'input-trailing', parameters: '-', description: 'Content after the input.' },
  { name: 'trigger-icon', parameters: '-', description: 'Content for the trigger icon.' },
  { name: 'empty', parameters: '-', description: 'Empty state content.' },
  { name: 'group-label', parameters: '{ item: AutocompleteGroupOptionData }', description: 'Group label content.' },
  { name: 'item-leading', parameters: '{ item: AutocompleteSingleOptionData }', description: 'Leading content of an option item.' },
  { name: 'item-label', parameters: '{ item: AutocompleteSingleOptionData }', description: 'Text content of an option item.' },
  { name: 'item-trailing', parameters: '{ item: AutocompleteSingleOptionData }', description: 'Trailing content of an option item.' },
  { name: 'item-indicator', parameters: '{ item: AutocompleteSingleOptionData }', description: 'Selected indicator content of an option item.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'AutocompleteSingleOptionData',
    description: 'Single suggestion item data.',
    fields: [
      { name: 'value', type: 'string', description: 'Value written into the input.' },
      { name: 'label', type: 'string', description: 'Text rendered in the option list.' },
      { name: 'icon', type: 'string', description: 'Leading icon.' },
      { name: 'keywords', type: 'string[]', description: 'Additional search keywords.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the suggestion item is disabled.' },
      { name: 'separator', type: 'boolean', description: 'Whether to show a separator after the item.' }
    ]
  },
  {
    name: 'Ui',
    description: 'Custom class name mapping.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'anchor', type: 'string', description: 'Input area container class.' },
      { name: 'inputRoot', type: 'string', description: 'Input root container class.' },
      { name: 'inputControl', type: 'string', description: 'Input control class.' },
      { name: 'trigger', type: 'string', description: 'Trigger button class.' },
      { name: 'content', type: 'string', description: 'Popup content container class.' },
      { name: 'viewport', type: 'string', description: 'Suggestion list container class.' },
      { name: 'group', type: 'string', description: 'Group container class.' },
      { name: 'groupLabel', type: 'string', description: 'Group label class.' },
      { name: 'item', type: 'string', description: 'Suggestion item class.' },
      { name: 'itemIndicator', type: 'string', description: 'Selected indicator class.' },
      { name: 'separator', type: 'string', description: 'Separator class.' },
      { name: 'inputIcon', type: 'string', description: 'Leading input icon class.' },
      { name: 'inputClearable', type: 'string', description: 'Clear button class.' },
      { name: 'triggerIcon', type: 'string', description: 'Trigger icon class.' },
      { name: 'itemText', type: 'string', description: 'Option item text class.' },
      { name: 'itemIcon', type: 'string', description: 'Option item icon class.' },
      { name: 'empty', type: 'string', description: 'Empty state class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
