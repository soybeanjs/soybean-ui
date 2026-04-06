# Color Area

## Overview

A two-dimensional color editor for saturation/lightness, saturation/brightness, or OKLCH chroma/lightness selection.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorArea } from '@soybeanjs/ui';

const color = ref('#7c3aed');
</script>

<template>
  <SColorArea v-model="color" />
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
  { name: 'defaultValue', type: 'string | ColorValue', default: '`#ff0000`', description: 'Initial uncontrolled value' },
  { name: 'colorSpace', type: '`hsl` | `hsv` | `oklch`', default: '`hsl`', description: 'Working color space used by the area' },
  { name: 'format', type: '`hex` | `rgb` | `hsl` | `oklch`', default: '`hex`', description: 'Output color format' },
  { name: 'xChannel', type: '`hue` | `saturation` | `lightness` | `brightness` | `chroma`', default: '`saturation`', description: 'Horizontal channel' },
  { name: 'yChannel', type: '`hue` | `saturation` | `lightness` | `brightness` | `chroma`', default: '`lightness`', description: 'Vertical channel' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Area size' },
  { name: 'ui', type: 'Partial<ColorAreaUi>', default: '{}', description: 'Override internal slot classes' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Fired when the serialized color changes' },
  { name: 'update:color', parameters: '(value: NormalizedColor) => void', description: 'Fired when the normalized color object changes' },
  { name: 'change', parameters: '(value: string) => void', description: 'Fired continuously while dragging' },
  { name: 'changeEnd', parameters: '(value: string) => void', description: 'Fired when dragging ends' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Custom thumb content', required: false },
]"/>
