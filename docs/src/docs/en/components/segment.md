# Segment

## Overview

A linear set of two or more segments, each of which functions as a mutually exclusive button.

## Usage

```vue
<script setup lang="ts">
import { SSegment } from '@soybeanjs/ui';

const value = ref('daily');
const items = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
];
</script>

<template>
  <SSegment v-model="value" :items="items" />
</template>
```

> `SSegment` now delegates item iteration and indicator composition to headless `SegmentCompact`. For unstyled, data-driven usage, import `SegmentCompact` from `@soybeanjs/headless/tabs`.

## Demos

```playground
base
vertical
shape
icon
```

## API

<ComponentApi component="segment" />
