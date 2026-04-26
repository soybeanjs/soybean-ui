# Layout

## Overview

The layout component structure for admin dashboards or complex applications. It manages sidebar, header, footer, tabs, and main content areas.

## Usage

```vue
<script setup lang="ts">
import { SLayout } from '@soybeanjs/ui';
</script>

<template>
  <SLayout>
    <template #sidebar>Sidebar Content</template>
    <template #header>Header Content</template>
    <template #tab>Tabs Content</template>
    Main Content
    <template #footer>Footer Content</template>
  </SLayout>
</template>
```

## Demos

```playground
base
```

## API

<ComponentApi component="layout" />
