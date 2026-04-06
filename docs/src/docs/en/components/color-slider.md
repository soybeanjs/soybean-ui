# Color Slider

## Overview

A single-channel color slider for hue, alpha, and individual RGB/HSL/HSV/OKLCH channels.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorSlider } from '@soybeanjs/ui';

const color = ref('#ec4899');
</script>

<template>
  <SColorSlider v-model="color" channel="hue" color-space="hsl" />
</template>
```

## Demo

```playground
basic
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'channel', type: 'ColorChannel', default: '-', description: 'The channel controlled by the slider' },
  { name: 'colorSpace', type: '`hsl` | `hsv` | `oklch`', default: '`hsl`', description: 'Working color space for channel math' },
  { name: 'format', type: '`hex` | `rgb` | `hsl` | `oklch`', default: '`hex`', description: 'Serialized output format' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Slider size' },
  { name: 'ui', type: 'Partial<ColorSliderUi>', default: '{}', description: 'Override internal slot classes' },
]"/>
