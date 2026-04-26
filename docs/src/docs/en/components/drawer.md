# Drawer

## Overview

A panel that slides out from the edge of the screen. It reuses the declarative API and slot contract of `SDialog`, and adds `side` to control where the panel enters.

## Usage

```vue
<script setup lang="ts">
import { SDrawer, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDrawer v-model:open="open" title="Menu" side="left">
    <template #trigger>
      <SButton variant="outline">Open Drawer</SButton>
    </template>
    <div class="py-4">
      <p>Navigation links...</p>
    </div>
  </SDrawer>
</template>
```

## Demos

```playground
side
scroll
```

## API

<ComponentApi component="drawer" />
