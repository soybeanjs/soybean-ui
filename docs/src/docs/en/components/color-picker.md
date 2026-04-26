# Color Picker

## Overview

A composite color picker that combines a color area, hue/alpha sliders, formatted inputs, and preset swatches, with full `oklch` editing and output support.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorPicker } from '@soybeanjs/ui';

const color = ref('oklch(62% 0.22 312)');
</script>

<template>
  <SColorPicker v-model="color" color-space="oklch" format="oklch" />
</template>
```

## Demo

```playground
basic
oklch
```

## API

<ComponentApi component="color-picker" />
