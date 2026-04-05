# Skeleton

## Overview

A skeleton placeholder component for loading states.

## Usage

```vue
<script setup lang="ts">
import { SSkeleton } from '@soybeanjs/ui';
</script>

<template>
  <SSkeleton class="h-4 w-56" />
</template>
```

## Demos

```playground
basic
size
shape
animated
custom-size
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name for overriding width, height, radius, and other styles.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Preset skeleton size.' },
  { name: 'animated', type: 'boolean', default: 'true', description: 'Whether to enable the pulse animation.' },
  { name: 'shape', type: 'SkeletonShape', default: '`auto`', description: 'Preset corner shape.' },
  { name: 'as', type: 'string | Component', default: '`div`', description: 'Rendered element or component.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into the child element.' },
]"/>

### Events

<DataTable preset="emits" :data="[]"/>

### Slots

<DataTable preset="slots" :data="[]"/>

### Types

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="SkeletonShape" description="Skeleton shape type" type="'auto' | 'rounded' | 'square'" />
