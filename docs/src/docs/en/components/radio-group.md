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

<ComponentApi component="radio-group" />
