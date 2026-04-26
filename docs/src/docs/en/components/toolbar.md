# Toolbar

## Overview

A compact container that groups related actions, links, and toggle controls into a single roving-focus toolbar.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToolbar, SToolbarButton, SToolbarSeparator, SToolbarToggleGroup, SToolbarToggleItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToolbar>
    <SToolbarButton>Cut</SToolbarButton>
    <SToolbarButton>Copy</SToolbarButton>
    <SToolbarSeparator />
    <SToolbarToggleGroup v-model="value">
      <SToolbarToggleItem value="bold">Bold</SToolbarToggleItem>
      <SToolbarToggleItem value="italic">Italic</SToolbarToggleItem>
    </SToolbarToggleGroup>
  </SToolbar>
</template>
```

## Demos

```playground
basic
link
toggle-group
vertical
```

## API

<ComponentApi component="toolbar" />
