# Link

## Overview

A styled anchor tag or router link component.

## Usage

```vue
<script setup lang="ts">
import { SLink } from '@soybeanjs/ui';
</script>

<template>
  <SLink href="https://github.com" target="_blank">External Link</SLink>
  <SLink to="/home">Internal Link</SLink>
</template>
```

## Demos

```playground
base
href
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'to', type: 'RouteLocationRaw', default: '-', description: 'Target route.' },
  { name: 'href', type: 'string', default: '-', description: 'Target URL.' },
  { name: 'external', type: 'boolean', default: 'false', description: 'Force external link behavior.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether link is disabled.' },
  { name: 'prefetch', type: 'boolean', default: '-', description: 'Enable prefetch behavior (framework dependent).' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ isHref: boolean }', description: 'Link content.' }
]"/>
