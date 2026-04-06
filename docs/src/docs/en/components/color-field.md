# Color Field

## Overview

An input for editing either a full color string or a single channel, with support for `hex`, `rgb`, `hsl`, and `oklch` output.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SColorField } from '@soybeanjs/ui';

const color = ref('#0ea5e9');
</script>

<template>
  <SColorField v-model="color" format="oklch" />
</template>
```

## Demo

```playground
basic
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string | ColorValue', default: '-', description: 'Controlled color value' },
  { name: 'defaultValue', type: 'string | ColorValue', default: '`#000000`', description: 'Initial uncontrolled value' },
  { name: 'channel', type: 'ColorChannel', default: '-', description: 'When set, only a single channel is edited' },
  { name: 'colorSpace', type: '`hsl` | `hsv` | `oklch`', default: '`hsl`', description: 'Color space used for reading and writing channels' },
  { name: 'format', type: '`hex` | `rgb` | `hsl` | `oklch`', default: '`hex`', description: 'Serialized output format' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Field size' },
  { name: 'ui', type: 'Partial<ColorFieldUi>', default: '{}', description: 'Override internal slot classes' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Fired when the serialized value changes' },
  { name: 'update:color', parameters: '(value: NormalizedColor) => void', description: 'Fired when the normalized color object changes' },
]"/>
