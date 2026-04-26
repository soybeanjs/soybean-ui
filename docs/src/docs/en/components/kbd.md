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

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name.' },
  { name: 'value', type: 'KbdValue | KbdValue[]', default: '-', description: 'Keyboard value to display, supports single keys and combinations.' },
  { name: 'symbolize', type: 'boolean', default: 'true', description: 'Whether to convert known key names into symbol form.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Kbd size.' },
  { name: 'variant', type: 'KbdVariant', default: `'outline'`, description: 'Visual style variant.' },
  { name: 'raised', type: 'boolean', default: 'true', description: 'Whether to enable the raised shadow effect; pass false to disable it.' },
  { name: 'as', type: 'string | Component', default: `'kbd'`, description: 'The rendered element.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into child element.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Content of the kbd.' }
]"/>

### Types

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="KbdVariant" description="Visual variants for kbd" type="'solid' | 'outline' | 'ghost'" />
