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

<ComponentApi component="color-slider" />
