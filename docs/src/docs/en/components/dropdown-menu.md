# DropdownMenu

## Overview

Displays a menu to the user—such as a set of actions or functions—triggered by a button.

## Usage

```vue
<script setup lang="ts">
import { SDropdownMenu, SButton } from '@soybeanjs/ui';

const items = [
  { label: 'My Account', isGroupLabel: true },
  { label: 'Profile', value: 'profile', icon: 'lucide:user', shortcut: '⇧⌘P' },
  { label: 'Billing', value: 'billing', icon: 'lucide:credit-card', shortcut: '⌘B' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings', shortcut: '⌘S' },
  { separator: true },
  { label: 'Logout', value: 'logout', icon: 'lucide:log-out', shortcut: '⇧⌘Q' }
];
</script>

<template>
  <SDropdownMenu :items="items">
    <template #trigger>
      <SButton variant="outline">Open Menu</SButton>
    </template>
  </SDropdownMenu>
</template>
```

## Demos

```playground
base
trigger
arrow
checkbox
radio
mix
```

## API

<ComponentApi component="dropdown-menu" />
