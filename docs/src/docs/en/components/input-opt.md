# InputOpt

## Overview

A slotted one-time passcode input component for verification codes and short confirmation tokens.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SInputOpt, SInputOptGroup, SInputOptSlot } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <SInputOpt v-model="value" :maxlength="6">
    <SInputOptGroup>
      <SInputOptSlot v-for="index in 6" :key="index" :index="index - 1" />
    </SInputOptGroup>
  </SInputOpt>
</template>
```

## Demo

```playground
basic
controlled
disabled
separator
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string', default: '-', description: 'Controlled otp value.' },
  { name: 'defaultValue', type: 'string', default: '`empty string`', description: 'Default value in uncontrolled mode.' },
  { name: 'maxlength', type: 'number', default: '-', description: 'Number of visible otp slots.', required: true },
  { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder characters mapped to each empty slot.' },
  { name: 'pattern', type: 'string | RegExp', default: '-', description: 'Pattern used to validate the full value.' },
  { name: 'textAlign', type: '`left` | `center` | `right`', default: '`left`', description: 'Text alignment used by the hidden input layer.' },
  { name: 'inputmode', type: 'InputHTMLAttributes[`inputmode`]', default: '`numeric`', description: 'Virtual keyboard mode on mobile devices.' },
  { name: 'autocomplete', type: 'string', default: '`one-time-code`', description: 'Autocomplete hint for the browser.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether the input is read-only.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the field is required.' },
  { name: 'name', type: 'string', default: '-', description: 'Form field name used for submission.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root element.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for the root and hidden input layer.' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggered when the value changes.' },
  { name: 'complete', parameters: '(value: string) => void', description: 'Triggered when the input reaches maxlength.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ slots, isFocused, isHovering }', description: 'Custom otp slot content.', required: true },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class map for InputOpt.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'input', type: 'string', description: 'Hidden input layer class.' },
    ],
  },
  {
    name: 'InputOptSlotData',
    description: 'Render state for a single slot.',
    fields: [
      { name: 'char', type: 'string | null', description: 'Current character rendered in the slot.' },
      { name: 'placeholderChar', type: 'string | null', description: 'Placeholder character rendered for an empty slot.' },
      { name: 'isActive', type: 'boolean', description: 'Whether the slot is currently active.' },
      { name: 'hasFakeCaret', type: 'boolean', description: 'Whether the slot shows the fake caret.' },
    ],
  }
]"/>
