# Color Swatch Picker

## Overview

Choose a color quickly from a preset palette, useful for theme panels and suggested color selections.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorSwatchPicker } from '@soybeanjs/ui';

const value = ref('#7c3aed');
const colors = ['#7c3aed', '#06b6d4', '#10b981'];
</script>

<template>
  <SColorSwatchPicker v-model="value" :colors="colors" />
</template>
```

## Demo

```playground
basic
shape
```
