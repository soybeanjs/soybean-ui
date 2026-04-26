# ScrollArea

## Overview

A custom scroll container that keeps native scrolling behavior while rendering styled scrollbars for vertical and horizontal overflow.

## Usage

```vue
<script setup lang="ts">
import { SScrollArea } from '@soybeanjs/ui';
</script>

<template>
  <SScrollArea class="h-64 rounded-md border">
    <div class="p-4">Scrollable content</div>
  </SScrollArea>
</template>
```

## Demos

```playground
basic
horizontal
type
custom-styling
```

## API

<ComponentApi component="scroll-area" />
