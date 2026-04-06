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

### Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string | ColorValue', default: '-', description: 'Controlled color value' },
  { name: 'defaultValue', type: 'string | ColorValue', default: '`#7f007f`', description: 'Initial uncontrolled value' },
  { name: 'colorSpace', type: '`hsl` | `hsv` | `oklch`', default: '`hsl`', description: 'Working color space used by the picker internals' },
  { name: 'format', type: '`hex` | `rgb` | `hsl` | `oklch`', default: '`hex`', description: 'Output format for v-model and the main field' },
  { name: 'swatches', type: 'string[]', default: `['#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#3b82f6','#8b5cf6']`, description: 'Preset swatch list' },
  { name: 'showAlpha', type: 'boolean', default: 'true', description: 'Whether to show the alpha slider' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Overall component size' },
  { name: 'ui', type: 'Partial<ColorPickerUi>', default: '{}', description: 'Override layout slot classes' },
]"/>
