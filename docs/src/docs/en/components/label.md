# Label

## Overview

`SLabel` is a primitive component used to render accessible labels for form controls. It supports standard styled variants and integrates seamlessly with the design system.

## Usage

```vue
<script setup lang="ts">
import { SLabel, SInput } from '@soybeanjs/ui';
</script>

<template>
  <div class="grid gap-1.5">
    <SLabel htmlFor="email">Email</SLabel>
    <SInput id="email" type="email" placeholder="Email" />
  </div>
</template>
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Label size' },
  { name: 'for', type: 'string', default: '-', description: 'ID of the associated form element' },
  { name: 'as', type: 'string | Component', default: `'label'`, description: 'Rendered element' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into child element' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Label content' }
]"/>

### Types

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
