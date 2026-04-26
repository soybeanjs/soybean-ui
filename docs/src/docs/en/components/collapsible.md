# Collapsible

## Overview

An interactive component which expands/collapses a panel.

## Usage

```vue
<script setup lang="ts">
import { SCollapsible, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SCollapsible v-model:open="open">
    <template #trigger>
      <SButton variant="outline">Toggle</SButton>
    </template>
    <div class="p-4 border rounded-md mt-2">Content goes here.</div>
  </SCollapsible>
</template>
```

## Demos

```playground
base
```

## API

<ComponentApi component="collapsible" />
