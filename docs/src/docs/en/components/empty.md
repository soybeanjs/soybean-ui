# Empty

## Overview

A lightweight empty state component for highlighting missing content, actions, and follow-up guidance.

## Usage

```vue
<script setup lang="ts">
import { SButton, SEmpty } from '@soybeanjs/ui';
</script>

<template>
  <SEmpty
    class="min-h-72"
    title="No projects yet"
    description="Create your first project to start organizing work."
    icon="lucide:folder-plus"
    media-variant="icon"
  >
    <SButton>Create project</SButton>
  </SEmpty>
</template>
```

## Demos

```playground
basic
icon
slot
custom-styling
```

## API

<ComponentApi component="empty" />
