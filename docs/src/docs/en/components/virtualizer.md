# Virtualizer

## Overview

A virtual scrolling component that efficiently renders large lists by only rendering items currently in the viewport.

## Usage

```vue
<script setup lang="ts">
import { SVirtualizer } from '@soybeanjs/ui';

const data = Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i}` }));
</script>

<template>
  <div class="h-[400px] border rounded-md">
    <SVirtualizer :data="data" :item-size="50">
      <template #default="{ item }">
        <div class="h-[50px] flex items-center px-4 border-b">
          {{ item.text }}
        </div>
      </template>
    </SVirtualizer>
  </div>
</template>
```

## Demos

```playground
base
horizontal
dynamic
```

## API

<ComponentApi component="virtualizer" />
