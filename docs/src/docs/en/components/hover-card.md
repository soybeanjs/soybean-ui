# Hover Card

## Overview

Displays a richer preview card when the trigger is hovered or receives focus.

## Usage

```vue
<script setup lang="ts">
import { SButton, SHoverCard } from '@soybeanjs/ui';
</script>

<template>
  <SHoverCard>
    <template #trigger>
      <SButton variant="outline">Hover me</SButton>
    </template>
    <div class="space-y-1.5">
      <p class="font-medium">Hover card</p>
      <p class="text-sm text-muted-foreground">Use it to show richer preview content.</p>
    </div>
  </SHoverCard>
</template>
```

## Demo

```playground
basic
delay
custom-styling
```

## API

<ComponentApi component="hover-card" />
