# InputNumber

## Overview

A text input field that only accepts numeric input. Supports increment/decrement controls.

## Usage

```vue
<script setup lang="ts">
import { SInputNumber } from '@soybeanjs/ui';

const value = ref(0);
</script>

<template>
  <SInputNumber v-model="value" :min="0" :max="100" />
</template>
```

## Demos

```playground
base
center
slot
clearable
```

## API

<ComponentApi component="input-number" />
