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

<ComponentApi component="combobox" />
