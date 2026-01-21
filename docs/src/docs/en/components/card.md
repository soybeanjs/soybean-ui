# Card

## Overview

A container component that groups related content and actions. It supports headers, footers, titles, descriptions, and can be split into sections.

## Usage

```vue
<script setup lang="ts">
import { SCard, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Notifications" description="You have 3 unread messages.">
    <div class="py-4">
      <p>Your subscription expires soon.</p>
    </div>
    <template #footer>
      <SButton class="w-full">Mark all as read</SButton>
    </template>
  </SCard>
</template>
```

## Demos

```playground
base
only-content
split
title-slot
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'title', type: 'string', default: '-', description: 'Card title.' },
  { name: 'description', type: 'string', default: '-', description: 'Card description text.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Padding size of the card.' },
  { name: 'split', type: 'boolean', default: 'false', description: 'Whether to show dividers between sections.' },
  { name: 'scrollable', type: 'boolean', default: 'false', description: 'Whether the content area is scrollable.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names for internal elements.' },
  { name: 'headerProps', type: 'object', default: '{}', description: 'Props passed to the header container.' },
  { name: 'contentProps', type: 'object', default: '{}', description: 'Props passed to the content container.' },
  { name: 'footerProps', type: 'object', default: '{}', description: 'Props passed to the footer container.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Main content area.' },
  { name: 'header', parameters: '-', description: 'Header content (replaces title/desc).' },
  { name: 'footer', parameters: '-', description: 'Footer content.' },
  { name: 'title', parameters: '-', description: 'Custom title content.' },
  { name: 'description', parameters: '-', description: 'Custom description content.' },
  { name: 'extra', parameters: '-', description: 'Extra content in the header (top-right).' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'header', type: 'string', description: 'Header container class.' },
      { name: 'titleRoot', type: 'string', description: 'Title wrapper class.' },
      { name: 'title', type: 'string', description: 'Title text class.' },
      { name: 'description', type: 'string', description: 'Description text class.' },
      { name: 'content', type: 'string', description: 'Content area class.' },
      { name: 'footer', type: 'string', description: 'Footer container class.' },
    ],
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
