# Visually Hidden

## Overview

`VisuallyHidden` is a utility component that hides content from the screen but keeps it accessible to screen readers. It is essential for accessibility when you want to provide context to users relying on assistive technologies without affecting the visual design.

> Note: This component is exported from `@soybeanjs/headless`.

## Usage

```vue
<script setup lang="ts">
import { VisuallyHidden } from '@soybeanjs/headless';
</script>

<template>
  <button>
    <Icon icon="lucide:save" />
    <VisuallyHidden>Save File</VisuallyHidden>
  </button>
</template>
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'as', type: 'string | Component', default: `'span'`, description: 'Rendered element' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into child element' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Hidden content' }
]"/>
