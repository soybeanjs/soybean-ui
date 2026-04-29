# Bottom Sheet

## Overview

A modal panel that slides in from the bottom edge of the screen. It is suited for mobile-first actions, supplemental details, and step-based confirmations. The component reuses the declarative API of `SDialog`, and adds bottom-sheet interactions such as drag-to-dismiss, background scaling, and `snapPoints` support.

## Usage

```vue
<script setup lang="ts">
import { SBottomSheet, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SBottomSheet v-model:open="open" title="Bottom Sheet Title" description="Bottom Sheet Description">
    <template #trigger>
      <SButton variant="outline">Open Bottom Sheet</SButton>
    </template>

    <div class="py-4">
      <p>Bottom Sheet Content</p>
    </div>
  </SBottomSheet>
</template>
```

## Demos

```playground
base
nested
```

## API

<ComponentApi component="bottom-sheet" />
