# ToggleGroup

## Overview

A set of two-state buttons that can be toggled on or off as a single or multiple selection group.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToggleGroup v-model="value">
    <SToggleGroupItem value="bold">Bold</SToggleGroupItem>
    <SToggleGroupItem value="italic">Italic</SToggleGroupItem>
    <SToggleGroupItem value="underline">Underline</SToggleGroupItem>
  </SToggleGroup>
</template>
```

## Demos

```playground
basic
multiple
variant
vertical
```

## API

<ComponentApi component="toggle-group" />
