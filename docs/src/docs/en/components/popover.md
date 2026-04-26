# Popover

## Overview

Displays rich content in a portal, triggered by a button.

## Usage

```vue
<script setup lang="ts">
import { SPopover, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SPopover>
    <template #trigger>
      <SButton variant="outline">Open Popover</SButton>
    </template>
    <div class="p-4">
      <h3 class="font-medium">Popover Title</h3>
      <p class="text-sm text-muted-foreground">This is the popover content.</p>
    </div>
  </SPopover>
</template>
```

## Demos

```playground
base
```

## API

<ComponentApi component="popover" />
