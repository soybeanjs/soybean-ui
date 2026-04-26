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

<ComponentApi component="color-area" />
