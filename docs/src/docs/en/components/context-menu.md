# ContextMenu

## Overview

Displays a menu located at the pointer, triggered by a right-click.

## Usage

```vue
<script setup lang="ts">
import { SContextMenu } from '@soybeanjs/ui';

const items = [
  { label: 'Back', value: 'back', icon: 'lucide:arrow-left', shortcut: '⌘[' },
  { label: 'Forward', value: 'forward', icon: 'lucide:arrow-right', shortcut: '⌘]' },
  { label: 'Reload', value: 'reload', icon: 'lucide:refresh-cw', shortcut: '⌘R' },
  { separator: true },
  { label: 'Save As...', value: 'save', icon: 'lucide:save', shortcut: '⇧⌘S' }
];
</script>

<template>
  <SContextMenu :items="items">
    <div class="flex items-center justify-center border border-dashed h-[150px] rounded-md">Right click here</div>
  </SContextMenu>
</template>
```

## Demos

```playground
base
checkbox
radio
mix
```

## API

<ComponentApi component="context-menu" />
