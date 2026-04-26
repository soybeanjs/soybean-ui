# Slider

## Overview

A slider component for selecting one or more numeric values within a continuous range, with horizontal and vertical support.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SSlider } from '@soybeanjs/ui';

const value = ref([40]);
</script>

<template>
  <SSlider v-model="value" :thumb-props="{ 'aria-label': 'Volume' }" />
</template>
```

## Demo

```playground
basic
range
size
color
disabled
orientation
```

## API

<ComponentApi component="slider" />
