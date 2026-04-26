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

<ComponentApi component="accordion" />
