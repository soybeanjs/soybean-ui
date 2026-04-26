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

<ComponentApi component="color-field" />
