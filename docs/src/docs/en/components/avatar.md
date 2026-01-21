# Avatar

## Overview

An image element with a fallback for representing the user.

## Usage

```vue
<script setup lang="ts">
import { SAvatar } from '@soybeanjs/ui';
</script>

<template>
  <SAvatar src="https://github.com/soybeanjs.png" fallback-label="SB" />
</template>
```

## Demos

```playground
base
fallback
delay
size
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'src', type: 'string', default: '-', description: 'Image source URL.', required: true },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Avatar size.' },
  { name: 'fallback-label', type: 'string', default: '-', description: 'Text to show when image fails to load.' },
  { name: 'delay-ms', type: 'number', default: '0', description: 'Delay in ms before showing the fallback.' },
  { name: 'image-props', type: 'object', default: '{}', description: 'Props passed to the internal image element.' },
  { name: 'fallback-props', type: 'object', default: '{}', description: 'Props passed to the internal fallback element.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'fallback', parameters: '-', description: 'Custom fallback content.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'loading-status-change', parameters: `(status: 'loading' | 'loaded' | 'error') => void`, description: 'Triggers when image loading status changes.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'image', type: 'string', description: 'Image element class.' },
      { name: 'fallback', type: 'string', description: 'Fallback element class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
