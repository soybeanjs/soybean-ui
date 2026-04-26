# Editable

## Overview

An inline text editor that switches between preview and edit states.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SEditable } from '@soybeanjs/ui';

const value = ref('Click to edit');
</script>

<template>
  <SEditable v-model="value" placeholder="Enter text" />
</template>
```

## Demo

```playground
basic
size
disabled
activation-mode
custom-styling
```

## API

<ComponentApi component="editable" />
