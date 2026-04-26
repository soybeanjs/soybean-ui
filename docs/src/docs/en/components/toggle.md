# Toggle

## Overview

A two-state button that toggles between pressed and unpressed.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToggle } from '@soybeanjs/ui';

const pressed = ref(false);
</script>

<template>
  <SToggle v-model="pressed">Bold</SToggle>
</template>
```

## Demos

```playground
basic
variant
shape
size
disabled
```

## API

<ComponentApi component="toggle" />
