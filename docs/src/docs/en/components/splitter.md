# Splitter

## Overview

A composable layout component that divides an area into resizable panels.

## Usage

```vue
<script setup lang="ts">
import { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle } from '@soybeanjs/ui';
</script>

<template>
  <SSplitterGroup>
    <SSplitterPanel :default-size="30">Sidebar</SSplitterPanel>
    <SSplitterResizeHandle with-handle aria-label="Resize panels" />
    <SSplitterPanel>Main content</SSplitterPanel>
  </SSplitterGroup>
</template>
```

## Demo

```playground
basic
vertical
collapsible
disabled
custom-handle
```

## API

<ComponentApi component="splitter" />
