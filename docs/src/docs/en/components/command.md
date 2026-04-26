# Command

## Overview

Fast, composable, command menu for Vue.

## Usage

```vue
<script setup lang="ts">
import { SCommand } from '@soybeanjs/ui';

const items = [
  { label: 'Profile', value: 'profile', icon: 'lucide:user' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings' },
  { separator: true },
  { label: 'Logout', value: 'logout', icon: 'lucide:log-out' }
];
</script>

<template>
  <SCommand :items="items" placeholder="Type a command..." />
</template>
```

> `SCommand` now delegates filtering, grouped item aggregation, and default item composition to headless `CommandCompact`. For unstyled, data-driven usage, import `CommandCompact` from `@soybeanjs/headless/command`.

## Demos

```playground
base
dialog
```

## API

<ComponentApi component="command" />
