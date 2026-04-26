# Kbd

## Overview

Represents a keyboard input element. Useful for displaying keyboard shortcuts.

## Usage

```vue
<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';
</script>

<template>
  <SKbd>⌘</SKbd>
  +
  <SKbd>K</SKbd>
  <SKbd value="Ctrl" />
  <SKbd value="command" />
  <SKbd :raised="false" value="shift" />
</template>
```

## Demos

```playground
base
size
variant
raised
```

## API

<ComponentApi component="kbd" />
