# Tooltip

## Overview

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Usage

```vue
<script setup lang="ts">
import { STooltip, SButton } from '@soybeanjs/ui';
</script>

<template>
  <STooltip content="Add to library">
    <template #trigger>
      <SButton variant="outline">Hover me</SButton>
    </template>
  </STooltip>
</template>
```

## Demos

```playground
base
```

## API

<ComponentApi component="tooltip" />
