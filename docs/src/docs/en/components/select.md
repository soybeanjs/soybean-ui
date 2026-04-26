# Select

## Overview

Displays a list of options for the user to pick from—triggered by a button.

## Usage

```vue
<script setup lang="ts">
import { SSelect } from '@soybeanjs/ui';

const value = ref('apple');
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];
</script>

<template>
  <SSelect v-model="value" :items="items" placeholder="Select a fruit..." />
</template>
```

> `SSelect` now delegates option aggregation and default item composition to headless `SelectCompact`. For unstyled, data-driven composition, import `SelectCompact` from `@soybeanjs/headless/select`.

## Demos

```playground
base
default-value
disabled
separator
group
multiple
```

## API

<ComponentApi component="select" />
