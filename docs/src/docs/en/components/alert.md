# Alert

## Overview

Displays a callout for user attention. Useful for warnings, errors, or information.

## Usage

```vue
<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <SAlert title="Info" description="This is an info alert" />
  <SAlert title="Error" description="Something went wrong" color="destructive" variant="soft" />
</template>
```

## Demos

```playground
color
variant
description
icon
desc-icon
closable
slot
size
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'title', type: 'string', default: '-', description: 'Alert title.' },
  { name: 'description', type: 'string', default: '-', description: 'Alert description.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Alert size.' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: 'Theme color.' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, default: `'soft'`, description: 'Visual style variant.' },
  { name: 'icon', type: 'string | Component', default: '-', description: 'Custom icon.' },
  { name: 'closable', type: 'boolean', default: 'false', description: 'Whether to show close button.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Main content.' },
  { name: 'icon', parameters: '-', description: 'Custom icon slot.' },
  { name: 'title', parameters: '-', description: 'Custom title slot.' },
  { name: 'description', parameters: '-', description: 'Custom description slot.' },
  { name: 'close', parameters: '-', description: 'Custom close button slot.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'icon', type: 'string', description: 'Icon container class.' },
      { name: 'content', type: 'string', description: 'Content wrapper class.' },
      { name: 'title', type: 'string', description: 'Title text class.' },
      { name: 'description', type: 'string', description: 'Description text class.' },
      { name: 'close', type: 'string', description: 'Close button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
