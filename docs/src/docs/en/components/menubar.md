# Menubar

## Overview

Displays a persistent application-style menu bar with horizontal trigger navigation, nested menus, and keyboard roving focus.

## Usage

```vue
<script setup lang="ts">
import { SMenubar } from '@soybeanjs/ui';

const items = [
  {
    value: 'file',
    label: 'File',
    children: [
      { value: 'new-tab', label: 'New Tab', shortcut: '⌘T' },
      { value: 'share', label: 'Share', children: [{ value: 'mail', label: 'Email Link' }] }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    children: [
      { value: 'undo', label: 'Undo' },
      { value: 'redo', label: 'Redo' }
    ]
  }
];
</script>

<template>
  <SMenubar :items="items" />
</template>
```

## Demos

```playground
basic
controlled
rtl
```

## API

<ComponentApi component="menubar" />
