# Tabs

## Overview

A set of layered sections of content—known as tab panels—that are displayed one at a time.

## Usage

```vue
<script setup lang="ts">
import { STabs } from '@soybeanjs/ui';

const value = ref('account');
const items = [
  { label: 'Account', value: 'account' },
  { label: 'Password', value: 'password' }
];
</script>

<template>
  <STabs v-model="value" :items="items">
    <template #content="{ value }">
      <div v-if="value === 'account'">Make changes to your account here.</div>
      <div v-else-if="value === 'password'">Change your password here.</div>
    </template>
  </STabs>
</template>
```

## Demos

```playground
horizontal
vertical
fill
custom
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'TabsOptionData[]', default: '-', description: 'Tabs data.', required: true },
  { name: 'modelValue', type: 'string', default: '-', description: 'Selected tab value.' },
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: 'Tabs orientation.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Tabs size.' },
  { name: 'fill', type: `'solid' \| 'outline' \| 'ghost'`, default: `'ghost'`, description: 'Fill style.' },
  { name: 'enableIndicator', type: 'boolean', default: 'true', description: 'Whether to show the active indicator.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggers when selected tab changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'content', parameters: '{ value: string }', description: 'Tab panel content.' },
  { name: 'trigger', parameters: '{ item: TabsOptionData }', description: 'Custom trigger content.' },
  { name: 'indicator', parameters: '-', description: 'Custom indicator content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'TabsOptionData',
    description: 'Data structure for tabs.',
    fields: [
      { name: 'label', type: 'string', description: 'Tab label.' },
      { name: 'value', type: 'string', description: 'Unique value.' },
      { name: 'disabled', type: 'boolean', description: 'Whether tab is disabled.' },
    ]
  },
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'list', type: 'string', description: 'Tab list container class.' },
      { name: 'trigger', type: 'string', description: 'Tab trigger class.' },
      { name: 'indicator', type: 'string', description: 'Active indicator class.' },
      { name: 'content', type: 'string', description: 'Tab content container class.' },
    ]
  }
]"/>
