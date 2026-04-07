# ScrollArea

## Overview

A custom scroll container that keeps native scrolling behavior while rendering styled scrollbars for vertical and horizontal overflow.

## Usage

```vue
<script setup lang="ts">
import { SScrollArea } from '@soybeanjs/ui';
</script>

<template>
  <SScrollArea class="h-64 rounded-md border">
    <div class="p-4">Scrollable content</div>
  </SScrollArea>
</template>
```

## Demos

```playground
basic
horizontal
type
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root element class name.' },
  { name: 'type', type: `'auto' | 'always' | 'hover' | 'scroll' | 'glimpse'`, default: `'hover'`, description: 'Controls when the custom scrollbars are visible.' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: `'ltr'`, description: 'Reading direction of the scroll area.' },
  { name: 'scrollHideDelay', type: 'number', default: '600', description: 'Delay in milliseconds before transient scrollbars hide.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names for the internal slots.' },
  { name: 'viewportProps', type: 'ScrollAreaViewportProps', default: '{}', description: 'Props forwarded to the viewport element.' },
  { name: 'verticalScrollbarProps', type: 'Omit<ScrollAreaScrollbarProps, `orientation`>', default: '{}', description: 'Props forwarded to the vertical scrollbar.' },
  { name: 'horizontalScrollbarProps', type: 'Omit<ScrollAreaScrollbarProps, `orientation`>', default: '{}', description: 'Props forwarded to the horizontal scrollbar.' },
  { name: 'thumbProps', type: 'ScrollAreaThumbProps', default: '{}', description: 'Props forwarded to both scrollbar thumbs.' },
  { name: 'cornerProps', type: 'ScrollAreaCornerProps', default: '{}', description: 'Props forwarded to the scrollbar corner.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Scrollable content.', required: true },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class name map for ScrollArea.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class name.' },
      { name: 'viewport', type: 'string', description: 'Viewport class name.' },
      { name: 'scrollbar', type: 'string', description: 'Scrollbar track class name.' },
      { name: 'thumb', type: 'string', description: 'Scrollbar thumb class name.' },
      { name: 'corner', type: 'string', description: 'Scrollbar corner class name.' },
    ],
  },
  {
    name: 'ScrollAreaType',
    description: 'Scrollbar visibility mode.',
    fields: [
      { name: 'auto', type: 'string', description: 'Show the scrollbar whenever content overflows.' },
      { name: 'always', type: 'string', description: 'Keep the scrollbar visible while overflow exists.' },
      { name: 'hover', type: 'string', description: 'Show the scrollbar while the pointer is over the scroll area.' },
      { name: 'scroll', type: 'string', description: 'Show the scrollbar while the user is scrolling.' },
      { name: 'glimpse', type: 'string', description: 'Briefly reveal the scrollbar on hover and scroll.' },
    ],
  }
]"/>
